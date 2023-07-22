// import { withInstall } from './install.ts'
import VirtualWaterfall from './virtual-waterfall.vue'
import { App } from "vue"

export { VirtualWaterfall }

// export const VueVirtualWaterfall = withInstall(VirtualWaterfall)
//
// export default VueVirtualWaterfall.install

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



