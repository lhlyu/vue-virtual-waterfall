# vue-virtual-waterfall

> vue3 virtual waterfall component

[English Doc](./README.md)

## 示例

- [例子](https://waterfall.tatakai.top)
- [例子源码](./src/example/Example.vue)

## 使用

> pnpm add @lhlyu/vue-virtual-waterfall

- 局部引用

```ts
import { VirtualWaterfall } from '@lhlyu/vue-virtual-waterfall'
```

- 全局引用

```ts
import VueVirtualWaterfall from '@lhlyu/vue-virtual-waterfall'

app.use(VueVirtualWaterfall)
```

- 使用

```vue

<template>
	<VirtualWaterfall :items="items" :calcItemHeight="calcItemHeight" :loading="loading" @load-more="loadMoreData">
		<template #default="{ item }: { item: ItemOption }">
			<div class="card">
				<img :src="item.img"/>
			</div>
		</template>
	</VirtualWaterfall>
</template>
```

## 文档

- 属性

| 字段                 | 类型                                         | 默认值                                     | 说明              |
|--------------------|--------------------------------------------|-----------------------------------------|-----------------|
| height             | string                                     | '100vh'                                 | 容器的高度           |
| rowKey             | string                                     | 'id'                                    | v-for需要用到key    |
| gap                | number                                     | 15                                      | 每个item之间的间隔     |
| contentMaxWidth    | string or number                           | '100%'                                  | 内容最大宽度          |
| preloadScreenCount | number                                     | 1                                       | 预加载屏数量          |
| bottomDistance     | number                                     | 250                                     | 距离底部多少时触发加载更多事件 |
| itemMinWidth       | number                                     | 250                                     | 每个item最小宽度      |
| maxColumnCount     | number                                     |                                         | 允许的最大列数，默认没有限制  |
| minColumnCount     | number                                     | 2                                       | 允许的最小列数         |
| loading            | boolean                                    | false                                   | 是否正在加载数据        |
| items              | any[]                                      | []                                      | 数据              |
| calcItemHeight     | `(item: any, itemWidth: number) => number` | `(item: any, itemWidth: number) => 250` | 计算item高度的方法     |

- 插槽

| 事件      | 类型                             | 说明      |
|---------|--------------------------------|---------|
| default | `{ item: any, index: number }` | 自定义默认内容 |

- 事件

| 事件        | 类型           | 说明   |
|-----------|--------------|------|
| load-more | `() => void` | 加载更多 |

- 暴露的方法

| 方法      | 类型           | 说明    |
|---------|--------------|-------|
| backTop | `() => void` | 滚动到顶部 |

## 性能

- [链接](https://pagespeed.web.dev/analysis/https-waterfall-tatakai-top/4k2zfz71vl?form_factor=desktop)

## 参考

- [vue-waterfall-easy](https://github.com/lfyfly/vue-waterfall-easy)
- [lite-virtual-list](https://github.com/wensiyuanseven/lite-virtual-list)
- [vue3-waterfall-plugin](https://github.com/heikaimu/vue3-waterfall-plugin)
- [vue-waterfall](https://github.com/MopTym/vue-waterfall)
- [vue-masonry-css](https://github.com/paulcollett/vue-masonry-css)
- [瀑布流虚拟列表优化](https://juejin.cn/post/7166071557284954142)
- [PixivCollection](https://github.com/orilights/PixivCollection)
- [v3-waterfall](https://github.com/gk-shi/v3-waterfall)
- [滚动优化](https://juejin.cn/post/6844903493677875214?from=search-suggest)
- [scroll-event](https://ayase.moe/2018/11/20/scroll-event/)
- [缓存设置](https://developer.chrome.com/docs/lighthouse/performance/uses-long-cache-ttl/?utm_source=lighthouse&utm_medium=lr)
