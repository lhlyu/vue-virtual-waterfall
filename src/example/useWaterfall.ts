import { onBeforeMount, ref, reactive, render, h } from 'vue'
import Card from './Card.vue'

// const proxy_base_url = "https://proxy.pixivel.moe/"
const proxy_base_url = 'https://px3.rainchan.win/'

const handlerUrl = (url: string): string => {
    url = url.replace('_p0.', '_p0_master1200.')
    url = url.replace('.png', '.jpg')
    return proxy_base_url + 'c/540x540_70/img-master/' + url
}

const handlerAvatar = (url: string): string => {
    url = url.replace('.', '_50.')
    return proxy_base_url + url
}

// 计算真实高度，这里只计算除了图片的高度
function getRealHeight(item: ItemOption, realWidth: number) {
    const dom = document.createElement('div')

    render(
        h(Card, {
            item: item,
            width: realWidth + 'px',
            noImage: true
        }),
        dom
    )

    document.body.appendChild(dom)

    // 获取高度
    const height: number = dom.clientHeight

    // 移除新容器
    document.body.removeChild(dom)
    // 返回高度
    return height
}

const useWaterfall = () => {
    // 给瀑布流组件加个ref，下面返回顶部函数需要用到
    const vm = ref()

    const backTop = () => {
        vm.value?.backTop()
    }

    // 瀑布流的一些属性
    const waterfallOption = reactive({
        loading: false,
        virtual: true,
        gap: 15,
        bottomDistance: 250,
        itemMinWidth: 250,
        minColumnCount: 2,
        maxColumnCount: 10,
        // 是否只展示图片，这是自定义加的一个属性
        onlyImage: false
    })

    // 瀑布流元素高度的计算函数
    const calcItemHeight = (item: ItemOption, itemWidth: number) => {
        let height = 0
        // 当包含图文时，需要单独计算文字部分的高度
        // 文字部分的高度 + 图片的高度 = 真实高度
        if (!waterfallOption.onlyImage) {
            height = getRealHeight(item, itemWidth)
        }
        return item.height * (itemWidth / item.width) + height
    }

    // 需要展示数据的属性
    const data = reactive({
        page: 0,
        size: 40,
        total: 0,
        max: 0,
        list: [] as ItemOption[],
        end: false
    })

    // 加载更多数据的函数
    const loadData = async () => {
        waterfallOption.loading = true
        if (data.end) {
            waterfallOption.loading = false
            return
        }
        data.page += 1
        const response = await fetch(`https://mock.tatakai.top/images/${data.page}/${data.size}`)
        const result = await response.json()
        if (!result.list.length) {
            data.end = true
            waterfallOption.loading = false
            return
        }
        data.total = result.total
        data.max = result.max

        const list: ItemOption[] = []

        for (let i = 0; i < result.list.length; i++) {
            list.push({
                id: result.list[i].id,
                title: result.list[i].title,
                url: handlerUrl(result.list[i].url),
                width: result.list[i].width,
                height: result.list[i].height,
                avatar: handlerAvatar(result.list[i].author.avatar),
                user: result.list[i].author.name,
                views: result.list[i].statistic.views
            })
        }

        data.list = [...data.list, ...list]
        waterfallOption.loading = false
    }

    onBeforeMount(async () => {
        await loadData()
    })

    return {
        vm,
        backTop,
        waterfallOption,
        data,
        loadData,
        calcItemHeight
    }
}

export default useWaterfall
