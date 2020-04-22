<template>
  <div id="app">
    <PageIndicator />
    <Header />
    <PageCover
      :srcMob="require('~/img/cover/mob.jpg')"
      :srcPad="require('~/img/cover/pad.jpg')"
      :srcPc="require('~/img/cover/pc.jpg')"
    />
    <PageBackTop />
    <ArticleContainer>
      <p>The COVID-19 outbreak continues to spread around the globe. While governments are striving to take effective prevention measures, Taiwan is being praised by foreign media for its quick reaction and effective prevention measures.</p>
      <p>What critical policy decisions made by Taiwan’s government to fight COVID-19?</p>
    </ArticleContainer>
    <CardSlider />
    <TaiwanHelpBanner />
    <PageFooter>
      <!-- <p><a href="https://www.cdc.gov.tw/" target="_blank" rel="noopener" aria-label="data source" title="data source">衛福部疾管署</a></p> -->
      <FooterEditor>
        <div class="editor">
          <div class="editor-title">Producer:</div>
          <ul>Lin Hsiu-Tzu</ul>
          <ul>Tsai Pei-Jung</ul>
          <ul>Hung Hsin-Tzu</ul>
          <ul>Hsieh Wen-Chun</ul>
        </div>
        <div class="editor">
          <div class="editor-title">Designer:</div>
          <ul>Su Shih-Yao</ul>
        </div>
        <div class="editor">
          <div class="editor-title">Engineer:</div>
          <ul>Yang Juo-Yu</ul>
          <ul>Chou Jung-Sheng</ul>
        </div>
        <div class="editor">
          <div class="editor-title">Illustrator:</div>
          <ul>Hsu Ia-Wun</ul>
        </div>
        <div class="editor">
          <div class="editor-title">Translator:</div>
          <ul>Lin Chin-Chen</ul>
          <ul>Huang Yi-Wei</ul>
        </div>
        <div class="editor">
          <div class="editor-title">Proofreader:</div>
          <ul>Javad Alizargar, National Taipei University </ul>
          <ul>of Nursing and Health Sciences</ul>
          <ul>Andrew Marino</ul>
        </div>
        <div class="source">
          Sources: Taiwan CDC、WHO、Johns Hopkins University<br>
          Published: April 30, 2020<br>
          Last Updated: {{ $store.state.data ? $store.state.data.updatedDate : null }}
        </div>
      </FooterEditor>
      <FooterShare />
      <FooterFbComment />
      <FooterLogo />
    </PageFooter>
    <PageBackTop />
  </div>
</template>

<script>
import ArticleContainer from '@/components/layout/ArticleContainer.vue';
import CardSlider from '@/components/slider/CardSlider.vue';
import FooterEditor from '@/components/footer/FooterEditor.vue';
import FooterFbComment from '@/components/footer/FooterFbComment.vue';
import FooterLogo from '@/components/footer/FooterLogo.vue';
import FooterShare from '@/components/footer/FooterShare.vue';
import Header from '@/components/header/Header.vue';
import PageBackTop from '@/components/layout/PageBackTop.vue';
import PageCover from '@/components/PageCover.vue';
import PageFooter from '@/components/footer/PageFooter.vue';
import PageIndicator from '@/components/layout/PageIndicator.vue';
import TaiwanHelpBanner from '@/components/TaiwanHelpBanner.vue';

export default {
  name: 'App',
  components: {
    ArticleContainer,
    CardSlider,
    FooterEditor,
    FooterFbComment,
    FooterLogo,
    FooterShare,
    Header,
    PageBackTop,
    PageCover,
    PageFooter,
    PageIndicator,
    TaiwanHelpBanner,
  },
  mounted() {
    this.$store.dispatch('getData');
  },
}
</script>

<style lang="scss" scoped>

</style>
