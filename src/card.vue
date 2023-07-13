<template>
    <div class="card" :style="`background-color: rgb(${color[0]}, ${color[1]}, ${color[2]});`">
        <div class="img" ref="dom">
            <Transition>
                <img v-if="loaded" :src="img" :alt="id" />
            </Transition>
        </div>
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

    .img {
        width: 100%;
        height: 100%;
        background: transparent;
    }

    img {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
}
.v-enter-active,
.v-leave-active {
    opacity: 1;
    transition: opacity 0.8s ease-in-out;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
