import { useDebounceFn } from '@vueuse/core'
import { onMounted, onUnmounted, ref } from 'vue'

const useApp = () => {
    const asideShow = ref(true)

    const debouncedSetAppStyle = useDebounceFn(() => {
        document.body.style.height = window.innerHeight + 'px'
        if (window.innerWidth > 640) {
            asideShow.value = true
            document.body.style.paddingRight = '300px'
            return
        }
        asideShow.value = false
        document.body.style.paddingRight = '0'
    }, 125)

    onMounted(() => {
        debouncedSetAppStyle()
        window.addEventListener('resize', debouncedSetAppStyle)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', debouncedSetAppStyle)
    })

    return {
        asideShow,
    }
}

export default useApp
