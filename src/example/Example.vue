<template>
    <header>
        <strong>Vue瀑布流</strong>
        <small>
            <span class="badge text-bg-success">v{{ pkg.version }}</span>
        </small>
    </header>
    <VirtualWaterfall
        ref="vw"
        :virtual="waterfallOption.virtual"
        :gap="waterfallOption.gap"
        :enable-cache="waterfallOption.enableCache"
        :padding="waterfallOption.padding"
        :preload-screen-count="[waterfallOption.topPreloadScreenCount, waterfallOption.bottomPreloadScreenCount]"
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
            >
            </Card>
        </template>
    </VirtualWaterfall>
    <aside v-if="asideShow">
        <form>
            <div class="form-group form-group-sm mb-2">
                <label class="form-label fs-6">间隔 <code>[0:100]</code></label>
                <div class="input-group input-group-sm">
                    <input
                        type="number"
                        class="form-control"
                        v-model="waterfallOption.gap"
                        min="0"
                        max="100"
                        step="1"
                    />
                    <span
                        class="input-group-text"
                        id="basic-addon1"
                    >
                        px
                    </span>
                </div>
            </div>
            <div class="form-group form-group-sm mb-2">
                <label class="form-label fs-6">填充 <code>[0:100]</code></label>
                <div class="input-group input-group-sm">
                    <input
                        type="number"
                        class="form-control"
                        v-model="waterfallOption.padding"
                        min="0"
                        max="100"
                        step="1"
                    />
                    <span
                        class="input-group-text"
                        id="basic-addon1"
                    >
                        px
                    </span>
                </div>
            </div>
            <div class="form-group form-group-sm mb-2">
                <label class="form-label fs-6">每个元素的最小宽度 <code>[100:600]</code></label>
                <div class="input-group input-group-sm">
                    <input
                        type="number"
                        class="form-control"
                        v-model="waterfallOption.itemMinWidth"
                        min="100"
                        max="600"
                        step="1"
                    />
                    <span
                        class="input-group-text"
                        id="basic-addon1"
                        >px</span
                    >
                </div>
            </div>
            <div class="form-group form-group-sm mb-2">
                <label class="form-label fs-6">距离底部多少加载更多 <code>[0:10000]</code></label>
                <div class="input-group input-group-sm">
                    <input
                        type="number"
                        class="form-control"
                        v-model="waterfallOption.bottomDistance"
                        min="0"
                        max="1000"
                        step="1"
                    />
                    <span
                        class="input-group-text"
                        id="basic-addon1"
                        >px</span
                    >
                </div>
            </div>
            <div class="form-group form-group-sm mb-2">
                <label class="form-label fs-6"
                    >最小列数 <code>[0:{{ waterfallOption.maxColumnCount }}]</code>，最大列数 <code>[{{ waterfallOption.minColumnCount }}:10]</code></label
                >
                <div class="input-group input-group-sm">
                    <input
                        type="number"
                        class="form-control"
                        v-model="waterfallOption.minColumnCount"
                        min="0"
                        :max="waterfallOption.maxColumnCount"
                        step="1"
                    />
                    <span
                        class="input-group-text"
                        id="basic-addon1"
                        >列</span
                    >
                    <input
                        type="number"
                        class="form-control"
                        v-model="waterfallOption.maxColumnCount"
                        :min="waterfallOption.minColumnCount"
                        max="10"
                        step="1"
                    />
                    <span
                        class="input-group-text"
                        id="basic-addon1"
                        >列</span
                    >
                </div>
            </div>
            <div class="form-group form-group-sm mb-2">
                <label class="form-label fs-6">(顶部/底部)预加载屏 <code>[0:5]</code></label>
                <div class="input-group input-group-sm">
                    <input
                        type="number"
                        class="form-control"
                        v-model="waterfallOption.topPreloadScreenCount"
                        min="0"
                        max="5"
                        step="1"
                    />
                    <input
                        type="number"
                        class="form-control"
                        v-model="waterfallOption.bottomPreloadScreenCount"
                        min="0"
                        max="5"
                        step="1"
                    />
                </div>
            </div>
            <div class="form-group form-group-sm form-check form-switch mb-1">
                <label class="form-label fs-6">开启虚拟列表</label>
                <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="waterfallOption.virtual"
                />
            </div>
            <div class="form-group form-group-sm form-check form-switch mb-1">
                <label class="form-label fs-6">开启列表缓存</label>
                <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="waterfallOption.enableCache"
                />
            </div>
            <div class="form-group form-group-sm form-check form-switch mb-2">
                <label class="form-label fs-6">仅展示图片</label>
                <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="waterfallOption.onlyImage"
                />
            </div>
            <div class="form-group form-group-sm mb-2">
                <label class="form-label fs-6">数据展示</label>
                <p>每页条数: {{ data.size }}</p>
                <p>当前页码: {{ data.page }} / {{ data.max }}</p>
                <p>已加载量: {{ data.list.length }} / {{ data.total }}</p>
                <p>等待加载: {{ waterfallOption.loading }}</p>
            </div>
            <button
                type="button"
                class="btn btn-primary btn-sm"
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
import useApp from './useApp.ts'
import useWaterfall from './useWaterfall.ts'

const { asideShow } = useApp()

const { backTop, waterfallOption, data, calcItemHeight } = useWaterfall()
</script>

<style lang="scss">
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
body {
    padding-top: 72px;
    background: #f1f2f6;
    user-select: none;
}
header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 72px;
    background-color: white;
    border-bottom: 1px solid #f1f2f6;
    
    strong {
        font-size: 24px;
        margin-right: 8px;
    }
}
aside {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100%;
    padding-top: 72px;
    background-color: white;
    border-left: 1px solid #f1f2f6;

    form {
        width: 100%;
        height: 100%;
        padding: 20px;

        p {
            margin: 0;
        }
    }
}
</style>
