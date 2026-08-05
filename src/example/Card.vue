<template>
    <article
        class="waterfall-card"
        :data-id="item.id"
    >
        <div
            class="waterfall-card-body"
            v-if="!onlyImage"
        >
            <h3 class="waterfall-card-title">{{ item.title }}</h3>
            <div class="waterfall-card-author">
                <div class="waterfall-card-avatar">
                    <img
                        :src="item.avatar"
                        :alt="item.user"
                    />
                    <span>{{ item.user }}</span>
                </div>
                <div class="waterfall-card-views">
                    ❤️ {{ item.views > 999 ? '999+' : item.views }}
                </div>
            </div>
        </div>
        <div class="waterfall-card-cover">
            <Transition>
                <img
                    v-if="loaded"
                    :src="item.url"
                    alt="图片"
                />
                <svg
                    v-else
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                >
                    <g
                        fill="none"
                        fill-rule="evenodd"
                        stroke-width="2"
                    >
                        <circle
                            cx="22"
                            cy="22"
                            r="1"
                        >
                            <animate
                                attributeName="r"
                                begin="0s"
                                dur="1.8s"
                                values="1; 20"
                                calcMode="spline"
                                keyTimes="0; 1"
                                keySplines="0.165, 0.84, 0.44, 1"
                                repeatCount="indefinite"
                            ></animate>
                            <animate
                                attributeName="stroke-opacity"
                                begin="0s"
                                dur="1.8s"
                                values="1; 0"
                                calcMode="spline"
                                keyTimes="0; 1"
                                keySplines="0.3, 0.61, 0.355, 1"
                                repeatCount="indefinite"
                            ></animate>
                        </circle>
                        <circle
                            cx="22"
                            cy="22"
                            r="1"
                        >
                            <animate
                                attributeName="r"
                                begin="-0.9s"
                                dur="1.8s"
                                values="1; 20"
                                calcMode="spline"
                                keyTimes="0; 1"
                                keySplines="0.165, 0.84, 0.44, 1"
                                repeatCount="indefinite"
                            ></animate>
                            <animate
                                attributeName="stroke-opacity"
                                begin="-0.9s"
                                dur="1.8s"
                                values="1; 0"
                                calcMode="spline"
                                keyTimes="0; 1"
                                keySplines="0.3, 0.61, 0.355, 1"
                                repeatCount="indefinite"
                            ></animate>
                        </circle>
                    </g>
                </svg>
            </Transition>
        </div>
    </article>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

const props = defineProps<{
    item: ItemOption
    onlyImage?: boolean
}>()

const loaded = ref(false)

onBeforeMount(() => {
    const image = new Image()

    const complete = () => {
        loaded.value = true
    }

    image.addEventListener('load', complete, { once: true })
    image.addEventListener(
        'error',
        (error) => {
            console.error(props.item.url, error)
            complete()
        },
        { once: true },
    )
    image.src = props.item.url

    if (image.complete) {
        complete()
    }
})
</script>
