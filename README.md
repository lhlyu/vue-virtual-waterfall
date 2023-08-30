# vue-virtual-waterfall

> vue3 virtual waterfall component

[中文文档](./README.zh.md)

## Examples

- [Example](https://waterfall.tatakai.top)
- [Example Source Code](./src/App.vue)

## Usage

> pnpm add @lhlyu/vue-virtual-waterfall

- Local Import

```ts
import {VirtualWaterfall} from '@lhlyu/vue-virtual-waterfall'
```

- Global Import

```ts
import VueVirtualWaterfall from '@lhlyu/vue-virtual-waterfall'

app.use(VueVirtualWaterfall)
```

- Usage

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

## Documentation

- Properties

| Field              | Type                                     | Default Value                         | Description                                     |
|--------------------|------------------------------------------|---------------------------------------|-------------------------------------------------|
| rowKey             | string                                   | 'id'                                  | Key used for v-for loop                         |
| gap                | number                                   | 15                                    | Gap between each item                           |
| contentMaxWidth    | string or number                         | '100%'                                | Maximum width of the content                    |
| preloadScreenCount | number                                   | 1                                     | Number of screens to preload                    |
| bottomDistance     | number                                   | 2000                                  | Distance from bottom to trigger load more event |
| itemMinWidth       | number                                   | 250                                   | Minimum width of each item                      |
| maxColumnCount     | number                                   |                                       | Maximum number of columns, no limit by default  |
| minColumnCount     | number                                   | 2                                     | Minimum number of columns                       |
| loading            | boolean                                  | false                                 | Whether data is loading                         |
| items              | any[]                                    | []                                    | Data                                            |
| calcItemHeight     | (item: any, itemWidth: number) => number | (item: any, itemWidth: number) => 250 | Method to calculate item height                 |

- Slots

| Name    | Type                         | Description        |
|---------|------------------------------|--------------------|
| default | { item: any, index: number } | Customized content |

- Events

| Event     | Type       | Description     |
|-----------|------------|-----------------|
| load-more | () => void | Load more event |

- Exposed Methods

| Method  | Type       | Description   |
|---------|------------|---------------|
| backTop | () => void | Scroll to top |

## Performance

- [Link](https://pagespeed.web.dev/analysis/https-waterfall-tatakai-top/4k2zfz71vl?form_factor=desktop)

## References

- [vue-waterfall-easy](https://github.com/lfyfly/vue-waterfall-easy)
- [lite-virtual-list](https://github.com/wensiyuanseven/lite-virtual-list)
- [vue3-waterfall-plugin](https://github.com/heikaimu/vue3-waterfall-plugin)
- [vue-waterfall](https://github.com/MopTym/vue-waterfall)
- [vue-masonry-css](https://github.com/paulcollett/vue-masonry-css)
- [Optimization of Waterfall Virtual List](https://juejin.cn/post/7166071557284954142)
- [PixivCollection](https://github.com/orilights/PixivCollection)

- [Cache Settings](https://developer.chrome.com/docs/lighthouse/performance/uses-long-cache-ttl/?utm_source=lighthouse&utm_medium=lr)
