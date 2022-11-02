<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" route>
      <template v-for="(item,index) in tabbarDate">
        <van-tabbar-item :to="item.path">
          <span>{{item.text}}</span>
          <template #icon>
            <img v-if="currentIndex!==index" :src="getAssetURL(item.image)" alt="">
            <img v-else :src="getAssetURL(item.imageActive)" alt="">
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue';
import tabbarDate from '@/assets/data/tabbar'
import { getAssetURL } from '@/utils/load_assets'
import { useRoute } from 'vue-router';

const route = useRoute()
const currentIndex = ref(0)
watch(route, (newRoute) => {
  const index = tabbarDate.findIndex(item => item.path === newRoute.path)
  if (index === -1) return
  currentIndex.value = index
})
</script>

<style lang="less" scoped>
.tab-bar {
  img {
    height: 26px;
  }
}
</style>