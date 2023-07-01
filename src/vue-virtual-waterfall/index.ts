import VueVirtualWaterfall from './VueVirtualWaterfall.vue'

//实现按需引入
export { VueVirtualWaterfall }

const install = function (App, options) {
    App.component('VueVirtualWaterfall', VueVirtualWaterfall)
}

export default { install }
