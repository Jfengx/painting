<template lang="pug">
#home.rel.full-screen.flex-center.column
  .avatar.rel(:style="{ 'transform': transform.skew }")
    img.full(src='@/assets/j.png')
  .desc 我画的很烂，但我很自信 😎
  .enjoy.flex-center
    a(href='https://jf-blog.netlify.app/' target='_blank') 我的笔记 📒&nbsp;&nbsp;
    span |
    p(@click="enjoy('/gallery')") &nbsp;&nbsp; 我的画 🖼 &nbsp;&nbsp;
    span |
    a(href='https://j-artists.netlify.app/' target='_blank') &nbsp;&nbsp;WebGL 🤩
  Laser(
    @mouseupdate='mouseupdate'
    :isClear='isClear'
  )

</template>
<script setup lang="ts">
const router = useRouter();

// should resize
const { innerWidth, innerHeight } = window;

const transform = reactive({
  // translate: 'translate3d(0px, 0px, 0px)',
  skew: 'skew(0deg, 0deg) translateZ(0)',
});

const isClear = ref(false);

const transPos = (mousePos: number[]) => {
  return mousePos.map((v, i) => {
    if (i === 0) {
      return (v / innerWidth) * 2 - 1;
    } else {
      return (v / innerHeight) * 2 - 1;
    }
  });
};

const mouseupdate = (mousePos: number[]) => {
  const trans = transPos(mousePos).map((v) => v * 10);
  // transform.translate = `translate3d(${trans[0]}px, ${trans[1]}px, 0px)`;
  transform.skew = `skew(${trans[0]}deg, ${trans[1]}deg)`;
};

const enjoy = (path: string) => {
  router.push({ path });
};
</script>

<style lang="stylus" scoped>
#home
  background white
  overflow hidden
  .avatar
    width 15vw
    height 15vw
    cursor pointer
    margin-top -50px
    border-radius 50%
    z-index 2
    img
      object-fit cover
      // &:hover
      //   @keyframes shake
      //     10%, 90%
      //       transform rotate(-5deg)
      //     20%, 80%
      //       transform rotate(0deg)
      //     30%, 50%, 70%
      //       transform rotate(5deg)
      //     40%, 60%
      //       transform rotate(-5deg)
      //   animation shake 0.82s cubic-bezier(.36,.07,.19,.97) both
      //   transform translate3d(0, 0, 0);
  .desc
    margin-top 50px
    z-index 3
    // color white
    mix-blend-mode difference
    text-shadow 0 0 2px rgb(104 182 255 / 50%)
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
    a
      text-decoration none
      color $color
      transition color .3s, transform .3s
      cursor pointer
      &:hover
        color black
        transform scale(1.05)
</style>
