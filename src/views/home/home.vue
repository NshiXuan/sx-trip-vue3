<template>
  <div class="home" ref="homeRef">
    <HomeNavBar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <HomeSearchBox />
    <HomeCategories />

    <div class="search-bar" v-show="isShowSearchBar">
      <SearchBar />
    </div>

    <HomeContent />
    <!-- <button @click="moreBtnClick">加载更多</button> -->
  </div>
</template>

<script setup>
import { watch, ref, computed, onActivated } from 'vue';
import HomeNavBar from './cpns/home-nav-bar.vue';
import HomeSearchBox from './cpns/home-search-box.vue';
import HomeCategories from './cpns/home-categories.vue';
import HomeContent from './cpns/home-content.vue';

import useHomeStore from '../../stores/modules/home';
import useScroll from '@/hooks/useScroll'
import SearchBar from '../../components/search-bar/search-bar.vue';

// 发生网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouselistData()

// 监听滚动到底部
const homeRef = ref()
const { isReachBottom, scrollTop } = useScroll(homeRef)
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouselistData().then(() => {
      isReachBottom.value = false
    })
  }
})

// 搜索框显示的控制
// const isShowSearchBar = ref(false)
// watch(scrollTop, (newTop) => {
//   isShowSearchBar.value = newTop > 100
// })
// 定义的可响应式数据，依赖另外一个可响应式数据，那么可以使用计算属性(computed)
const isShowSearchBar = computed(() => {
  return scrollTop.value > 360
})

// 跳转回home时，保留原来的位置
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value
  })
})

</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 60px;
}

.banner {
  img {
    width: 100%;
  }
}

.search-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
  z-index: 9;
}
</style>