import { App } from '@vue/runtime-core';
import VirtualWaterfall from './virtual-waterfall.vue'

export { VirtualWaterfall }

export default {
    install(Vue: App) {
        Vue.component(VirtualWaterfall.name, VirtualWaterfall)
    }
}
