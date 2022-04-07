<template lang="pug">
#home.rel.full-screen.flex-center.column
  .avatar.rel
    img.full(src='@/assets/j.png' @click='enjoy')
    .desc 我画的很烂，但我很自信😎
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
      margin-top -50px
      object-fit cover
      &:hover
        @keyframes shake
          10%, 90%
            transform translate3d(-1px, 0, 0)
          20%, 80%
            transform translate3d(2px, 0, 0)
          30%, 50%, 70%
            transform translate3d(-4px, 0, 0)
          40%, 60%
            transform translate3d(4px, 0, 0)
        animation shake 0.82s cubic-bezier(.36,.07,.19,.97) both
        transform translate3d(0, 0, 0);
    .desc
      margin-top 50px
      text-align center
      font-size 18px
      white-space nowrap
</style>
