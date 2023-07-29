<template>
    <main>
        <a-split style="height: 100%; width: 100%;" v-model:size="size" min="360px" max="0.85">
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
                    </a-form>
                </aside>
            </template>
        </a-split>
    </main>
</template>

<script setup lang="ts">
import {ref, onMounted, reactive, provide} from "vue"
import Example from "./example.vue";

const size = ref(0.85)

const cfg = reactive<CfgOption>({
    gap: 15,
    maxColumnCount: '自动',
    minColumnCount: 2,
    itemMinWidth: 250,
    itemHeight: '自动'
})

provide('cfg', cfg)

const appHeight = ref('100vh')

onMounted(() => {
    appHeight.value = window.innerHeight + 'px'
})
</script>

<style lang="scss">
body {
    margin: 0;
    padding: 0;

    main {
        height: v-bind(appHeight);
        width: 100%;

        aside {
            box-sizing: border-box;
            padding: 20px;
            user-select: none;
        }
    }
}
</style>
