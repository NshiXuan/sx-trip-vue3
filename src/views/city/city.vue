<template>
  <div class="city top-page">
    <div class="top">
      <!-- 1.搜索框 -->
      <van-search v-model="searchValue" placeholder="城市/区域/位置" shape="round" show-action @cancel="cancelClick" />

      <!-- 2，tab栏切换 -->
      <van-tabs v-model:active="tabActive" color="#ff9854">
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <template v-for="(value, key, index) in allCities">
        <CityGroup v-show="tabActive===key" :groupData="value" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city';
import { storeToRefs } from 'pinia';
import CityGroup from './cpns/city-group.vue';

const router = useRouter()

// 搜索框
const searchValue = ref("")
const cancelClick = () => {
  // 返回上一级页面
  router.back()
}

// tab的切换
const tabActive = ref()


// 从store中获取数据
const cityStore = useCityStore()
cityStore.fetchAllcitiesData()
const { allCities } = storeToRefs(cityStore)

// 获取选中标签后的数据
const currentGroup = computed(() => allCities.value[tabActive.value])
</script>

<style lang="less" scoped>
.city {
  .top {
    position: relative;
    z-index: 9;
  }

  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>