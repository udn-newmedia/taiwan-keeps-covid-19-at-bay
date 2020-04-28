<template>
  <div class="footer-editor article">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FooterEditor',
}
</script>

<style lang="scss" scoped>
@import '~/style/_mixins.scss';
.footer-editor {
  margin-bottom: 32px;
  @include pc {
    width: 720px;
    padding: 72px 0 16px 0;
  }
  &.article {
    background-color: transparent;
    font-size: 0.9rem;
  }
 
  .editor {
    text-align: center;
    .editor-title {
      color: #000000;
    }
    ul {
      color: #797979;
    }
    &::after {
      content: '—';
      font-size: 2rem;
      font-weight: 100;
      line-height: 0.5;
      color: #797979;
    }
  }
  .source {
    text-align: center;
  }
  .team {
    text-align: center;
    color: #000000;
    margin-bottom: 32px;
  }
}
</style>