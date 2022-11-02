export default function directiveFocus(app) {
  // 注册一个全局自定义指令 `v-focus`
  app.directive('focus', {
    // 当被绑定的元素插入到 DOM 时，自动触发 mounted 函数
    mounted(el) {
      el?.focus()
    }
  })
}