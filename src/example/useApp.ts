import { onMounted, onUnmounted, ref } from 'vue'

const useApp = () => {
    const asideShow = ref(true)
    let timer: ReturnType<typeof setTimeout> | undefined

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

    const debouncedSetAppStyle = () => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(setAppStyle, 125)
    }

    onMounted(() => {
        setAppStyle()
        window.addEventListener('resize', debouncedSetAppStyle)
    })

    onUnmounted(() => {
        if (timer) {
            clearTimeout(timer)
        }
        window.removeEventListener('resize', debouncedSetAppStyle)
    })

    return {
        asideShow,
    }
}

export default useApp
