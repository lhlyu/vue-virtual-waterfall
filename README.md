# vue-virtual-waterfall

> A Vue 3 virtual waterfall component

[中文文档](./README.zh.md)

## Example

- [Example](https://waterfall.tatakai.top)
- [Example Source Code](./src/example/Example.vue)

## Usage

> pnpm add @lhlyu/vue-virtual-waterfall

- Local import

```ts
import {VirtualWaterfall} from '@lhlyu/vue-virtual-waterfall'
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
				<img :src="item.img"/>
			</div>
		</template>
	</VirtualWaterfall>
</template>
```

- Nuxt3 Usage

[demo](https://stackblitz.com/edit/waterfall-nuxt)

## Documentation

- Properties

| Field              | Type                                       | Default                                 | Description                           |
|--------------------|--------------------------------------------|-----------------------------------------|---------------------------------------|
| virtual            | boolean                                    | true                                    | Enable virtual list                   |
| rowKey             | string                                     | 'id'                                    | Key for v-for                         |
| gap                | number                                     | 15                                      | Gap between each item                 |
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
