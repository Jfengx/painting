<template lang="pug">
#gallery
  .container
    .inner.rel.sti.full-screen.flex-center
      Artboard
</template>

<script setup lang="ts">
import Artboard from '../components/Artboard/index.vue';

onMounted(() => {});
</script>

<style lang="stylus" scoped>
#gallery
  .container
    width 100%
    height 700vh
    .inner
      //
</style>
