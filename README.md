# vue-virtual-waterfall

> A Vue 3 virtual waterfall component

[![npm](https://img.shields.io/npm/v/%40lhlyu%2Fvue-virtual-waterfall)](https://www.npmjs.com/package/@lhlyu/vue-virtual-waterfall)

[中文文档](./README.zh.md)

## Example

- [Example](https://waterfall.tatakai.top)
- [Example Source Code](./src/example/Example.vue)

## Usage

> pnpm add @lhlyu/vue-virtual-waterfall

- Local import

```ts
import { VirtualWaterfall } from '@lhlyu/vue-virtual-waterfall'
```

- Global import

```ts
import VueVirtualWaterfall from '@lhlyu/vue-virtual-waterfall'

app.use(VueVirtualWaterfall)
```

- Usage

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

- Nuxt3 Usage

[demo](https://codesandbox.io/p/devbox/vue-virtual-waterfall-nuxt-demo-h7g569)

### Attention!!!

**The `VirtualWaterfall` component wants to implement a virtual list, and the container that wraps it must indicate a
fixed height. The scrolling event can be bound to this container. If this component is hung under the body, the height
of the body also needs to be specified. The scrolling event can be bound to the `window`**

## Documentation

- Properties

| Field              | Type                                       | Default                                 | Description                           |
|--------------------|--------------------------------------------|-----------------------------------------|---------------------------------------|
| virtual            | boolean                                    | true                                    | Enable virtual list                   |
| rowKey             | string                                     | 'id'                                    | Key for v-for                         |
| enableCache        | boolean                                    | true                                    | enable cache                          |
| gap                | number                                     | 15                                      | Gap between each item                 |
| padding            | number or string                           | 15 or '15px 15px'                       | Container's padding                   |
| preloadScreenCount | `[number, number]`                         | `[0, 0]`                                | Preload screen count `[above, below]` |
| itemMinWidth       | number                                     | 220                                     | Minimum width for each item           |
| maxColumnCount     | number                                     | 10                                      | Maximum number of columns             |
| minColumnCount     | number                                     | 2                                       | Minimum number of columns             |
| items              | any[]                                      | []                                      | Data                                  |
| calcItemHeight     | `(item: any, itemWidth: number) => number` | `(item: any, itemWidth: number) => 250` | Method to calculate item height       |

- Slots

| Event   | Type                           | Description            |
|---------|--------------------------------|------------------------|
| default | `{ item: any, index: number }` | Custom default content |

- Methods

| Event          | Type                                                              | Description |
|----------------|-------------------------------------------------------------------|-------------|
| withItemSpaces | `(cb: (spaces: readonly SpaceOption[]) => Promise<void> \| void)` | Read Item Spaces Info |
