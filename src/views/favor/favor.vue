<template>
  <div class="favor">
    <h2>favor</h2>
    <input type="text" v-focus>
    <h2 v-test:params.modifiers1.modifiers2="message">呵呵呵</h2>
    <!-- <h2 v-why:kobe.abc.cba="message">呵呵呵</h2> -->
    <h2 v-unit>111</h2>
  </div>
</template>

<script setup>

const message = 'Hello'

const vTest = {
  mounted(el, bindings) {
    console.log(bindings)
    el.textContent = bindings.value
  }
}
</script>

<style lang="less" scoped>

</style>