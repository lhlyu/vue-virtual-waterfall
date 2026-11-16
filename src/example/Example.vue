<template>
    <header class="example-header">
        <strong class="example-title">Vue瀑布流</strong>
        <small>
            <span class="version-badge">v{{ pkg.version }}</span>
        </small>
    </header>
    <VirtualWaterfall
        :virtual="waterfallOption.virtual"
        :gap="waterfallOption.gap"
        :enable-cache="waterfallOption.enableCache"
        :padding="waterfallOption.padding"
        :preload-screen-count="[
            waterfallOption.topPreloadScreenCount,
            waterfallOption.bottomPreloadScreenCount,
        ]"
        :item-min-width="waterfallOption.itemMinWidth"
        :max-column-count="waterfallOption.maxColumnCount"
        :min-column-count="waterfallOption.minColumnCount"
        :calc-item-height="calcItemHeight"
        :items="data.list"
    >
        <template #default="{ item }: { item: ItemOption }">
            <Card
                :item="item"
                :onlyImage="waterfallOption.onlyImage"
            />
        </template>
    </VirtualWaterfall>
    <aside class="settings-panel">
        <form class="settings-form">
            <div class="setting-field">
                <label class="setting-label">间隔 <code>[0:100]</code></label>
                <div class="setting-input-group">
                    <input
                        type="number"
                        class="setting-input"
                        v-model="waterfallOption.gap"
                        min="0"
                        max="100"
                        step="1"
                    />
                    <span class="setting-input-suffix">px</span>
                </div>
            </div>
            <div class="setting-field">
                <label class="setting-label">填充 <code>[0:100]</code></label>
                <div class="setting-input-group">
                    <input
                        type="number"
                        class="setting-input"
                        v-model="waterfallOption.padding"
                        min="0"
                        max="100"
                        step="1"
                    />
                    <span class="setting-input-suffix">px</span>
                </div>
            </div>
            <div class="setting-field">
                <label class="setting-label">每个元素的最小宽度 <code>[100:600]</code></label>
                <div class="setting-input-group">
                    <input
                        type="number"
                        class="setting-input"
                        v-model="waterfallOption.itemMinWidth"
                        min="100"
                        max="600"
                        step="1"
                    />
                    <span class="setting-input-suffix">px</span>
                </div>
            </div>
            <div class="setting-field">
                <label class="setting-label">距离底部多少加载更多 <code>[0:10000]</code></label>
                <div class="setting-input-group">
                    <input
                        type="number"
                        class="setting-input"
                        v-model="waterfallOption.bottomDistance"
                        min="0"
                        max="1000"
                        step="1"
                    />
                    <span class="setting-input-suffix">px</span>
                </div>
            </div>
            <div class="setting-field">
                <label class="setting-label"
                    >最小列数 <code>[0:{{ waterfallOption.maxColumnCount }}]</code>，最大列数
                    <code>[{{ waterfallOption.minColumnCount }}:10]</code></label
                >
                <div class="setting-input-group">
                    <input
                        type="number"
                        class="setting-input"
                        v-model="waterfallOption.minColumnCount"
                        min="0"
                        :max="waterfallOption.maxColumnCount"
                        step="1"
                    />
                    <span class="setting-input-suffix">列</span>
                    <input
                        type="number"
                        class="setting-input"
                        v-model="waterfallOption.maxColumnCount"
                        :min="waterfallOption.minColumnCount"
                        max="10"
                        step="1"
                    />
                    <span class="setting-input-suffix">列</span>
                </div>
            </div>
            <div class="setting-field">
                <label class="setting-label">(顶部/底部)预加载屏 <code>[0:5]</code></label>
                <div class="setting-input-group">
                    <input
                        type="number"
                        class="setting-input"
                        v-model="waterfallOption.topPreloadScreenCount"
                        min="0"
                        max="5"
                        step="1"
                    />
                    <input
                        type="number"
                        class="setting-input"
                        v-model="waterfallOption.bottomPreloadScreenCount"
                        min="0"
                        max="5"
                        step="1"
                    />
                </div>
            </div>
            <label class="setting-switch">
                <span>开启虚拟列表</span>
                <span class="switch-control">
                    <input
                        type="checkbox"
                        v-model="waterfallOption.virtual"
                    />
                    <span class="switch-track"></span>
                </span>
            </label>
            <label class="setting-switch">
                <span>开启列表缓存</span>
                <span class="switch-control">
                    <input
                        type="checkbox"
                        v-model="waterfallOption.enableCache"
                    />
                    <span class="switch-track"></span>
                </span>
            </label>
            <label class="setting-switch setting-switch-last">
                <span>仅展示图片</span>
                <span class="switch-control">
                    <input
                        type="checkbox"
                        v-model="waterfallOption.onlyImage"
                    />
                    <span class="switch-track"></span>
                </span>
            </label>
            <div class="setting-field data-summary">
                <span class="setting-label">数据展示</span>
                <p>每页条数: {{ data.size }}</p>
                <p>当前页码: {{ data.page }} / {{ data.max }}</p>
                <p>已加载量: {{ data.list.length }} / {{ data.total }}</p>
                <p>等待加载: {{ waterfallOption.loading }}</p>
            </div>
            <button
                type="button"
                class="back-top-button"
                @click="backTop"
            >
                回到顶部
            </button>
        </form>
    </aside>
</template>

<script setup lang="ts">
import pkg from '../../package.json'
import VirtualWaterfall from '../vue-virtual-waterfall/virtual-waterfall.vue'
import Card from './Card.vue'
import useWaterfall from './useWaterfall.ts'

const { backTop, waterfallOption, data, calcItemHeight } = useWaterfall()
</script>
