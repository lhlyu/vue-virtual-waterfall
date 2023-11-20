import { onMounted, onUnmounted, reactive } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const useSplit = () => {
    const splitOption = reactive({
        height: '100vh',
        left: '300px',
        leftMin: '0',
        rightMin: '0'
    })

    const calcAppWidth = () => {
        splitOption.height = window.innerHeight + 'px'
        if (window.innerWidth > 1000) {
            splitOption.left = window.innerWidth - 300 + 'px'
            splitOption.rightMin = '300px'
            return
        }
        splitOption.left = window.innerWidth + 'px'
        splitOption.rightMin = '0'
    }

    onMounted(() => {
        calcAppWidth()
        window.addEventListener('resize', useDebounceFn(calcAppWidth, 125))
    })

    onUnmounted(() => {
        window.removeEventListener('resize', useDebounceFn(calcAppWidth, 200))
    })

    return {
        splitOption
    }
}

export default useSplit
