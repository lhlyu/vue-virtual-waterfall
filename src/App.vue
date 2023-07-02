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
    <footer>
        <button @click="backTop">滚动到顶部</button>
    </footer>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, reactive } from 'vue'
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
</script>

<style lang="scss">
body {
    margin: 0;
    padding: 0;

    #app {
        height: 100vh;

        main {
            height: calc(100vh - 60px);
        }
        footer {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 60px;
            box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
        }
    }
}

.card {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

    img {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
}
</style>
