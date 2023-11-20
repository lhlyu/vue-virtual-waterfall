import { onBeforeMount, ref, reactive } from 'vue'


// const proxy_base_url = "https://proxy.pixivel.moe/"
const proxy_base_url = "https://px3.rainchan.win/"

const handlerUrl = (url: string): string => {
    url = url.replace('_p0.', '_p0_master1200.')
    url = url.replace('.png', '.jpg')
    return proxy_base_url + 'c/540x540_70/img-master/' + url
}

const handlerAvatar = (url: string): string => {
    url = url.replace('.', '_50.')
    return proxy_base_url + url
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
        let height = 120
        if (waterfallOption.onlyImage) {
            height = 0
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
