<template>
    <div class="card" :style="`background-color: rgb(${color[0]}, ${color[1]}, ${color[2]});`">
        <img :class="{ 'img-loaded': loaded }" :src="img" :alt="id" :loading="lazy" @load="handlerLoad" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
        transition: all 0.4s ease-in;
    }

    .img-loaded {
        filter: blur(0);
    }
}
</style>
