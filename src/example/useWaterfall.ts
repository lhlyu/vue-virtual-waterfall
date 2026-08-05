import { layout, prepare, type PreparedText } from '@chenglou/pretext'
import { onMounted, onUnmounted, reactive } from 'vue'

// 这些尺寸需要与 style.css 中的卡片正文样式保持一致。
const CARD_TITLE_FONT = '700 14px "Helvetica Neue", Helvetica, Arial, sans-serif'
const CARD_TITLE_LINE_HEIGHT = 16.8
const CARD_TEXT_HORIZONTAL_INSET = 26
const CARD_BODY_FIXED_HEIGHT = 52

const backTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'instant',
    })
}

const useWaterfall = () => {
    const preparedTitleCache = new Map<string, PreparedText>()

    const getTextHeight = (item: ItemOption, itemWidth: number) => {
        let preparedTitle = preparedTitleCache.get(item.title)
        if (!preparedTitle) {
            preparedTitle = prepare(item.title, CARD_TITLE_FONT)
            preparedTitleCache.set(item.title, preparedTitle)
        }

        const textWidth = Math.max(1, itemWidth - CARD_TEXT_HORIZONTAL_INSET)
        return (
            layout(preparedTitle, textWidth, CARD_TITLE_LINE_HEIGHT).height + CARD_BODY_FIXED_HEIGHT
        )
    }

    const waterfallOption = reactive({
        loading: false,
        bottomDistance: 0,
        onlyImage: false,
        topPreloadScreenCount: 0,
        bottomPreloadScreenCount: 0,
        virtual: true,
        enableCache: true,
        gap: 15,
        padding: 15,
        itemMinWidth: 220,
        minColumnCount: 2,
        maxColumnCount: 10,
    })

    const calcItemHeight = (item: ItemOption, itemWidth: number) => {
        const imageHeight = item.height * (itemWidth / item.width)
        return waterfallOption.onlyImage
            ? imageHeight
            : imageHeight + getTextHeight(item, itemWidth)
    }

    const data = reactive({
        page: 0,
        size: 30,
        total: 0,
        max: 0,
        list: [] as ItemOption[],
        end: false,
    })

    const loadData = async () => {
        const nextPage = data.page + 1
        const response = await fetch(
            `https://mock.yuan.sh/images?page=${nextPage}&size=${data.size}&mode=simple`,
        )
        const result = await response.json()
        if (!result.list.length) {
            data.end = true
            return
        }
        data.page = nextPage
        data.total = result.total
        data.max = result.max
        data.list.push(...result.list)
    }

    const checkScrollPosition = async () => {
        if (waterfallOption.loading || data.end) {
            return
        }

        const scrollHeight = document.documentElement.scrollHeight
        const scrollTop = document.documentElement.scrollTop
        const clientHeight = document.documentElement.clientHeight

        const distanceFromBottom = scrollHeight - scrollTop - clientHeight

        if (distanceFromBottom <= waterfallOption.bottomDistance) {
            waterfallOption.loading = true
            try {
                await loadData()
            } catch (error) {
                console.error('加载数据失败', error)
            } finally {
                waterfallOption.loading = false
            }
        }
    }

    onMounted(() => {
        void checkScrollPosition()
        window.addEventListener('scroll', checkScrollPosition, { passive: true })
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', checkScrollPosition)
        preparedTitleCache.clear()
    })
    return {
        backTop,
        waterfallOption,
        data,
        calcItemHeight,
    }
}

export default useWaterfall
