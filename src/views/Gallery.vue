<template lang="pug">
#gallery
  .container(:style="{ height: `${(galleryList.length * (pageType === 'shot' ? 0 : 1) + 1) * 100}vh`, overflow: 'hidden' }")
    .inner.rel.sti.full-screen.flex-center.column
      Artboard(:gallery="galleryList" v-if="pageType === 'art'")
      Shotboard(:gallery="galleryList" v-else-if="pageType === 'shot'")
</template>

<script setup lang="ts">
export type GalleryList = Record<'name' | 'date' | 'desc', string>;

const pageType = ref<'art' | 'shot'>('shot');

const galleryList = reactive<GalleryList[]>([
  {
    name: '《害羞蓝人中了毒》',
    date: '2021-12-29',
    desc: '深夜里随便点出的小蓝',
  },
  {
    name: '《持仓》',
    date: '2022-1-4',
    desc: '献给我大跌的基金',
  },
  {
    name: '《奶茶、芝士、珍珠分装》',
    date: '2022-1-1',
    desc: '作于去往虹桥高铁站的路上，虽然这种方式也不好喝，但是就是想这样',
  },
  {
    name: '《十连》',
    date: '2022-2-11',
    desc: '梦里啥都有',
  },
  {
    name: '《帅气史莱姆》',
    date: '2022-1-15',
    desc: '史莱姆真的很帅',
  },
  {
    name: '《dream car》',
    date: '2021-12-31',
    desc: '作于看了一堆车评之后',
  },
  {
    name: '《小红》',
    date: '2021-12-29',
    desc: '让小蓝害羞的小红',
  },
  {
    name: '《微信列表》',
    date: '2022-4-10',
    desc: '六街坊团长！！！我的超人',
  },
  {
    name: '《方便面人》',
    date: '2022-4-15',
    desc: '隔离在家泡面吃出幻觉',
  },
  {
    name: '《商品运力不足》',
    date: '2022-4-19',
    desc: '盒马，叮咚 😒',
  },
  // {
  //   name: '《  。》',
  //   date: '2022-5-19',
  //   desc: '一段恋情的结束',
  // },
  {
    name: '《  ，》',
    date: '2022-x-x',
    desc:'我 和 她'
  }
]);
</script>

<style lang="stylus" scoped>
#gallery
  .container
    width 100%
    .inner
      .desc
        top 20px
        left 20px
      .artboard
        margin-top -5vw
</style>
