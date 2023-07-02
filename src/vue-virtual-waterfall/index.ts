import type { App } from 'vue'
import VirtualWaterfall from './virtual-waterfall.vue'

const install = (app: App) => {
    app.component(VirtualWaterfall.name, VirtualWaterfall)
}

export { VirtualWaterfall }

export default {
    install
}
