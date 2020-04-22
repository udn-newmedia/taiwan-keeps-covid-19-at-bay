<template>
  <div class="article-container"
    :style="{
      backgroundColor: bgColor,
    }"
  >
    <div class="article clean-margin-top clean-padding-top">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleContainer',
  props: {
    bgColor: {
      type: String,
      default: '#ffffff',
    },
  },
}
</script>

<style lang="scss" scoped>
.article-container {
  position: relative;
  width: 100%;
}
.clean-margin-top {
  margin-top: 0;
}
.clean-padding-top {
  padding-top: 0;
}
</style>