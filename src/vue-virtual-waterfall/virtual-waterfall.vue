<template>
    <div
        ref="container"
        class="container"
        :style="{
            height: height
        }">
        <div
            ref="content"
            class="content"
            :style="{
                maxWidth: `${getValue(contentMaxWidth, '100%')}`,
                height: `${Math.max(...columnsTop) + props.gap}px`,
                padding: `${gap}px`
            }">
            <div
                class="box"
                v-for="(data, index) in itemRenderList"
                :key="data.item[rowKey] ?? index"
                :style="{
                    width: `${itemWidth}px`,
                    height: `${data.height}px`,
                    transform: `translate(${data.left}px, ${data.top}px)`,
                    containIntrinsicSize: `${itemWidth}px ${data.height}px`
                }">
                <slot :item="data.item" :index="index"></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useElementBounding, useThrottle, useElementSize, useInfiniteScroll } from '@vueuse/core'

defineOptions({
    name: 'VirtualWaterfall'
})

interface VirtualWaterfallOption {
    // 是否启用虚拟列表
    virtual?: boolean
    // 容器的高度
    height?: string
    rowKey?: string
    // item间隔
    gap?: number
    // 预加载屏数量
    preloadScreenCount?: number
    // 距离底部多少时触发加载更多的事件
    bottomDistance?: number
    // 内容区域最宽
    contentMaxWidth?: string | number
    // item最小宽度
    itemMinWidth?: number
    // 最大列数
    maxColumnCount?: number
    // 最小列数
    minColumnCount?: number
    // 是否正在加载数据
    loading?: boolean
    // 数据
    items?: any[]
    // 计算单个item高度的方法
    calcItemHeight?: (item: any, itemWidth: number) => number
}

const props = withDefaults(defineProps<VirtualWaterfallOption>(), {
    virtual: true,
    height: '100vh',
    rowKey: 'id',
    gap: 15,
    preloadScreenCount: 1,
    bottomDistance: 250,
    contentMaxWidth: '100%',
    itemMinWidth: 250,
    minColumnCount: 2,
    loading: false,
    items: () => [],
    calcItemHeight: (item: any, itemWidth: number) => 250
})

const slot = defineSlots<{
    default(props: { item: any; index: number }): any
}>()

const emit = defineEmits(['load-more'])

function getValue(value?: string | number, defaultValue: string = ''): string {
    if (typeof value === 'string') {
        return value
    }

    if (typeof value === 'number') {
        return value + 'px'
    }
    return defaultValue
}

// 容器
const container = ref<HTMLDivElement>()

useInfiniteScroll(
    container,
    () => {
        if (props.loading) {
            return
        }
        emit('load-more')
    },
    { distance: props.bottomDistance, direction: 'bottom' }
)

const content = ref<HTMLDivElement>()
const { width } = useElementSize(content)
const { top } = useElementBounding(content)
const contentWidth = useThrottle(width, 250)
const contentTop = useThrottle(top, 125)

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
    const cWidth = contentWidth.value + props.gap * 2
    if (cWidth >= props.itemMinWidth * 2) {
        const count = Math.ceil(cWidth / props.itemMinWidth)
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
    return Math.floor((contentWidth.value - (columnCount.value - 1) * props.gap) / columnCount.value)
})

interface SpaceOption {
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
    const cache = length > itemSpaces.value.length
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

        const space: SpaceOption = {
            item: props.items[i],
            column: columnIndex,
            top: columnsTop.value[columnIndex],
            left: (itemWidth.value + props.gap) * columnIndex,
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
    const top = -contentTop.value
    const preloadScreenCount = props.preloadScreenCount
    // 避免多次访问
    const innerHeight = container.value.clientHeight
    // 顶部的范围: 向上预加载preloadScreenCount个屏幕，Y轴上部
    const topLimit = top - preloadScreenCount * innerHeight
    // 底部的范围: 向下预加载preloadScreenCount个屏幕
    const bottomLimit = top + (preloadScreenCount + 1) * innerHeight
    const list = []
    for (let i = 0; i < length; i++) {
        // AND 运算比 OR 运算快
        if (itemSpaces.value[i].top > topLimit && itemSpaces.value[i].top < bottomLimit) {
            list.push(itemSpaces.value[i])
        }
    }
    return list
})

// 获取当前元素应该处于哪一列
const getColumnIndex = (): number => {
    return columnsTop.value.indexOf(Math.min(...columnsTop.value))
}

// 暴露的方法: 滚动到顶部
defineExpose({
    backTop() {
        container.value?.scrollTo({
            top: 0,
            behavior: 'instant'
        })
    }
})
</script>

<style lang="scss" scoped>
.container {
    box-sizing: border-box;
    width: 100%;
    overflow-y: auto;
    visibility: visible;
    scrollbar-width: none;
    -ms-overflow-style: none;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        display: none;
    }

    .content {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        margin: 0 auto;
        will-change: height;

        .box {
            position: absolute;
            content-visibility: auto;
        }
    }
}
</style>
