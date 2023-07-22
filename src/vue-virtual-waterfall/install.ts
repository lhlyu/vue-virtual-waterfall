import type { App, Component, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin;

// 组件
export const withInstall = <T extends Component>(comp: T) => {
    const install = (app: App): void => {
        app.component(comp.name, comp)
    }

    return Object.assign(comp, { install }) as SFCWithInstall<T>
}