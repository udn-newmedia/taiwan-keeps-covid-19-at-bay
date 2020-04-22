<template>
  <div class="page-cover">
    <img :src="selectSrc_3(srcMob, srcPad, srcPc)" :alt="alt">
    <div class="page-cover__arrow" @click="handleScroll">
      <NmdArrow iconColor="#000000" />
    </div>
    <div class="page-cover__enter-anchor" id="enter-anchor" />
  </div>
</template>

<script>
import { autoResize_3, selectSrcMethod_3, sendGaMethods } from '@/mixins/masterBuilder.js';
import vueScrollTo from 'vue-scrollto';
import NmdArrow from '@/components/pinhead/NmdArrow.vue';

export default {
  name: 'PageCover',
  mixins: [autoResize_3, selectSrcMethod_3, sendGaMethods],
  components: {
    NmdArrow,
  },
  props: {
    srcMob: {
      type: String,
    },
    srcPad: {
      type: String
    },
    srcPc: {
      type: String
    },
    alt: {
      type: String,
      default: document.querySelector('title').innerHTML,
    }
  },
  methods: {
    handleScroll() {
      vueScrollTo.scrollTo('#enter-anchor');
      this.sendGA(this.formatGA('CoverArrow'));
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/style/_mixins.scss';
.page-cover {
  position: relative;
  width: 100%;
  margin-bottom: 64px;
  @include pc {
    bottom: 12%;
    margin-bottom: 120px;
  }
  img {
    width: 100%;
    object-fit: cover;
  }
}
.page-cover__arrow {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  @include pc {
    bottom: 12%;
  }
}
.page-cover__enter-anchor {
  position: absolute;
  bottom: 0;
}
</style>