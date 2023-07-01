import VueVirtualWaterfall from './VueVirtualWaterfall.vue'

//实现按需引入
export { VueVirtualWaterfall }

const components = [
    VueVirtualWaterfall
]

const install = function (App, options) {
    components.forEach(component => {
        App.component(component.name, component)
    })
}

export default { install }
