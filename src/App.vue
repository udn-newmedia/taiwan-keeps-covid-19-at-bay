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
      <p>While the rest of the world continues to experience many adverse impacts from the Novel Coronavirus (COVID-19) pandemic, Taiwan’s success during the fight against this viral infection has been notably recognized.</p>
      <p>What has Taiwan done to keep COVID-19 at bay? The United Daily News has created an interactive timeline which summarizes the actions that the Taiwanese government has taken to combat COVID-19.</p>
    </ArticleContainer>
    <CardSlider />
    <TaiwanHelpBanner />
    <PageFooter>
      <!-- <p><a href="https://www.cdc.gov.tw/" target="_blank" rel="noopener" aria-label="data source" title="data source">衛福部疾管署</a></p> -->
      <FooterEditor>
        <div class="team">Production Team:United Daily News Group (Taiwan)</div>
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
          Sources: <a href="https://www.cdc.gov.tw/En" target="_blank" rel="noopener" aria-label="data source" title="data source">Taiwan CDC</a>、WHO、Johns Hopkins University<br>
          Published: April 30, 2020<br>
          Last Updated: {{ $store.state.data ? $store.state.data.updatedDate : null }}
        </div>
      </FooterEditor>
      <FooterLogo />
      <FooterShare />
      <FooterFbComment />
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
