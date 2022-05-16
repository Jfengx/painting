<template lang="pug">
.shot-img.abs(
  :class='state'
  :style='imgStyle'
  @click="pick"
)
  img.full(:style="{ opacity: imgLoaded ? 1 : 0 }" :src='props.src' @load="onImgLoaded")
</template>

<script lang="ts" setup>
export type ShotPos = Record<'x' | 'y' | 'deg', number>;
export type State = 'shot' | 'picked' | 'init';

const props = defineProps<{ src: string; shotPos: ShotPos; order: number }>();
const emits = defineEmits<{ (e: 'onStateChange', state: State, order: number): void }>();
const imgLoaded = ref(false);

let state = ref<State>('init');
const imgStyle = reactive<Record<'transform' | 'background' | 'transition-delay', string>>({
  transform: '',
  background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
  'transition-delay': `${Math.random() * 0.3}s`,
});

const shot = () => {
  state.value = 'shot';
  const { x, y, deg } = props.shotPos;
  imgStyle.transform = `translate3d(${x}vw, ${y}vh, 0) rotate(${deg}deg) scale(1)`;
};

const pick = () => {
  if (state.value === 'picked') {
    shot();
    return;
  }
  imgStyle['transition-delay'] = '0s';
  imgStyle.transform = `translate3d(0, 0, 0) rotate(0deg) scale(2)`;
  state.value = 'picked';
};

const onImgLoaded = () => {
  imgLoaded.value = true;
};

watch(state, (v) => {
  emits('onStateChange', v, props.order);
});

onMounted(() => {
  window.setTimeout(() => {
    shot();
  });
});
</script>

<style lang="stylus">
.shot-img
  cursor pointer
  width 20vw
  height 15vw
  top calc(50vh - 7.5vw)
  left calc(50vw - 10vw)
  border-radius 0.75rem
  overflow hidden
  z-index 1
  transition background .7s
  &.shot
    transition transform .7s
  &.picked
    z-index 3
    transition transform .5s

  img
    transition opacity .5s
</style>
