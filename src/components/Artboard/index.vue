<template lang="pug">
.artboard.rel
  canvas.full(ref='canvas')
    img(v-for='{ src } in gallery' :src='src')
  .title.rel
    p(
       v-for='{ name }, index in gallery'
       :key='name'
      :class="{ 'active': currentId === index }"
      ) {{ name }}
</template>

<script setup lang="ts">
import { draw } from './command/index';

const getImageUrl = (name: string) => {
  return new URL(`../../assets/gallery/${name}.jpg`, import.meta.url).href;
};
const gallery = [
  '《害羞蓝人中了毒》',
  '《持仓》',
  '《奶茶、芝士、珍珠分装》',
  '《十连》',
  '《帅气史莱姆》',
  '《dream car》',
].map((name) => ({ name, src: getImageUrl(name) }));

const canvas = ref<Nullable<HTMLCanvasElement>>(null);
const scroll = reactive(useScroll(window));

const H = window.innerHeight;

const clamp = (v) => Math.max(0, Math.min(gallery.length - 1, v));

const currentId = computed(() => clamp(Math.floor(scroll.y / H)));

onMounted(async () => {
  const { start, stop, update } = await draw(canvas.value!);
  start();
  update({ curIdx: currentId.value, progress: 1 });

  watch(currentId, (v) => {
    update({ curIdx: v, progress: 1 });
  });

  onUnmounted(() => {
    stop();
  });
});
</script>

<style lang="stylus">
.artboard
  width 50vw
  height 37.5vw
  canvas
    margin-top -5vw
  .title
    margin-top 5vw
    p
      display inline-block
      width 100%
      text-align center
      opacity 0
      letter-spacing .2em
      &.active
        opacity 1
      &:not(:first-child)
        position absolute
        top 0
        left 0
</style>
