<template lang="pug">
.shooooot.rel.full
  .mask.abs.clip.full(:class="{ show: state === 'picked' }")
  template(
    v-for='{ src, name }, i in galleryList'
    :src='src'
    :key='name'
    :class="['img-' + i ]"
    :style="shotPos[i]"
  )
    Shot(
      :src="src"
      :shotPos="shotPos[i]"
      @onStateChange="onStateChange"
      )

</template>

<script lang="ts" setup>
import { targetPos } from './shotPos';
import type { State } from './Shot.vue';

const getImageUrl = (name: string) => {
  return new URL(`../../assets/gallery/${name}.jpg`, import.meta.url).href;
};

const { gallery } = defineProps<{ gallery: string[] }>();
const galleryList = gallery.map((name) => ({ name, src: getImageUrl(name) }));
const shotPos = targetPos.map(({ x, y, deg }) => ({ x: x / 19.2, y: y / 10.8, deg }));

const state = ref<State>('init');

const onStateChange = (v) => {
  state.value = v;
};
</script>

<style lang="stylus">
.shooooot
  .mask
    z-index 2
    background-color alpha(#000, 0.5)
    pointer-events none
    opacity 0
    &.show
      opacity 1
      pointer-events auto
      transition opacity .3s
</style>
