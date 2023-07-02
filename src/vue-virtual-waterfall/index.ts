import VirtualWaterfall from './VirtualWaterfall.vue'

//实现按需引入
export { VirtualWaterfall }

const install = function (App) {
    App.component('VirtualWaterfall', VirtualWaterfall)
}

export default { install }
