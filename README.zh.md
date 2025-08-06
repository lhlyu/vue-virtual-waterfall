# vue-virtual-waterfall

> 一款vue3虚拟瀑布流组件

[![npm](https://img.shields.io/npm/v/%40lhlyu%2Fvue-virtual-waterfall)](https://www.npmjs.com/package/@lhlyu/vue-virtual-waterfall)

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
    <VirtualWaterfall :items="items" :calcItemHeight="calcItemHeight">
        <template #default="{ item }: { item: ItemOption }">
            <div class="card">
                <img :src="item.img" />
            </div>
        </template>
    </VirtualWaterfall>
</template>
```

- 在`Nuxt3`中使用

[例子](https://codesandbox.io/p/devbox/vue-virtual-waterfall-nuxt-demo-h7g569)

### 注意!!!

**`VirtualWaterfall`
组件想要实现虚拟列表，包裹它的容器必须指明固定的高度，滚动事件可以绑定在这个容器上，如果这个组件挂在到body下，同样需要指明body的高度，滚动事件可以绑定在
`window`
上**

## 文档

- 属性

| 字段                 | 类型                                         | 默认值                                     | 说明                        |
|--------------------|--------------------------------------------|-----------------------------------------|---------------------------|
| virtual            | boolean                                    | true                                    | 是否启用虚拟列表                  |
| rowKey             | string                                     | 'id'                                    | v-for需要用到key              |
| enableCache        | boolean                                    | true                                    | 是否启用缓存                    |
| gap                | number                                     | 15                                      | 每个item之间的间隔               |
| padding            | number or string                           | 15 or '15px 15px'                       | 容器内边距                     |
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

- 方法

| Event          | Type                                                              | Description |
|----------------|-------------------------------------------------------------------|-------------|
| withItemSpaces | `(cb: (spaces: readonly SpaceOption[]) => Promise<void> \| void)` | 读取元素空间信息 |
