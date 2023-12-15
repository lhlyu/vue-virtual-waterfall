<template>
    <div
        ref="content"
        :style="{
            position: 'relative',
            willChange: 'height',
            height: `${Math.max(...columnsTop)}px`
        }"
    >
        <div
            v-for="data in itemRenderList"
            :key="data.item[rowKey] ?? data.index"
            :style="{
                position: 'absolute',
                contentVisibility: 'auto',
                width: `${itemWidth}px`,
                height: `${data.height}px`,
                transform: `translate(${data.left}px, ${data.top}px)`,
                containIntrinsicSize: `${itemWidth}px ${data.height}px`
            }"
            :data-index="data.index"
        >
            <slot
                :item="data.item"
                :index="data.index"
            ></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useElementBounding, useElementSize } from '@vueuse/core'

defineOptions({
    name: 'VirtualWaterfall'
})

interface VirtualWaterfallOption {
    // 是否启用虚拟列表
    virtual?: boolean
    rowKey?: string
    // item间隔
    gap?: number
    // 预加载屏数量 [top, bottom]
    preloadScreenCount?: [number, number]
    // item最小宽度
    itemMinWidth?: number
    // 最大列数
    maxColumnCount?: number
    // 最小列数
    minColumnCount?: number
    // 数据
    items?: any[]
    // 计算单个item高度的方法
    calcItemHeight?: (item: any, itemWidth: number) => number
}

const props = withDefaults(defineProps<VirtualWaterfallOption>(), {
    virtual: true,
    rowKey: 'id',
    gap: 15,
    preloadScreenCount: () => [1, 0],
    itemMinWidth: 220,
    maxColumnCount: 10,
    minColumnCount: 2,
    items: () => [],
    calcItemHeight: (item: any, itemWidth: number) => 250
})

const slot = defineSlots<{
    default(props: { item: any; index: number }): any
}>()

const content = ref<HTMLDivElement>()

const { width: contentWidth } = useElementSize(content)
const { top: contentTop } = useElementBounding(content)

onMounted(() => {
    // 这里是为了解决这个问题:
    // https://github.com/lhlyu/vue-virtual-waterfall/issues/5
    if (contentWidth.value === 0) {
        contentWidth.value = Number.parseInt(window.getComputedStyle(content.value).width)
    }
})

// 计算列数
const columnCount = computed<number>(() => {
    if (!contentWidth.value) {
        return 0
    }
    const cWidth = contentWidth.value - props.gap * 2
    if (cWidth >= props.itemMinWidth * 2) {
        const count = Math.floor(cWidth / props.itemMinWidth)
        if (props.maxColumnCount && count > props.maxColumnCount) {
            return props.maxColumnCount
        }
        return count
    }
    return props.minColumnCount
})

// 每列距离顶部的距离
const columnsTop = ref(new Array(columnCount.value).fill(props.gap))

// 计算每个item占据的宽度: (容器宽度 - 间隔) / 列数
const itemWidth = computed<number>(() => {
    if (!contentWidth.value || columnCount.value <= 0) {
        return 0
    }
    // 列之间的间隔 和 左右两侧的间隔
    const gap = (columnCount.value - 1) * props.gap + props.gap * 2
    return Math.floor((contentWidth.value - gap) / columnCount.value)
})

interface SpaceOption {
    index: number
    item: any
    column: number
    top: number
    left: number
    height: number
}

// 计算每个item占据的空间
const itemSpaces = ref<SpaceOption[]>([])

watchEffect(() => {
    if (!columnCount.value) {
        itemSpaces.value = []
        return
    }

    const length = props.items.length
    const spaces = new Array(length)

    let start = 0
    // 是否启用缓存：只有当新增元素时，只需要计算新增元素的信息
    const cache = itemSpaces.value.length && length > itemSpaces.value.length
    if (cache) {
        start = itemSpaces.value.length
    } else {
        columnsTop.value = new Array(columnCount.value).fill(props.gap)
    }

    // 为了高性能采用for-i
    for (let i = 0; i < length; i++) {
        if (cache && i < start) {
            spaces[i] = itemSpaces.value[i]
            continue
        }

        const columnIndex = getColumnIndex()
        // 计算元素的高度
        const h = props.calcItemHeight(props.items[i], itemWidth.value)

        const space: SpaceOption = {
            index: i,
            item: props.items[i],
            column: columnIndex,
            top: columnsTop.value[columnIndex],
            left: (itemWidth.value + props.gap) * columnIndex + props.gap,
            height: h
        }

        // 累加当前列的高度
        columnsTop.value[columnIndex] += h + props.gap
        spaces[i] = space
    }
    itemSpaces.value = spaces
})

// 虚拟列表逻辑：需要渲染的items
const itemRenderList = computed<SpaceOption[]>(() => {
    const length = itemSpaces.value.length
    if (!length) {
        return []
    }
    if (!props.virtual) {
        return itemSpaces.value
    }
    const tp = -contentTop.value

    const [topPreloadScreenCount, bottomPreloadScreenCount] = props.preloadScreenCount
    // 避免多次访问
    const innerHeight = content.value.parentElement.clientHeight
    // 顶部的范围: 向上预加载preloadScreenCount个屏幕，Y轴上部
    const topLimit = tp - topPreloadScreenCount * innerHeight
    // 底部的范围: 向下预加载preloadScreenCount个屏幕
    const bottomLimit = tp + (bottomPreloadScreenCount + 1) * innerHeight

    const list = []

    // 判断是否已经筛选到了数据
    let open = false

    for (let i = 0; i < length; i++) {
        // AND 运算比 OR 运算快
        if (itemSpaces.value[i].top > topLimit && itemSpaces.value[i].top < bottomLimit) {
            open = true
            list.push(itemSpaces.value[i])
            continue
        }
        // 后面的不用再遍历了
        if (open) {
            break
        }
    }
    return list
})

// 获取当前元素应该处于哪一列
const getColumnIndex = (): number => {
    return columnsTop.value.indexOf(Math.min(...columnsTop.value))
}
</script>
