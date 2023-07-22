import { withInstall } from "./install.ts";
import VirtualWaterfall from './virtual-waterfall.vue'

export { VirtualWaterfall }

export const VueVirtualWaterfall = withInstall(VirtualWaterfall)

export default VueVirtualWaterfall.install


declare module 'vue' {
    export interface GlobalComponents {
        VirtualWaterfall: typeof VirtualWaterfall
    }
}