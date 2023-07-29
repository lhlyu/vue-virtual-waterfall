import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    let base = '/'
    let plugins = [
        vue(),
        AutoImport({
            resolvers: [ArcoResolver()],
        }),
        Components({
            resolvers: [
                ArcoResolver({
                    sideEffect: true
                })
            ]
        }),
    ]
    let build: Record<string, any> = {
        target: 'es2015',
        cssTarget: 'chrome61'
    }

    if (mode === 'npm') {
        plugins = [vue(), cssInjectedByJsPlugin(), dts({
            entryRoot: 'src/vue-virtual-waterfall'
        })]
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
