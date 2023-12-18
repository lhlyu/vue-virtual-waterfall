# vue-virtual-waterfall

> 一款vue3虚拟瀑布流组件

[English Doc](./README.md)

## 示例

- [例子](https://waterfall.tatakai.top)
- [例子源码](./src/example/Example.vue)

## 使用

> pnpm add @lhlyu/vue-virtual-waterfall

- 局部引用

```ts
import {VirtualWaterfall} from '@lhlyu/vue-virtual-waterfall'
```

- 全局引用

```ts
import VueVirtualWaterfall from '@lhlyu/vue-virtual-waterfall'

app.use(VueVirtualWaterfall)
```

- 使用

```vue

<template>
	<VirtualWaterfall :items="items" :calcItemHeight="calcItemHeight">
		<template #default="{ item }: { item: ItemOption }">
			<div class="card">
				<img :src="item.img"/>
			</div>
		</template>
	</VirtualWaterfall>
</template>
```

- 在`Nuxt3`中使用

[例子](https://stackblitz.com/edit/waterfall-nuxt)

## 文档

- 属性

| 字段                 | 类型                                         | 默认值                                     | 说明                        |
|--------------------|--------------------------------------------|-----------------------------------------|---------------------------|
| virtual            | boolean                                    | true                                    | 是否启用虚拟列表                  |
| rowKey             | string                                     | 'id'                                    | v-for需要用到key              |
| gap                | number                                     | 15                                      | 每个item之间的间隔               |
| preloadScreenCount | `[number, number]`                         | `[0:0]`                                 | 预加载屏数量`[上面预加载屏数，下面预加载屏数]` |
| itemMinWidth       | number                                     | 220                                     | 每个item最小宽度                |
| maxColumnCount     | number                                     | 10                                      | 允许的最大列数                   |
| minColumnCount     | number                                     | 2                                       | 允许的最小列数                   |
| items              | any[]                                      | []                                      | 数据                        |
| calcItemHeight     | `(item: any, itemWidth: number) => number` | `(item: any, itemWidth: number) => 250` | 计算item高度的方法               |

- 插槽

| 事件      | 类型                             | 说明      |
|---------|--------------------------------|---------|
| default | `{ item: any, index: number }` | 自定义默认内容 |
