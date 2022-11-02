<template>
  <div class="city-group">
    <van-index-bar :index-list="indexList">
      <van-index-anchor index="热门" />
      <div class="list">
        <template v-for="(city,index) in groupData?.hotCities">
          <div class="city" @click="cityClick(city)">{{city.cityName}}</div>
        </template>
      </div>

      <template v-for="(group,index) in groupData?.cities">
        <van-index-anchor :index="group.group" />
        <template v-for="(city,index) in group.cities">
          <van-cell :title="city.cityName" @click="cityClick(city)" />
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city';

const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({})
  }
})

// 动态的索引
const indexList = computed(() => {
  const list = props.groupData.cities.map(item => item.group)
  list.unshift('#')
  return list
})

// 监听城市的点击
const router = useRouter()
const cityStore = useCityStore()
const cityClick = (city) => {
  // 选中当前城市
  cityStore.currentCity = city

  // 返回上一级
  router.back()
}
</script>

<style lang="less" scoped>
.list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0 20px;

  .city {
    width: 70px;
    height: 28px;
    border-radius: 14px;
    font-size: 12px;
    line-height: 28px;
    text-align: center;
    background-color: #fff4ec;
  }
}
</style>