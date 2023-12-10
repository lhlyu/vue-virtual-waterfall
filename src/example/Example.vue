<template>
    <TinySplit :style="{ height: splitOption.height }" v-model="splitOption.left" :left-top-min="splitOption.leftMin" :right-bottom-min="splitOption.rightMin">
        <template #left>
            <VirtualWaterfall
                ref="vm"
                :virtual="waterfallOption.virtual"
                :loading="waterfallOption.loading"
                :gap="waterfallOption.gap"
                :bottom-distance="waterfallOption.bottomDistance"
                :item-min-width="waterfallOption.itemMinWidth"
                :min-column-count="waterfallOption.minColumnCount"
                :max-column-count="waterfallOption.maxColumnCount"
                :calc-item-height="calcItemHeight"
                :items="data.list"
                @load-more="loadData">
                <template #default="{ item }: { item: ItemOption }">
                    <Card :item="item" :onlyImage="waterfallOption.onlyImage"></Card>
                </template>
            </VirtualWaterfall>
        </template>
        <template #right>
            <div class="option">
                <TinyForm label-position="top">
                    <TinyFormItem label="间隔 [0:100]">
                        <TinyNumeric unit="px" :min="0" :max="100" v-model="waterfallOption.gap"></TinyNumeric>
                    </TinyFormItem>
                    <TinyFormItem label="每个元素最小宽度 [100:600]">
                        <TinyNumeric unit="px" :min="100" :max="600" v-model="waterfallOption.itemMinWidth"></TinyNumeric>
                    </TinyFormItem>
                    <TinyFormItem label="距离底部多少时加载更多 [0:10000]">
                        <TinyNumeric unit="px" :min="0" :max="10000" v-model="waterfallOption.bottomDistance"></TinyNumeric>
                    </TinyFormItem>
                    <TinyFormItem label="最小列数 [1:max]">
                        <TinyNumeric unit="列" :min="1" :max="waterfallOption.maxColumnCount" v-model="waterfallOption.minColumnCount"></TinyNumeric>
                    </TinyFormItem>
                    <TinyFormItem label="最大列数 [min:20]">
                        <TinyNumeric unit="列" :min="waterfallOption.minColumnCount" :max="20" v-model="waterfallOption.maxColumnCount"></TinyNumeric>
                    </TinyFormItem>
                    <TinyFormItem label="仅展示图片">
                        <TinySwitch v-model="waterfallOption.onlyImage"></TinySwitch>
                    </TinyFormItem>
                    <TinyFormItem label="虚拟列表">
                        <TinySwitch v-model="waterfallOption.virtual"></TinySwitch>
                    </TinyFormItem>
                    <TinyFormItem label="数据统计">
                        <p>当前页码: {{ data.page }} / {{ data.max }}</p>
                        <p>已加载量: {{ data.list.length }} / {{ data.total }}</p>
                        <p>等待加载: {{ waterfallOption.loading }}</p>
                    </TinyFormItem>

                    <TinyButton @click="backTop">返回顶部</TinyButton>
                </TinyForm>
            </div>
        </template>
    </TinySplit>
</template>

<script setup lang="ts">
import TinySplit from '@opentiny/vue-split'
import TinyForm from '@opentiny/vue-form'
import TinyFormItem from '@opentiny/vue-form-item'
import TinyNumeric from '@opentiny/vue-numeric'
import TinySwitch from '@opentiny/vue-switch'
import TinyButton from '@opentiny/vue-button'
import VirtualWaterfall from '../vue-virtual-waterfall/virtual-waterfall.vue'
import Card from './Card.vue'
import useSplit from './useSplit.ts'
import useWaterfall from './useWaterfall.ts'

// 分隔板参数控制
const { splitOption } = useSplit()

const { vm, backTop, waterfallOption, data, loadData, calcItemHeight } = useWaterfall()
</script>

<style lang="scss">
.option {
    padding: 20px;
}
p {
    margin: 0;
    padding: 0;
}
</style>
