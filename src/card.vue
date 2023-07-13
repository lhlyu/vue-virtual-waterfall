<template>
    <div ref="dom" class="card" :style="`background-color: rgb(${color[0]}, ${color[1]}, ${color[2]});`">
        <img v-if="loaded" class="img-loaded" :src="img" :alt="id" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
    id: {
        type: String,
        default: ''
    },
    img: {
        type: String,
        default: ''
    },
    has: {
        type: Boolean,
        default: false
    },
    // safari / firefox支持很差
    lazy: {
        type: String,
        default: 'lazy'
    },
    color: {
        type: Array,
        default: () => [255, 255, 255]
    }
})

const loaded = ref(props.has)

const emit = defineEmits(['loaded'])

const dom = ref<HTMLDivElement>()

const { stop } = useIntersectionObserver(dom, ([{ isIntersecting }], observerElement) => {
    if (props.has) {
        stop()
        return
    }
    if (isIntersecting) {
        stop()

        // 加载图片
        const img = new Image()

        img.onload = () => {
            handlerLoad()
        }

        img.src = props.img
    }
})

const handlerLoad = () => {
    if (props.has) {
        return
    }
    loaded.value = true
    emit('loaded', props.id)
}
</script>

<style scoped lang="scss">
.card {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 1px solid #e5e5e5;
    border-radius: 10px;

    img {
        width: 100%;
        height: 100%;
        overflow: hidden;
        filter: blur(100px);
        transition: all 0.6s linear;
    }

    .img-loaded {
        filter: blur(0);
    }
}
</style>
