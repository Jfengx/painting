<template lang="pug">
.artboard.rel
  canvas.full(ref='canvas')
    img(v-for='{ src } in galleryList' :src='src')
  .title.rel
    p(
       v-for='{ name }, index in galleryList'
       :key='name'
      :class="{ 'active': currentId === index }"
      ) {{ name }}
</template>

<script setup lang="ts">
import { draw } from './command/index';

const getImageUrl = (name: string) => {
  return new URL(`../../assets/gallery/${name}.jpg`, import.meta.url).href;
};

const { gallery } = defineProps<{ gallery: string[] }>();
const galleryList = gallery.map((name) => ({ name, src: getImageUrl(name) }));

const canvas = ref<Nullable<HTMLCanvasElement>>(null);
const scroll = reactive(useScroll(window));
const mousePos = reactive(useMouseInElement(canvas));

const H = window.innerHeight;

const clamp = (v) => Math.max(0, Math.min(gallery.length - 1, v));

const currentId = computed(() => clamp(Math.floor(scroll.y / H)));

onMounted(async () => {
  const { start, stop, update } = await draw(canvas.value!);
  start();

  const wrapUpdate = () => {
    update({
      curIdx: currentId.value,
      progress: 1,
      mousePos: [mousePos.elementX, canvas.value!.offsetHeight - mousePos.elementY].map((v) =>
        Math.max(0, v),
      ),
    });
  };

  watch(
    currentId,
    () => {
      wrapUpdate();
    },
    { immediate: true },
  );

  watch(mousePos, () => {
    wrapUpdate();
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
  cursor zoom-in
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
