<template>
  <div class="map">
    <DetailSection title="位置周边" more-text="查看更多周边信息">
      <div class="baidu" ref="mapRef">百度地图</div>
    </DetailSection>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import DetailSection from '@/components/detail-section/detail-section.vue';

const props = defineProps({
  position: {
    type: Object,
    default: () => ({})
  }
})

const mapRef = ref()

onMounted(() => {
  // 创建地图实例 
  var map = new BMapGL.Map(mapRef.value);
  // 创建点坐标 
  var point = new BMapGL.Point(props.position.longitude, props.position.latitude);
  // 初始化地图，设置中心点坐标和地图级别
  map.centerAndZoom(point, 15);
  // 创建大头针并添加
  const marker = new BMapGL.Marker(point);
  map.addOverlay(marker)
})
</script>

<style lang="less" scoped>
.baidu {
  height: 300px;
}
</style>