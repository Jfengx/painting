<template lang="pug">
.shooooot.rel.full
  .mask.abs.clip.full(:class="{ show: state === 'picked' }")
    .detail.abs
      .name {{ curPic.name }}
      .date {{ curPic.date }}
      .desc {{ curPic.desc }}
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
      :order='i'
      @onStateChange="onStateChange"
      )

</template>

<script lang="ts" setup>
import { targetPos } from './shotPos';
import type { State } from './Shot.vue';
import type { GalleryList } from '@/views/Gallery.vue';

const getImageUrl = (name: string) => {
  return new URL(`../../assets/gallery/${name}.jpg`, import.meta.url).href;
};

const { gallery } = defineProps<{ gallery: GalleryList[] }>();
const galleryList = gallery.map(({ name }) => ({ name, src: getImageUrl(name) }));
const shotPos = targetPos.map(({ x, y, deg }) => ({ x: x / 19.2, y: y / 10.8, deg }));

const state = ref<State>('init');
const actIdx = ref<number>();
const curPic = computed(() => gallery[actIdx.value || 0]);

const onStateChange = (v: State, order: number) => {
  state.value = v;
  actIdx.value = order;
};
</script>

<style lang="stylus" scoped>
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

    .detail
      color white
      left 30px
      top 30px
      .name
        font-size 2rem
        margin-left -0.8rem
      .date
        font-size 0.8rem
        opacity 0.7
        margin 10px 0
      .desc
        font-size 1rem
        width 15vw
        opacity 0.8
</style>
