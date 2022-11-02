<template>
  <div class="app">
    <!-- <keep-alive includes="home">
      <router-view />
    </keep-alive> -->
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>
    <!-- <TabBar v-if="!route.meta.hideTabBar" /> -->
    <TabBar v-show="!route.meta.hideTabBar" />
    <Loading />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import TabBar from './components/TabBar/TabBar.vue';
import Loading from './components/loading/loading.vue';

const route = useRoute()
</script>

<style lang="less" scoped>

</style>