<template>
  <div v-if="data" class="abstract-card">
    <div class="abstract-card__time"><h3>{{formattedDate}}</h3></div>
    <div class="abstract-card__list-name">{{data.measures.text}}</div>
    <div v-if="data.measures.list" class="abstract-card__list">
      <ul v-for="(item, index) in data.measures.list" :key="index">
        <span class="abstract-card__list__left">●</span>
        <span class="abstract-card__list__right">{{item}}</span>
      </ul>
    </div>
  </div>
</template>

<script>

/* month vocabulary */
const M_VOC = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
}

export default {
  name: 'AbstractCard',
  props: {
    date: {
      type: Array,
    },
    data: {
      type: Object,
      default: null,
    },
  },
  computed: {
    formattedDate() {
      return `${M_VOC[this.date[0]]}, ${this.date[1]}`
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/style/_mixins.scss';
.abstract-card {
  position: relative;
  width: 100%;
  margin-bottom: 24px;
  padding: 24px 16px;
  border-radius: 5px;
  color: #d3d3d3;
  @include pc {
    padding: 32px;
  }
  @include pc {
    margin-bottom: 32px;
  }
  background-color: #3a3a3a;
}

.abstract-card__time {
  h3 {
    margin-bottom: 8px;
  }
}
.abstract-card__list-name {
  color: #ff4343;
}
.abstract-card__list {
  ul {
    display: flex;
    span {
      display: block;
      &.abstract-card__list__left {
        margin-right: 8px;
        font-size: 0.7rem;
        line-height: 1.6rem;
        @include pc {
          line-height: 1.5rem;
        }
      }
    }
  }
}

</style>