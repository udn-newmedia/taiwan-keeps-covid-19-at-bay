<template>
  <div
    :class="{
      'day-card': true,
      'day-card--active': activeFlag,
    }"
    :id="id"
  >
    <!-- tw -->
    <div v-if="twData.policy.text || twData.policy.list" class="day-card__item day-card__item--tw">
      <p class="small">{{formattedDate}}</p>
      <p class="small">{{twData.policy.text}}</p>
      <p v-if="twData.policy.list" class="day-card__list small">
        <ul v-for="(item, index) in twData.policy.list" :key="index">
          <span class="day-card__list__left">●</span>
          <span class="day-card__list__right">{{item}}</span>
        </ul>
      </p>
    </div>

    <!-- global -->
    <div v-if="globalData.policy.text || globalData.policy.list" class="day-card__item day-card__item--global">
      <p class="small">{{formattedDate}}</p>
      <p class="small">{{globalData.policy.text}}</p>
      <p v-if="globalData.policy.list" class="day-card__list small">
        <ul v-for="(item, index) in globalData.policy.list" :key="index">
          <span class="day-card__list__left">●</span>
          <span class="day-card__list__right">{{item}}</span>
        </ul>
      </p>
    </div>
  </div>
</template>

<script>
import { autoResize_3 } from '@/mixins/masterBuilder.js';

/* month vocabulary */
const M_VOC = {
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
};

export default {
  name: 'DayCard',
  mixins: [autoResize_3],
  props: {
    data: {
      type: Object,
    },
    date: {
      type: Array,
    },
  },
  data() {
    return {
      status: {
        ticking: false,
      },
      activeFlag: false,
    };
  },
  computed: {
    formattedDate() {
      return `${M_VOC[this.date[0]]} ${this.date[1]}, ${this.date[2]}`;
    },
    id() {
      return `current-day-is-${this.date[0]}-${this.date[1]}-${this.date[2]}`;
    },
    twData () {
      return this.data.tw || null;
    },
    globalData() {
      return this.data.global || null;
    },
  },
  methods: {
    updatedCurrentDayEvent() {
      const slider = document.getElementById(this.id);
      if (!slider) return;

      const pos = slider.getBoundingClientRect();
      const lineChartHeight = this.deviceType === 'pc' ? 250 : 210; 
      if (pos.top < lineChartHeight && pos.bottom > 0) {
        const currentDate = `${this.date[0] < 10 ? '0' + this.date[0] : this.date[0]}-${this.date[1] < 10 ? '0' + this.date[1] : this.date[1]}-${this.date[2]}`;
        this.$store.dispatch('updatedCurrentDate', currentDate);
      }

      if (pos.top < window.innerHeight * 0.7 && pos.bottom > -window.innerHeight * 0.7) this.activeFlag = true;
      else this.activeFlag = false;
    },
    handleScroll() {
      if (!this.status.ticking) {
        window.requestAnimationFrame(() => {
          this.updatedCurrentDayEvent();
          this.status.ticking = false;
        });
      }
      this.status.ticking = true;
    },
  },
  mounted() {
    document.addEventListener('scroll', this.handleScroll, true);
  },
  destroyed() {
    document.removeEventListener('scroll', this.handleScroll, true);
  },
}
</script>

<style lang="scss" scoped>
@import '~/style/_mixins.scss';
.day-card {
  position: relative;
  width: 100%;
  margin-bottom: 24px;
  opacity: 0.3;
  transform: scale(0.99);
  transform-origin: center top;
  transition: .5s;
  @include pc {
    margin-bottom: 32px;
  }
  &.day-card--active {
    transform: scale(1);
    opacity: 1;
  }
  .small {
    margin-bottom: 16px;
  }
}
.day-card__item {
  width: 100%;
  margin-bottom: 2px;
  padding: 24px 16px;
  @include pc {
    padding: 32px;
  }
  &.day-card__item--tw {
    background-color: #ffdcdc;
  }
  &.day-card__item--global {
    background-color: #dfdfdf;
  }
}
.day-card__list {
  ul {
    display: flex;
    span {
      display: block;
      &.day-card__list__left {
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