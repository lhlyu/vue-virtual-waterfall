<template>
    <main>
        <VueVirtualWaterfall :items="data.items" :calcItemHeight="calcItemHeight" :loading="data.loading" ref="vw" @load-more="loadMoreData">
            <template #default="{ item }">
                <div class="card">
                    <img :src="item.img" />
                </div>
            </template>
        </VueVirtualWaterfall>
    </main>
    <div class="backtop" @click="backTop">▲</div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref, reactive } from 'vue'
import { VueVirtualWaterfall } from './vue-virtual-waterfall'


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


const loadMoreData = async () => {
    if (data.loading) {
        return
    }
    data.loading = true
    const resp = await fetch(`https://far-chicken-71.deno.dev/image/${data.page}/${data.size}`)
    const list = await resp.json()
    data.page += 1
    data.items.push(...list)
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

    #app {
        main {
            height: v-bind(appHeight);
        }

        .backtop {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            right: 40px;
            width: 40px;
            height: 40px;
            border-radius: 50px;
            background: rgba(#fd79a8, 0.4);
            color: rgba(#e84393, 0.4);
            font-size: 1.4rem;
            cursor: pointer;
            z-index: 99;
            box-sizing: border-box;
            bottom: 40px;
            transition: all 0.3s linear;

            &:hover {
                background: rgba(#fd79a8, 0.9);
                color: rgba(#e84393, 1);
            }
        }
    }
}

.card {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: 1px solid #e5e5e5;

    img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        overflow: hidden;
    }
}
</style>
