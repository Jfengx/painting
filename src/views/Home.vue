<template lang="pug">
#home.rel.full-screen.flex-center.column
  .avatar.rel
    img.full(src='@/assets/j.png')
  .desc 我画的很烂，但我很自信😎
  .enjoy.flex-center
    p(@click="enjoy('/gallery')") 我的画&nbsp;&nbsp;
    span |
    //- TODO
    p(@click="enjoy('/gallery')") &nbsp;&nbsp;我的世界
  Laser

</template>
<script setup lang="ts">
const router = useRouter();

const enjoy = (path: string) => {
  router.push({ path });
};
</script>

<style lang="stylus" scoped>
#home
  background white
  .avatar
    width 15vw
    height 15vw
    cursor pointer
    margin-top -50px
    border-radius 50%
    z-index 2
    img
      object-fit cover
      &:hover
        @keyframes shake
          10%, 90%
            transform rotate(-5deg)
          20%, 80%
            transform rotate(0deg)
          30%, 50%, 70%
            transform rotate(5deg)
          40%, 60%
            transform rotate(-5deg)
        animation shake 0.82s cubic-bezier(.36,.07,.19,.97) both
        transform translate3d(0, 0, 0);
  .desc
    margin-top 50px
    z-index 3
    color white
    mix-blend-mode difference
  .enjoy
    $color = #878bb2
    font-size 12px
    margin-top 20px
    padding 7px 13px
    border-radius 25%
    border 1px solid alpha($color, 0.8)
    z-index 3
    background white
    span
      color $color
    p
      opacity 0.5
      transition opacity .3s, transform .3s
      cursor pointer
      &:hover
        opacity 1
        transform scale(1.1)
</style>
