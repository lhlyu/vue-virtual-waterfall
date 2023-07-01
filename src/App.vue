<template>
    <main>
        <VueVirtualWaterfall :items="items" :calcItemHeight="calcItemHeight" :loading="loading" ref="vw" @load-more="loadMoreData">
            <template #default="{ item }">
                <div class="card">
                    <img :src="item.image" />
                </div>
            </template>
        </VueVirtualWaterfall>
    </main>
    <footer>
        <button @click="backTop">滚动到顶部</button>
    </footer>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { faker } from '@faker-js/faker'
import { VueVirtualWaterfall } from './vue-virtual-waterfall/index.ts'

interface ItemOption {
    id: string
    image: string
    height: number
    width: number
}

const loading = ref(false)
const items = ref<ItemOption[]>([])

const loadMoreData = () => {
    console.log('items.length:', items.value.length)
    if (items.value.length === 400) {
        return
    }
    loading.value = true
    const list: ItemOption[] = []
    const widths = [100, 200, 300, 400]
    const heights = [1, 1.5, 2]
    for (let i = 0; i < 40; i++) {
        const width = widths[i % 4]
        const height = width * heights[faker.number.int({ min: 0, max: 2 })]
        const img = faker.image.urlLoremFlickr({ width, height, category: 'nature' })
        list.push({
            id: faker.string.nanoid(10),
            image: img,
            height: height,
            width: width
        })
    }
    items.value.push(...list)
    loading.value = false
}

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

onMounted(() => {
    loadMoreData()
})
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
    padding: 10px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

    img {
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 10px;
    }
}
</style>
