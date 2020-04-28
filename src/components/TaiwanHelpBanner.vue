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
@import '~/style/_mixins.scss';
.taiwan-help-banner {
  position: relative;
  z-index: 10;
  width: 100%;
  padding: 128px 0 64px 0;
  @include pc {
    padding: 256px 0 64px 0;
  }
  img {
    width: 100%;
    object-fit: cover;
  }
}
</style>