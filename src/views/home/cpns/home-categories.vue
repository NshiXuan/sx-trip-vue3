<template>
  <div class="categories">
    <template v-for="(item,index) in categories">
      <div class="item">
        <img :src="item.pictureUrl" alt="">
        <div class="text">{{item.title}}</div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import useHomeStore from '../../../stores/modules/home';

const homeStore = useHomeStore()
const { categories } = storeToRefs(homeStore)
</script>

<style lang="less" scoped>
.categories {
  display: flex;
  overflow-x: auto;
  height: 80px;
  padding: 0 10px;
  margin-top: 8px;

  // &为当前
  &::-webkit-scrollbar {
    display: none;
  }

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70px;
    flex-shrink: 0;

    img {
      width: 32px;
      height: 32px;
    }

    .text {
      font-size: 12px;
      margin-top: 8px;
    }
  }
}
</style>