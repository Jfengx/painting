<template lang="pug">
#gallery
  .container(:style="{ height: `${(gallery.length + 1) * 100}vh` }")
    .inner.rel.sti.full-screen.flex-center.column
      Artboard(:gallery="gallery")
</template>

<script setup lang="ts">
const gallery = [
  '《害羞蓝人中了毒》',
  '《持仓》',
  '《奶茶、芝士、珍珠分装》',
  '《十连》',
  '《帅气史莱姆》',
  '《dream car》',
  '《对号入座》',
  '《微信列表》',
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
