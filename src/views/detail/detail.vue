<template>
  <div class="detail top-page" ref="detailRef">
    <TabControl v-if="showTabControl" class="tabs" :titles="names" @tab-item-click="tabClick" ref="tabControlRef" />
    <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="onClickLeft" />

    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <!-- 轮播图 -->
      <DetailSwiper :swipe-data="mainPart.topModule.housePicture.housePics" />
      <!-- 描述信息 -->
      <DetailInfo name="描述" :ref="getSectionRef" :topInfos="mainPart.topModule" />
      <DetailFacility name="设施" :ref="getSectionRef"
        :house-facility="mainPart.dynamicModule.facilityModule.houseFacility" />
      <!-- 房东介绍 -->
      <DetailLandlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule" />
      <!-- 评论模块 -->
      <DetailComment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule" />
      <!-- 预定须知 -->
      <DetailNotice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules" />
      <!-- 位置周边 -->
      <DetailMap name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule" />
      <!-- 价格说明 -->
      <DetailIntro :price-intro="mainPart.introductionModule" />
    </div>

    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getDetailInfos } from '../../services';
import DetailSwiper from './cpns/detail_01-swiper.vue';
import DetailInfo from './cpns/detail_02-infos.vue';
import DetailFacility from './cpns/detail_03-facility.vue';
import DetailLandlord from './cpns/detail_04-landlord.vue';
import DetailComment from './cpns/detail_05-comment.vue';
import DetailNotice from './cpns/detail_06-notice.vue';
import DetailMap from './cpns/detail_07-map.vue';
import DetailIntro from './cpns/detail_08-intro.vue';
import TabControl from '../../components/tab-control/tab-control.vue';
import useScroll from '../../hooks/useScroll';

const router = useRouter()
const route = useRoute()
const houseId = route.params.id

// 发送网络请求获取数据
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
getDetailInfos(houseId).then(res => {
  detailInfos.value = res.data
})

// 监听返回按钮
const onClickLeft = () => {
  router.back()
}

// tabControl的操作
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
  return scrollTop.value > 300
})

// 设置滚动行为改为平滑的滚动
// const landlordRef = ref()
// const sectionEls = []
const sectionEls = ref({})
const names = computed(() => {
  return Object.keys(sectionEls.value)
})
const getSectionRef = (value) => {
  if (!value) return
  const name = value?.$el.getAttribute("name")
  sectionEls.value[name] = value.$el
}

let isClick = false
let currentDistance = -1
const tabClick = (index) => {
  const key = Object.keys(sectionEls.value)[index]
  const el = sectionEls.value[key]
  let distance = el.offsetTop

  // const nextKey = Object.keys(sectionEls.value)[index - 1]
  // let nextEl = ref({})
  // if (nextKey) {
  //   nextEl = sectionEls.value[nextKey]
  //   console.log(nextEl.offsetTop);
  // }

  // 第一个tab时不用-44
  if (index !== 0) {
    distance = distance - 44
  }

  isClick = true
  currentDistance = distance

  detailRef.value.scrollTo({
    // $el可以拿到根元素 44为固定定位top栏的高度
    top: distance,
    behavior: "smooth"
  })
}

// 页面滚动，滚动时匹配对应的tabController的index
const tabControlRef = ref()
watch(scrollTop, (newVlaue) => {
  if (newVlaue == currentDistance) {
    isClick = false
  }
  if (isClick) return

  // 1.获取所有区域的offsetTops
  const els = Object.values(sectionEls.value)
  const values = els.map(el => el.offsetTop)

  // 2.根据newValue匹配想要的索引
  let index = values.length - 1
  for (let i = 0; i < values.length; i++) {
    if (values[i] > newVlaue + 44) {
      index = i - 1
      break
    }
  }
  // console.log(tabControlRef.value?.currentIndex, 'ok');
  console.log(index);
  tabControlRef.value?.setCurrentIndex(index)
})
</script>

<style lang="less" scoped>
.tabs {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>