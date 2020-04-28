<template>
  <div class="side-anchor">
    <div
      v-for="(year, index) in Object.keys(time)" :key="index"
      :class="{
        'side-anchor__anchor-group-by-year': true,
        'side-anchor__anchor-group-by-year--active': +currentYear === +year,
      }"
    >
      {{year}}
      <ul 
        v-for="(month, index_m) in time[year]" :key="index_m"
        :class="{
          'side-anchor__anchor-group-by-year__month': true,
          'side-anchor__anchor-group-by-year__month--active': +currentMonth === +month,
        }"
        @click="scrollToCard(year, month)"
      >
        {{M_VOC[month]}}
      </ul>
    </div>
  </div>
</template>

<script>
import { sendGaMethods } from '@/mixins/masterBuilder.js';
import vueScrollTo from 'vue-scrollto';

export default {
  name: 'SideAnchor',
  mixins: [sendGaMethods],
  props: {
    time: {
      type: Object,
    },
  },
  data() {
    return {
      M_VOC: {
        1: 'Jan',
        2: 'Feb',
        3: 'Mar',
        4: 'Apr',
        5: 'May',
        6: 'Jun',
        7: 'Jul',
        8: 'Aug',
        9: 'Sep',
        10: 'Oct',
        11: 'Nov',
        12: 'Dec',
      },
    };
  },
  computed: {
    currentYear() {
      return +this.$store.state.currentDate.split('-')[2];
    },
    currentMonth() {
      return +this.$store.state.currentDate.split('-')[0];
    }
  },
  methods: {
    scrollToCard(y, m) {
      const data = this.$store.state.data.epidemic;
      const option = { offset: this.deviceType === 'pc' ? -239 : -199 };

      vueScrollTo.scrollTo(`#current-day-is-${m}-${data[y][m].date[0].day}-${y}`, option);

      this.sendGA({
        category: 'month',
        action: 'click',
        label: `${y}-${this.M_VOC[m]}`
      });
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~/style/_mixins.scss';
.side-anchor {
  text-align: right;
}
.side-anchor__anchor-group-by-year {
  color: #d3d3d3;
  font-size: 0.5rem;
  margin-top: 1.5rem;
  transition: .333s ease-in-out;
  &.side-anchor__anchor-group-by-year--active {
    color: #000000;
  }
}
.side-anchor__anchor-group-by-year__month {
  color: #d3d3d3;
  font-size: 1rem;
  margin-top: 1.5rem;
  transition: .333s ease-in-out;
  cursor: pointer;
  @include clean-tap;
  &:first-child {
    margin-top: 0;
  }
  @include pc {
    &:hover {
      color: #787878;
      transform: translateX(-4px);
    }
  }
  &.side-anchor__anchor-group-by-year__month--active {
    color: #000000;
    border-bottom: solid 1px #000000;
  }
}
</style>