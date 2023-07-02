import { createApp } from 'vue'
import App from './App.vue'
import VueVirtualWaterfall from '@lhlyu/vue-virtual-waterfall'

const app = createApp(App)

app.use(VueVirtualWaterfall)

app.mount('body')
