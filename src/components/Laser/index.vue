<template lang="pug">
.laser.abs.clip.full
  canvas.full(ref='canvas')
</template>
<script setup lang="ts">
import {
  drainPoints,
  drawLaserPen,
  IOriginalPointData,
  setRoundCap,
  setTension,
  setColor,
  setMaxWidth,
  setMinWidth,
} from 'laser-pen';

let mouseTrack: IOriginalPointData[] = [];
let ctx: Nullable<CanvasRenderingContext2D> = null;

const DPR = window.devicePixelRatio;
const canvas = ref<Nullable<HTMLCanvasElement>>(null);
const canvasSize = reactive<Record<'width' | 'height', number>>({ width: 0, height: 0 });
const mousePos = reactive(useMouseInElement(canvas));

const initCanvas = (entries) => {
  const { width, height } = entries[0].contentRect;
  canvasSize.width = width * DPR;
  canvasSize.height = height * DPR;
  canvas.value!.width = canvasSize.width;
  canvas.value!.height = canvasSize.height;
  if (!ctx) {
    ctx = canvas.value?.getContext('2d')!;
  }
};

const initLaser = () => {
  setRoundCap(true);
  setTension(0.1);
  setMaxWidth(20);
  setMinWidth(5);
};

const drawLaser = () => {
  if (!ctx) return;
  setColor(Math.random() * 255, Math.random() * 255, Math.random() * 255);
  // clear
  // ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

  mouseTrack = drainPoints(mouseTrack);

  if (mouseTrack.length >= 3) {
    drawLaserPen(ctx!, mouseTrack);
  }
};

initLaser();

const { pause } = useRafFn(drawLaser);

useResizeObserver(canvas, (entries) => {
  initCanvas(entries);
});

watch(mousePos, (pos) => {
  const { x, y } = pos;
  mouseTrack.push({
    x: x * DPR,
    y: y * DPR,
    time: Date.now(),
  });
});

onUnmounted(() => {
  pause();
});
</script>

<style lang="stylus" scoped>
.laser
  z-index 1
</style>
