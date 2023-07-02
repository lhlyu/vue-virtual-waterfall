import type { App } from 'vue'
import VirtualWaterfall from './virtual-waterfall.vue'

export { VirtualWaterfall }

export default {
    install(Vue: App) {
        Vue.component(VirtualWaterfall.name, VirtualWaterfall)
    }
}
