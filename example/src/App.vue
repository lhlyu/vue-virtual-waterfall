<template>
    <main>
        <VirtualWaterfall :items="data.items" :calcItemHeight="calcItemHeight" :loading="data.loading" ref="vw" @load-more="loadMoreData">
            <template #default="{ item }: { item: ItemOption }">
                <div class="card">
                    <img :src="item.img" />
                </div>
            </template>
        </VirtualWaterfall>
    </main>
    <div class="backtop" @click="backTop">▲</div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref, reactive } from 'vue'

interface ItemOption {
    id: string
    height: number
    width: number
    img: string
}

const data = reactive({
    items: [],
    page: 1,
    size: 80,
    loading: false
})

// 加载数据的逻辑
const loadMoreData = async () => {
    if (data.loading) {
        return
    }
    data.loading = true
    const resp = await fetch(`https://far-chicken-71.deno.dev/image/${data.page}/${data.size}`)
    const list = await resp.json()
    data.items.push(...list)
    data.page += 1
    // 返回的列表小于size表示加载完了
    if (list.length < data.size) {
        return
    }
    data.loading = false
}

onBeforeMount(async () => {
    await loadMoreData()
})

// 计算高度的方法
const calcItemHeight = (item: ItemOption, itemWidth: number): number => {
    // 按比例
    return item.height * (itemWidth / item.width)
}

const vw = ref()

// 返回顶部
const backTop = () => {
    vw.value?.backTop()
}

const appHeight = ref('100vh')

onMounted(() => {
    appHeight.value = window.innerHeight + 'px'
})
</script>

<style lang="scss">
body {
    margin: 0;
    padding: 0;

    main {
        height: v-bind(appHeight);
    }

    .backtop {
        position: fixed;
        right: 40px;
        bottom: 40px;
        z-index: 99;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 40px;
        height: 40px;
        color: rgba(#e84393, 0.4);
        font-size: 1.4rem;
        background: rgba(#fd79a8, 0.4);
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s linear;

        &:hover {
            color: rgba(#e84393, 1);
            background: rgba(#fd79a8, 0.9);
        }
    }
}

.card {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: 1px solid #e5e5e5;
    border-radius: 10px;

    img {
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 10px;
    }
}
</style>
