<template>
    <main>
        <Example v-if="isMobile"></Example>
        <a-split v-else style="height: 100%; width: 100%" v-model:size="size" min="360px" :max="max">
            <template #first>
                <Example></Example>
            </template>
            <template #second>
                <aside>
                    <a-form :model="cfg" layout="vertical">
                        <a-form-item field="gap" label="间隔(px)">
                            <a-input-number v-model="cfg.gap" :min="0" :max="100" />
                        </a-form-item>
                        <a-form-item field="itemMinWidth" label="元素理论最小宽度(px)">
                            <a-input-number v-model="cfg.itemMinWidth" :min="0" :max="1000" />
                        </a-form-item>
                        <a-form-item field="minColumnCount" label="最小列数(不大于最大列数)">
                            <a-select v-model="cfg.minColumnCount">
                                <a-option>1</a-option>
                                <a-option>2</a-option>
                                <a-option>3</a-option>
                                <a-option>4</a-option>
                                <a-option>5</a-option>
                                <a-option>6</a-option>
                                <a-option>7</a-option>
                                <a-option>8</a-option>
                                <a-option>9</a-option>
                                <a-option>10</a-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item field="maxColumnCount" label="最大列数">
                            <a-select v-model="cfg.maxColumnCount">
                                <a-option>自动</a-option>
                                <a-option>1</a-option>
                                <a-option>2</a-option>
                                <a-option>3</a-option>
                                <a-option>4</a-option>
                                <a-option>5</a-option>
                                <a-option>6</a-option>
                                <a-option>7</a-option>
                                <a-option>8</a-option>
                                <a-option>9</a-option>
                                <a-option>10</a-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item field="itemHeight" label="元素高度">
                            <a-select v-model="cfg.itemHeight">
                                <a-option value="自动">自动</a-option>
                                <a-option value="250">默认(250px)</a-option>
                                <a-option value="1:1">1:1</a-option>
                                <a-option value="2:3">2:3</a-option>
                                <a-option value="3:4">3:4</a-option>
                                <a-option value="4:5">4:5</a-option>
                                <a-option value="9:16">9:16</a-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item field="showText" label="是否展示文本">
                            <a-switch v-model="cfg.showText" />
                        </a-form-item>
                    </a-form>
                </aside>
            </template>
        </a-split>
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, provide, onUnmounted } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import Example from './example.vue'

const size = ref(0.8)
const max = ref(0.8)

const cfg = reactive<CfgOption>({
    gap: 15,
    maxColumnCount: '自动',
    minColumnCount: 2,
    itemMinWidth: 250,
    itemHeight: '自动',
    showText: true
})

provide('cfg', cfg)

const appHeight = ref('100vh')

const isMobile = ref(false)

const calcAppWidth = () => {
    if (window.innerWidth > 1000) {
        isMobile.value = false
        return
    }
    isMobile.value = true
}

onMounted(() => {
    appHeight.value = window.innerHeight + 'px'
    calcAppWidth()
    window.addEventListener('resize', useDebounceFn(calcAppWidth, 200))
})

onUnmounted(() => {
    window.removeEventListener('resize', useDebounceFn(calcAppWidth, 200))
})
</script>

<style lang="scss">
body {
    margin: 0;
    padding: 0;

    main {
        width: 100%;
        height: v-bind(appHeight);

        aside {
            box-sizing: border-box;
            padding: 20px;
            user-select: none;
        }
    }
}
</style>
