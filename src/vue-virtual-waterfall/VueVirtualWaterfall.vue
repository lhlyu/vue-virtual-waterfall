<template>
    <div ref="container" style="width: 100%; height: 100%; overflow: auto; scroll-behavior: smooth;">
        <div
            ref="content"
            :style="{
                position: 'relative',
                height: `${Math.max(...columnsTop) + props.gap}px`,
                padding: `${gap}px`,
                boxSizing: 'border-box',
                width: '100%',
                willChange: 'height',
            }"
        >
            <div
                v-for="(data, index) in itemRenderList"
                :key="data.item[key] ?? index"
                :style="{
                    position: 'absolute',
                    width: `${itemWidth}px`,
                    height: `${data.height}px`,
                    transform: `translate(${data.left}px, ${data.top}px)`,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    contentVisibility: 'auto',
                    containIntrinsicSize: `${data.height}px`,
                }"
            >
                <slot :item="data.item" :index="index"></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" generic="T = any">
import { computed, onMounted, ref } from 'vue'
import { useElementBounding, useDebounce, useElementSize, useScroll, useDebounceFn } from '@vueuse/core'

const props = withDefaults(
    defineProps<{
        key?: string
        // item间隔
        gap?: number
        // 预加载屏数量
        preloadScreenCount?: number
        // 距离底部多少时触发加载更多的事件
        bottomDistance?: number
        // item最小宽度
        itemMinWidth?: number
        // 是否正在加载数据
        loading?: boolean
        // 数据
        items?: T[]
        // 计算单个item高度的方法
        calcItemHeight?: (item: T, itemWidth: number) => number
    }>(),
    {
        key: 'id',
        gap: 15,
        preloadScreenCount: 1,
        bottomDistance: 2000,
        itemMinWidth: 240,
        loading: false,
        items: () => [],
        calcItemHeight: (item: T, itemWidth: number) => 0
    }
)

const slot = defineSlots<{
    default(props: { item: T; index: number }): any
}>()

const emit = defineEmits(['load-more'])

// 容器
const container = ref<HTMLDivElement>()
const { y } = useScroll(container)

const loadMore = useDebounceFn(
    () => {
        if (props.loading) {
            return
        }
        if (content.value.offsetHeight - y.value - container.value.clientHeight < props.bottomDistance) {
            emit('load-more')
        }
    },
    100,
    { maxWait: 500 }
)

onMounted(() => {
    container.value?.addEventListener('scroll', loadMore)
})

const content = ref<HTMLDivElement>()
const { width } = useElementSize(content)
const { top } = useElementBounding(content)
const contentWidth = useDebounce(width, 200, { maxWait: 400 })
const contentTop = useDebounce(top, 200, { maxWait: 400 })
// 计算列数
const columnCount = computed(() => {
    if (!contentWidth.value) {
        return 0
    }
    const cWidth = contentWidth.value + props.gap * 2
    if (cWidth >= props.itemMinWidth * 2) {
        return Math.ceil(cWidth / props.itemMinWidth)
    }
    return 2
})

// 每列距离顶部的距离
const columnsTop = ref(new Array(columnCount.value).fill(0))

// 计算每个item占据的宽度: (容器宽度 - 间隔) / 列数
const itemWidth = computed(() => {
    if (!contentWidth.value || columnCount.value <= 0) {
        return 0
    }
    return (contentWidth.value - (columnCount.value - 1) * props.gap) / columnCount.value
})

// 计算每个item占据的空间
const itemSpaces = computed(() => {
    if (!contentWidth.value) {
        return []
    }
    columnsTop.value = new Array(columnCount.value).fill(0)
    const length = props.items.length
    const spaces = []
    // 为了高性能采用for-i
    for (let i = 0; i < length; i++) {
        const columnIndex = getColumnIndex()
        const space = {
            item: props.items[i],
            column: columnIndex,
            top: columnsTop.value[columnIndex],
            left: (itemWidth.value + props.gap) * columnIndex,
            height: props.calcItemHeight(props.items[i], itemWidth.value)
        }

        // 累加当前列的高度
        columnsTop.value[columnIndex] += props.calcItemHeight(props.items[i], itemWidth.value) + props.gap

        spaces.push(space)
    }
    return spaces
})

// 需要渲染的items
const itemRenderList = computed(() => {
    const length = itemSpaces.value.length
    if (!length) {
        return []
    }

    // 顶部的范围: 向上预加载preloadScreenCount个屏幕，Y轴上部
    const topLimit = -contentTop.value - props.preloadScreenCount * window.innerHeight
    // 底部的范围: 向下预加载preloadScreenCount个屏幕
    const bottomLimit = -contentTop.value + (props.preloadScreenCount + 1) * window.innerHeight
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

// 滚动到顶部
defineExpose({
    backTop() {
        container.value?.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
})
</script>
