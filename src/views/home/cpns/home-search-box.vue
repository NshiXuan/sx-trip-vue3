<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <div class="location">
      <div class="city" @click="cityClick">{{currentCity?.cityName}}</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>

    <!-- 日期范围 -->
    <div class="section date-range" @click="showCalendar=true">
      <div class="start">
        <span class="tip">入住</span>
        <span class="time">{{startDateStr}}</span>
      </div>
      <div class="stay">共{{stayCount}}晚</div>
      <div class="end">
        <span class="tip">离店</span>
        <span class="time">{{endDateStr}}</span>
      </div>
    </div>
    <van-calendar v-model:show="showCalendar" @confirm="onConfirm" color="#ff9854" type="range" />
  </div>

  <!-- 价格/人数选择 -->
  <div class="section price-counter bottom-gray-line">
    <div class="start">价格不限</div>
    <div class="end">人数不限</div>
  </div>
  <!-- 关键字 -->
  <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

  <!-- 热门建议 -->
  <div class="section hot-suggest">
    <template v-for="(item,index) in hotSuggests" :key="index">
      <div class="item" :style="{color: item.tagText.color,background: item.tagText.background.color}">
        {{item.tagText.text}}</div>
    </template>
  </div>

  <!-- 搜索按钮 -->
  <div class="section search-btn">
    <div class="btn" @click="searchBtnClick">开始搜索</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city';
import useHomeStore from '@/stores/modules/home';
import useMainStore from '@/stores/modules/main';
import { storeToRefs } from 'pinia';
import { formatMonthDay, getDiffDays } from '@/utils/format_date'

const router = useRouter()

// 位置/城市
const cityClick = () => {
  router.push('/city')
}

const positionClick = () => {
  navigator.geolocation.getCurrentPosition(res => {
    console.log('获取位置成功: ', res);
  }, err => {
    console.log('获取位置失败: ', err);
  }, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  })
}

// 当前城市
const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)

// 日期范围处理
const mainStore = useMainStore()
const { startDate, endDate } = storeToRefs(mainStore)

const startDateStr = computed(() => formatMonthDay(startDate.value))
const endDateStr = computed(() => formatMonthDay(endDate.value))

const stayCount = ref(getDiffDays(startDate.value, endDate.value))

// 日历选择
const showCalendar = ref(false)
const onConfirm = (dates) => {
  const selectStartDate = dates[0]
  const selectEndDate = dates[1]
  mainStore.startDate = selectStartDate
  mainStore.endDate = selectEndDate
  stayCount.value = getDiffDays(selectStartDate, selectEndDate)
  showCalendar.value = false;
};

// 热门数据
const homeStore = useHomeStore()
const { hotSuggests } = storeToRefs(homeStore)

// 开始搜索
const searchBtnClick = () => {
  router.push({
    path: "/search",
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: currentCity.value.cityName
    }
  })
}
</script>

<style lang="less" scoped>
.location {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;

  .city {
    flex: 1;
    font-size: 15px;
    color: #333;
  }

  .position {
    width: 74px;
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      position: relative;
      top: 2px;
      font-size: 12px;
      color: #666;
    }

    img {
      width: 18px;
      height: 18px;
      margin-left: 5px;
    }
  }
}

.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  color: #999;
  height: 44px;
  font-size: 14px;

  .start {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .end {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .tip {
    font-size: 12px;
    color: #999;
  }

  .time {
    margin-top: 3px;
    color: #333;
    font-size: 15px;
    font-weight: 500;
  }

  .stay {
    font-size: 12px;
    color: #666;
  }
}

.hot-suggest {
  padding: 0 30px;
  justify-content: flex-start;
  height: auto;

  .item {
    padding: 4px 8px;
    margin: 4px;
    border-radius: 14px;
    font-size: 12px;
    line-height: 1;
  }
}

.search-btn {
  display: flex;
  justify-content: center;
  align-items: center;

  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient);
  }
}
</style>