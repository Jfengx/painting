<template lang="pug">
.world-box.full
  canvas.full(ref='canvas' @click='changePerspective')
</template>

<script lang="ts" setup>
import * as THREE from 'three';
import { move } from './move';

const canvas = ref<Nullable<HTMLCanvasElement>>(null);
const perspective = ref<Perspective>('first');

const changePerspective = () => {
  perspective.value = perspective.value === 'first' ? 'third' : 'first';
};

onMounted(() => {
  // TODO 统一
  const canvasSize = [canvas.value!.offsetWidth, canvas.value!.offsetHeight];
  canvas.value!.width = canvasSize[0] * 2;
  canvas.value!.height = canvasSize[1] * 2;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvasSize[0] / canvasSize[1], 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas.value! });

  camera.position.set(0, 150, 400);
  camera.lookAt(scene.position);
  scene.add(camera);

  // light
  const light = new THREE.PointLight(0xffffff);
  light.position.set(0, 250, 0);
  scene.add(light);

  // floor
  const floorTexture = new THREE.TextureLoader().load('/public/j.jpg');
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  const floorMaterial = new THREE.MeshBasicMaterial({
    map: floorTexture,
    side: THREE.DoubleSide,
  });
  const floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.y = -0.5;
  floor.rotation.x = Math.PI / 2;
  scene.add(floor);

  // cube
  const geometry = new THREE.BoxGeometry(50, 50, 50);
  const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, 50, 0);
  scene.add(cube);

  const { update } = move({
    camera,
    player: cube,
  });

  const render = () => {
    update(perspective.value);
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  };

  render();
});
</script>

<style lang="stylus"></style>
