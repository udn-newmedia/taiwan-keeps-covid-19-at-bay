<template>
  <div class="taiwan-help-banner">
    <img
      :src="selectSrc_3(
        require('~/img/banner/tch_mob.jpg'),
        require('~/img/banner/tch_ipad.jpg'),
        require('~/img/banner/tch_web.jpg')
      )"
      alt="taiwan can help"
    >
  </div>
</template>

<script>
import { autoResize_3, selectSrcMethod_3, sendGaMethods } from '@/mixins/masterBuilder.js';

export default {
  name: 'TaiwanCard',
  mixins: [autoResize_3, selectSrcMethod_3, sendGaMethods],
}
</script>

<style lang="scss" scoped>
.taiwan-help-banner {
  position: relative;
  width: 100%;
  margin: 64px 0;
  img {
    width: 100%;
    object-fit: cover;
  }
}
</style>