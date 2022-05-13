<template lang="pug">
.shot-img.abs(
  :class='state'
  :style='imgStyle'
  @click="pick"
)
  img.full(:src='props.src')
</template>

<script lang="ts" setup>
export type ShotPos = Record<'x' | 'y' | 'deg', number>;
export type State = 'shot' | 'picked' | 'init';

const props = defineProps<{ src: string; shotPos: ShotPos }>();
const emits = defineEmits<{ (e: 'onStateChange', state: State): void }>();

let state = ref<State>('init');
const imgStyle = reactive<{ transform: string }>({ transform: '' });

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
  imgStyle.transform = `translate3d(0, 0, 0) rotate(0deg) scale(2)`;
  state.value = 'picked';
};

watch(state, (v) => {
  emits('onStateChange', v);
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
  width 20rem
  height 15rem
  top calc(50vh - 7.5rem)
  left calc(50vw - 10rem)
  border-radius 0.75rem
  overflow hidden
  z-index 1
  &.shot
    transition transform .5s
  &.picked
    z-index 3
    transition transform .5s
</style>
