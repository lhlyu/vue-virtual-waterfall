# vue-virtual-waterfall

> vue3 virtual waterfall component

## 示例

- [demo](https://lhlyu.github.io/vue-virtual-waterfall)
- [demo的源码](./src/App.vue)

## 使用

> pnpm add @lhlyu/vue-virtual-waterfall

- 局部使用

```vue
import { VueVirtualWaterfall } from '@lhlyu/vue-virtual-waterfall'
```

- 全局使用

```vue
import VueVirtualWaterfall from '@lhlyu/vue-virtual-waterfall'

app.use(VueVirtualWaterfall)
```

## 文档

- 属性

| 字段                 | 类型                                    | 默认值                                 | 说明              |
|--------------------|-----------------------------------------|-------------------------------------|-----------------|
| key                | string                                  | 'id'                                | v-for需要用到key    |
| gap                | number                                  | 15                                  | 每个item之间的间隔     |
| preloadScreenCount | number                                  | 3                                   | 预加载屏数量          |
| bottomDistance     | number                                  | 1000                                | 距离底部多少时触发加载更多事件 |
| itemMinWidth       | number                                  | 240                                 | 每个item最小宽度      |
| loading            | boolean                                 | false                               | 是否正在加载数据        |
| items              | any[]                                   | []                                  | 数据              |
| calcItemHeight     | (item: any, itemWidth: number) => number | (item: any, itemWidth: number) => 0 | 计算item高度的方法     |

- 事件

| 事件  | 说明   |
|-----|------|
| load-more | 加载更多 |

- 方法

| 方法        | 说明    |
|-----------|-------|
| backTop | 滚动到顶部 |


## 参考

- [vue-waterfall-easy](https://github.com/lfyfly/vue-waterfall-easy)
- [lite-virtual-list](https://github.com/wensiyuanseven/lite-virtual-list)
- [vue3-waterfall-plugin](https://github.com/heikaimu/vue3-waterfall-plugin)
- [vue-waterfall](https://github.com/MopTym/vue-waterfall)
- [vue-masonry-css](https://github.com/paulcollett/vue-masonry-css)
- [瀑布流虚拟列表优化](https://juejin.cn/post/7166071557284954142)
- [PixivCollection](https://github.com/orilights/PixivCollection)