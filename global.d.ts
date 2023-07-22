declare module 'vue' {
    export interface GlobalComponents {
        VirtualWaterfall: typeof import('@lhlyu/vue-virtual-waterfall')['VirtualWaterfall']
    }
}
export {}