<template>
    <div class="card">
        <img :class="{ 'img-loaded': loaded }" :src="img" :alt="id" loading="lazy" @load="loaded = true" />
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
    }
})

const loaded = ref(false)
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
