import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    let base = '/vue-virtual-waterfall/'
    const plugins = [vue(), vueJsx()]
    let build: Record<string, any> = {
        outDir: 'docs'
    }

    if (mode === 'npm') {
        base = '/'
        plugins.push(dts({
            entryRoot: 'src/vue-virtual-waterfall'
        }))
        build = {
            target: 'es2015',
            cssTarget: 'chrome61',
            copyPublicDir: false,
            lib: {
                entry: 'src/vue-virtual-waterfall/index.ts',
                formats: ['cjs', 'es', 'umd'],
                name: 'VueVirtualWaterfall',
                fileName: 'index'
            },
            rollupOptions: {
                external: ['vue'],
                output: {
                    globals: {
                        vue: 'Vue'
                    },
                    exports: 'named'
                }
            }
        }
    }

    return {
        base,
        plugins,
        build
    }
})
