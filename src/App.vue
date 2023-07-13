<template>
    <main>
        <VirtualWaterfall :items="data.items" :calcItemHeight="calcItemHeight" :loading="data.loading" contentMaxWidth="1000px" ref="vw" @load-more="loadMoreData">
            <template #default="{ item }: { item: ItemOption }">
                <Card :id="item.id" :img="item.img" :color="item.dominant" :has="loadedItemIds.has(item.id)" @loaded="loaded"></Card>
            </template>
        </VirtualWaterfall>
    </main>
    <div class="backtop" @click="backTop">▲</div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref, reactive } from 'vue'
import { VirtualWaterfall } from './vue-virtual-waterfall'
import Card from './card.vue'

interface ItemOption {
    id: string
    height: number
    width: number
    img: string
    dominant: number[]
    palette: number[][]
}

const data = reactive({
    items: [] as ItemOption[],
    page: 1,
    size: 80,
    loading: false
})

const loadedItemIds = new Set<string>()

const loaded = (id: string) => {
    loadedItemIds.add(id)
}

const loadMoreData = async () => {
    if (data.loading) {
        return
    }
    data.loading = true
    const resp = await fetch(`https://far-chicken-71.deno.dev/image/${data.page}/${data.size}`)
    const list = await resp.json()
    data.items.push(...list)
    data.page += 1
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
            width: 100%;
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
}
</style>
