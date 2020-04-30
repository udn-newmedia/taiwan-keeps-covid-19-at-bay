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
      <p>While the rest of the world continues to experience many adverse impacts from the novel coronavirus (COVID-19) pandemic, Taiwan has successfully been keeping COVID-19 at bay through its early and persistent intervention measures.</p>
      <p>The Taiwan Centers for Disease Control (Taiwan CDC) activated the Central Epidemic Command Center (CECC) on January 20th, 2020. Over the past 100 days, Taiwan has imposed border restrictions, home quarantines, a face-mask distribution system and other preventative measures to fight against this viral infection. Taiwan’s achievements in thwarting a nationwide outbreak have been globally recognized.</p>
      <p>The United Daily News has created an interactive timeline which summarizes crucial moments both in Taiwan and worldwide during this pandemic, along with the actions taken by the Taiwanese government to combat COVID-19.</p>
    </ArticleContainer>
    <CardSlider />
    <TaiwanHelpBanner />
    <PageFooter>
      <FooterEditor>
        <div class="team">Production Team: <br>United Daily News Group (Taiwan)</div>
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
          Published: April 29, 2020<br>
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
