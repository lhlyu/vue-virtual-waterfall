import { onMounted, onUnmounted, ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const useApp = () => {
    const asideShow = ref(true)
    const setAppStyle = () => {
        document.body.style.height = window.innerHeight + 'px'
        if (window.innerWidth > 640) {
            asideShow.value = true
            document.body.style.paddingRight = '300px'
            return
        }
        asideShow.value = false
        document.body.style.paddingRight = '0'
    }

    onMounted(() => {
        setAppStyle()
        window.addEventListener('resize', useDebounceFn(setAppStyle, 125))
    })

    onUnmounted(() => {
        window.removeEventListener('resize', useDebounceFn(setAppStyle, 125))
    })

    return {
        asideShow
    }
}

export default useApp
