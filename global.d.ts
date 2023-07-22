// GlobalComponents for Volar
declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        VirtualWaterfall: typeof import('@lhlyu/vue-virtual-waterfall')['VirtualWaterfall']
    }
}

export {}