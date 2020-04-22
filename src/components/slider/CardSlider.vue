<template>
  <div id="card-slider" class="card-slider">
    card slider
    <div
      :class="{
        'card-slider__line-chart-container': true,
        'bottom': false,
        'fixed': false,
      }"
    >
      <LineChart />
    </div>




    <div class="card-slider__cards-container">
      <div class="card-slider__years-container">
        <div class="card-slider__months-container">
          <MonthCard />
          <div class="card-slider__days-container">
            <DayCard />
            <DayCard />
          </div>
        </div>
      </div>
    </div>




    <SideAnchor />
  </div>
</template>

<script>
import DayCard from './DayCard.vue';
import LineChart from './LineChart.vue';
import MonthCard from './MonthCard.vue';
import SideAnchor from './SideAnchor.vue';

export default {
  name: 'CardSlider',
  components: {
    DayCard,
    LineChart,
    MonthCard,
    SideAnchor,
  },
  data() {
    return {
      status: {
        ticking: false,
        fixedFlag: false,
        bottomFlag: false,
      },
    };
  },
  methods: {
    scrollEvent() {
      const slider = document.getElementById('card-slider');
      const pos = slider.getBoundingClientRect();
    },
    handleScroll() {
      if (!this.status.ticking) {
        window.requestAnimationFrame(() => {
          this.scrollEvent();
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
.card-slider {
  position: relative;

  // TODO: border
  border: solid 1px red;

}
.card-slider__line-chart-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  margin: auto;
  
  // TODO: border
  border: solid blue 5px;

  &.bottom {
    top: auto;
    bottom: 0;
  }
  &.fixed {
    position: fixed;
    top: 0;
  }
}

</style>