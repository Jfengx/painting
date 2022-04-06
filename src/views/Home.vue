<template lang="pug">
#home.rel.full-screen.flex-center.column
  .avatar.rel
    img.full(src='@/assets/j.jpg' @click='enjoy')
  Laser

</template>
<script setup lang="ts">
import Laser from '../components/Laser/index.vue';

const router = useRouter();

const enjoy = () => {
  router.push({ path: '/gallery' });
};
</script>

<style lang="stylus" scoped>
#home
  .avatar
    width 15vw
    height 15vw
    cursor pointer
    border-radius 50%
    z-index 2
    img
      object-fit cover
      transition transform .3s
      &:hover
        transform scale(1.05)
</style>
