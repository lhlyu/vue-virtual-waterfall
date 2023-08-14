<template>
    <VirtualWaterfall :gap="cfg.gap" :min-column-count="cfg.minColumnCount" :max-column-count="cfg.maxColumnCount === '自动' ? undefined : +cfg.maxColumnCount" :item-min-width="cfg.itemMinWidth" :items="data.items" :loading="data.loading" :calc-item-height="calcItemHeight" ref="vw" @load-more="loadMoreData">
        <template #default="{ item }: { item: ItemOption }">
            <Card :id="item.id" :img="item.img" :color="item.dominant" :text="cfg.showText ? item.text : ''" :has="loadedItemIds.has(item.id)" @loaded="loaded"></Card>
        </template>
    </VirtualWaterfall>
    <div class="backtop" @click="backTop">▲</div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref, reactive, inject } from 'vue'
import { VirtualWaterfall } from './vue-virtual-waterfall'
import Card from './card.vue'
import Mock from 'mockjs'

const cfg = inject<CfgOption>('cfg')

interface ItemOption {
    id: string
    height: number
    width: number
    img: string
    dominant: number[]
    palette: number[][]
    text?: string
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
    const resp = await fetch(`https://mock.tatakai.top/image/${data.page}/${data.size}`)
    const list = (await resp.json()) as ItemOption[]
    for (let i = 0; i < list.length; i++) {
        list[i].text = Mock.Random.cparagraph(0, 3)
    }
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
    let height = 0
    // 如果存在文本则添加一点高度
    if (item.text.length && cfg.showText) {
        height = 100
    }
    // 按比例
    switch (cfg.itemHeight) {
        case '自动':
            return item.height * (itemWidth / item.width) + height
        case '250':
            return 250 + height
        case '1:1':
            return itemWidth + height
        case '2:3':
            return (itemWidth / 2) * 3 + height
        case '3:4':
            return (itemWidth / 3) * 4 + height
        case '4:5':
            return (itemWidth / 4) * 5 + height
        case '9:16':
            return (itemWidth / 9) * 16 + height
    }
    return item.height * (itemWidth / item.width) + height
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

<style lang="scss" scoped>
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
</style>
