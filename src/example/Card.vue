<template>
    <article
        class="card"
        :data-id="item.id"
    >
        <div
            class="body"
            v-if="!onlyImage"
        >
            <h3>{{ item.title }}</h3>
            <div class="author">
                <div class="avatar">
                    <img
                        :src="item.avatar"
                        :alt="item.user"
                    />
                    <span>{{ item.user }}</span>
                </div>
                <div class="views">❤️ {{ item.views > 999 ? '999+' : item.views }}</div>
            </div>
        </div>
        <div
            class="cover"
            v-if="!noImage"
        >
            <Transition>
                <img
                    v-if="loaded"
                    :src="item.url"
                    alt="图片"
                />
                <svg v-else width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                    <g fill="none" fill-rule="evenodd" stroke-width="2">
                        <circle cx="22" cy="22" r="1">
                            <animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"></animate>
                            <animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"></animate>
                        </circle>
                        <circle cx="22" cy="22" r="1">
                            <animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"></animate>
                            <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"></animate>
                        </circle>
                    </g>
                </svg>
            </Transition>
        </div>
    </article>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

const props = withDefaults(
    defineProps<{
        item: ItemOption
        onlyImage?: boolean
        noImage?: boolean
        width?: string
    }>(),
    {
        onlyImage: false,
        noImage: false,
        width: '100%'
    }
)

const loaded = ref(false)
const height = ref('auto')

onBeforeMount(() => {
    if (!props.noImage) {
        height.value = '100%'
        new Promise(resolve => {
            const image = new Image()
            image.src = props.item.url
            if (image.complete) {
                loaded.value = true
                resolve(true)
                return
            }

            image.onload = () => {
                loaded.value = true
                resolve(true)
            }

            image.onerror = error => {
                console.error(props.item.url, error)
                loaded.value = true
                resolve(true)
            }
        })
    }
})
</script>

<style scoped lang="scss">
.card {
    display: flex;
    flex-direction: column-reverse;
    width: v-bind(width);
    height: v-bind(height);
    overflow: hidden;
    background: white;
    border: 1px solid #e3e8f7;
    border-radius: 10px;

    .cover {
        display: flex;
        flex: 1;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: #e3e8f7;

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .body {
        flex-shrink: 0;
        box-sizing: border-box;
        height: fit-content;
        padding: 12px;

        h3 {
            margin: 0;
            padding: 0;
            font-weight: bolder;
            font-size: 14px;
        }

        .author {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-top: 8px;

            .avatar {
                display: flex;
                flex-direction: row;
                align-items: center;

                img {
                    width: 20px;
                    height: 20px;
                    object-fit: cover;
                    border-radius: 50%;
                }

                span {
                    margin-left: 4px;
                    overflow: hidden;
                    color: #333333;
                    font-size: 12px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }

            .views {
                color: #333333;
                font-size: 12px;
            }
        }
    }
}
.v-enter-active,
.v-leave-active {
    opacity: 1;
    transition: all 0.4s linear;
    will-change: opacity;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    will-change: opacity;
}
</style>
