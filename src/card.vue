<template>
    <div class="card">
        <div class="img" ref="dom" :style="`background-color: rgb(${color[0]}, ${color[1]}, ${color[2]});`">
            <Transition>
                <img v-if="loaded" :src="img" :alt="id" />
            </Transition>
        </div>
        <div class="text" v-if="text.length">
            {{ text }}
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
    },
    text: {
        type: String,
        default: ''
    }
})

const loaded = ref(props.has)

const emit = defineEmits(['loaded'])

const dom = ref<HTMLDivElement>()

const { stop } = useIntersectionObserver(dom, ([{ isIntersecting }]) => {
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
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 1px solid #dddddd;
    border-radius: 10px;

    .img {
        flex: 1;
        width: 100%;
        height: 0;
        background: transparent;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            overflow: hidden;
        }
    }

    .text {
        flex-shrink: 0;
        box-sizing: border-box;
        width: 100%;
        height: fit-content;
        padding: 10px;
        line-height: 1.7;
        word-wrap: break-word;
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
