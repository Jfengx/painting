<template lang="pug">
#gallery
  .container(:style="{ height: `${(gallery.length * (pageType === 'shot' ? 0 : 1) + 1) * 100}vh`, overflow: 'hidden' }")
    .inner.rel.sti.full-screen.flex-center.column
      Artboard(:gallery="gallery" v-if="pageType === 'art'")
      Shotboard(:gallery="gallery" v-else-if="pageType === 'shot'")
</template>

<script setup lang="ts">
const pageType = ref<'art' | 'shot'>('shot');

// @todo 自动导入
const gallery = [
  '《害羞蓝人中了毒》',
  '《持仓》',
  '《奶茶、芝士、珍珠分装》',
  '《十连》',
  '《帅气史莱姆》',
  '《dream car》',
  '《对号入座》',
  '《微信列表》',
  '《方便面人》',
  '《商品运力不足》',
];
</script>

<style lang="stylus" scoped>
#gallery
  .container
    width 100%
    .inner
      .desc
        top 20px
        left 20px
      .artboard
        margin-top -5vw
</style>
