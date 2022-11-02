import { onMounted, onUnmounted, ref } from 'vue';
import { throttle } from 'underscore';

// export default function useScroll(callback) {
//   const scrollListenerHandler = () => {
//     const clientHeight = document.documentElement.clientHeight
//     const scrollTop = document.documentElement.scrollTop
//     const scrollHeight = document.documentElement.scrollHeight
//     console.log(clientHeight, scrollTop, scrollHeight)
//     if (clientHeight + scrollTop >= scrollHeight - 1) {
//       console.log('到底部了');
//       if (callback) callback()
//     }
//   }

//   onMounted(() => {
//     window.addEventListener("scroll", scrollListenerHandler)
//   })

//   onUnmounted(() => {
//     window.removeEventListener("scroll", scrollListenerHandler)
//   })
// }

export default function useScroll(elRef) {
  let el = window
  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  const scrollListenerHandler = throttle(() => {
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight
      scrollTop.value = document.documentElement.scrollTop
      scrollHeight.value = document.documentElement.scrollHeight
    } else {
      clientHeight.value = el.clientHeight
      scrollTop.value = el.scrollTop
      scrollHeight.value = el.scrollHeight
      // console.log(clientHeight.value, scrollTop.value, scrollHeight.value);
    }
    // console.log(clientHeight.value, scrollTop.value, scrollHeight.value)
    if (clientHeight.value + scrollTop.value >= scrollHeight.value - 1) {
      // console.log('到底部了');
      isReachBottom.value = true
    }
  }, 100)

  onMounted(() => {
    if (elRef) el = elRef.value
    el.addEventListener("scroll", scrollListenerHandler)
  })

  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler)
  })

  return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}