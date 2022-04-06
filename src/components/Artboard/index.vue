<template lang="pug">
.artboard.rel
  canvas.full(ref='canvas')
    img(v-for='item in gallery' :src='item.src')
</template>

<script setup lang="ts">
import { draw } from './command/index';

const gallery = [
  '《害羞蓝人中了毒》',
  // '《持仓》',
  // '《奶茶、芝士、珍珠分装》',
  // '《十连》',
  // '《帅气史莱姆》',
  // '《dream car》',
].map((key) => ({ key, src: `/public/gallery/${key}.jpg` }));

const canvas = ref<Nullable<HTMLCanvasElement>>(null);

onMounted(() => {
  draw(canvas.value!);
});
</script>

<style lang="stylus">
.artboard
  width 50vw
  height 37.5vw
</style>
