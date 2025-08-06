<template>
    <div
        ref="content"
        :style="{
            position: 'relative',
            willChange: 'height',
            height: `${Math.max(...columnsTop)}px`,
            padding: `${isNumber(padding) ? padding + 'px' : padding}`
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
import { computed, onMounted, ref, shallowRef, watchEffect, readonly } from 'vue'
import { useElementBounding, useElementSize } from '@vueuse/core'

defineOptions({
    name: 'VirtualWaterfall'
})

interface VirtualWaterfallOption {
    // 是否启用虚拟列表
    virtual?: boolean
    rowKey?: string
    // 是否启用缓存, 默认启用
    enableCache?: boolean
    // item间隔
    gap?: number
    // 容器内边距
    padding?: number | string
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
    enableCache: true,
    gap: 15,
    padding: 15,
    preloadScreenCount: () => [0, 0],
    itemMinWidth: 220,
    maxColumnCount: 10,
    minColumnCount: 2,
    items: () => [],
    calcItemHeight: (item: any, itemWidth: number) => 250
})

defineSlots<{
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

function isNumber(value: any) {
    return Object.prototype.toString.call(value) === '[object Number]';
}

// 计算列数
const columnCount = computed<number>(() => {
    if (!contentWidth.value) {
        return 0
    }
    const cWidth = contentWidth.value
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
const columnsTop = ref(new Array(columnCount.value).fill(0))

// 计算每个item占据的宽度: (容器宽度 - 间隔) / 列数
const itemWidth = computed<number>(() => {
    if (!contentWidth.value || columnCount.value <= 0) {
        return 0
    }
    // 列之间的间隔
    const gap = (columnCount.value - 1) * props.gap
    
    return Math.ceil((contentWidth.value - gap) / columnCount.value)
})

// 元素空间信息
interface SpaceOption {
    // 索引
    index: number
    // 原始数据
    item: any
    // 元素所属列
    column: number
    // 元素左上角绝对定位top位置
    top: number
    // 元素左上角绝对定位left位置
    left: number
    // 元素左下角绝对定位bottom位置
    bottom: number
    // 元素真实高度
    height: number
}

// 每个item占据的空间
const itemSpaces = shallowRef<SpaceOption[]>([])

// 暴露一个方法，让外部可以访问itemSpaces
const withItemSpaces = (cb: (spaces: readonly SpaceOption[]) => Promise<void> | void) => {
    cb(readonly(itemSpaces).value)
}

defineExpose({
    withItemSpaces
})

watchEffect(() => {
  
    const length = props.items.length
    
    if (!columnCount.value || !length) {
        itemSpaces.value = []
        return
    }
    
    const spaces = new Array(length)

    let start = 0
    // 是否启用缓存：只有当新增元素时，需要计算新增元素的信息
    const cache = props.enableCache && itemSpaces.value.length && length > itemSpaces.value.length
    if (cache) {
        start = itemSpaces.value.length
    } else {
        columnsTop.value = new Array(columnCount.value).fill(0)
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
        const top = columnsTop.value[columnIndex]
        const left = (itemWidth.value + props.gap) * columnIndex
        
        const space: SpaceOption = {
            index: i,
            item: props.items[i],
            column: columnIndex,
            top: top,
            left: left,
            bottom: top + h,
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

    // 父节点距离顶部的距离
    const parentTop = content.value.parentElement.offsetTop

    const tp = -contentTop.value + parentTop

    const [topPreloadScreenCount, bottomPreloadScreenCount] = props.preloadScreenCount
    // 避免多次访问
    const innerHeight = content.value.parentElement.clientHeight

    // 顶部的范围: 向上预加载preloadScreenCount个屏幕，Y轴上部
    const minLimit = tp - topPreloadScreenCount * innerHeight
    // 底部的范围: 向下预加载preloadScreenCount个屏幕
    const maxLimit = tp + (bottomPreloadScreenCount + 1) * innerHeight
    
    const items = []
    
    for (let i = 0; i < length; i++) {
        const v = itemSpaces.value[i]
        const t = v.top
        const b = v.bottom
        // 这里的逻辑是：
        // 只要元素部分出现在可视区域里就算作可见，因此有三段判断:
        // 1. 元素的上边界在容器内
        // 2. 元素的下边界在容器内
        // 3. 元素覆盖了整个容器
        if(
            (t >= minLimit && t <= maxLimit) ||
            (b >= minLimit && b <= maxLimit) ||
            (t < minLimit && b > maxLimit)
        ) {
            items.push(v)
        }
    }
    return items
})

// 获取当前元素应该处于哪一列
const getColumnIndex = (): number => {
    return columnsTop.value.indexOf(Math.min(...columnsTop.value))
}
</script>
