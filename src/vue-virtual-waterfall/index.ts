import type { App } from 'vue'
import VirtualWaterfall from './virtual-waterfall.vue'

export { VirtualWaterfall }

export default {
    install(app: App) {
        app.component(VirtualWaterfall.name, VirtualWaterfall)
    }
}

declare module 'vue' {
    export interface GlobalComponents {
        VirtualWaterfall: typeof VirtualWaterfall
    }
}
