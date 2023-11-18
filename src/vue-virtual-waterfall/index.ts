import type { App } from 'vue'
import VirtualWaterfall from './virtual-waterfall.vue'

export { VirtualWaterfall }

export default {
    install(app: App) {
        app.component(VirtualWaterfall.name, VirtualWaterfall)
    }
}

// 全局引入时，需要声明一下全局组件，不然没有提示
declare module 'vue' {
    export interface GlobalComponents {
        VirtualWaterfall: typeof VirtualWaterfall
    }
}
