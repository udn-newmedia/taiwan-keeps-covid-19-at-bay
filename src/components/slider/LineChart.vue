<template>
  <div class="line-chart">
    <div class="line-chart__table-container">
      <table class="line-chart__meta">
        <tr>
          <th class="r1">Total</th>
          <th class="r2">Taiwan</th>
          <th class="r3 hide">unit</th>
        </tr>
        <tr>
          <td class="r1 text-l">{{currentTotalAmount.cases}} / {{currentTotalAmount.deaths}}</td>
          <td class="r2 text-l">{{currentTaiwanAmount.cases}} / {{currentTaiwanAmount.deaths}}</td>
          <td class="r3">Cases/Deaths</td>
        </tr>
      </table>
    </div>
    <div class="line-chart__chart">
      <div class="line-chart__chart__legend">
        <ul class="line-chart__chart__legend__item">
          <span class="line-chart__chart__legend__item__color color--red" />Cases
        </ul>
        <ul class="line-chart__chart__legend__item">
          <span class="line-chart__chart__legend__item__color color--black" />Deaths
        </ul>
      </div>

      <div class="line-chart__chart__svg-container">
        <svg id="line-chart" width="100%" height="100%" />
      </div>
      <!-- <h1>{{currentDate}}</h1> -->
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';

const parseTime = d3.timeParse('%m-%d-%Y');
Date.prototype.addDays = function(days) {
  this.setDate(this.getDate() + days);
  return this;
}

export default {
  name: 'LineChart',
  data() {
    return {
      svg: null,
      zoom: null,
      area: null,
      xAxis: null,
      scale: {
        x: null,
        y: null,
        xt: null
      },
      size: {
        w: null,
        h: null,
        margin: null
      }
    };
  },
  computed: {
    data() {
      return this.$store.state.data.cases;
    },
    currentDate() {
      return this.$store.state.currentDate;
    },
    currentTotalAmount() {
      if (!this.data[this.currentDate]) return { cases: 0, deaths: 0 };

      const c = this.data[this.currentDate].global.Confirmed;
      const d = this.data[this.currentDate].global.Deaths;
      
      return {
        cases: c === '-' ? 0 : c.toLocaleString(),
        deaths: d === '-' ? 0 : d.toLocaleString()
      };
    },
    currentTaiwanAmount() {
      if (!this.data[this.currentDate]) return { cases: 0, deaths: 0 };

      const c = this.data[this.currentDate].tw.Confirmed;
      const d = this.data[this.currentDate].tw.Deaths;

      return {
        cases: c === '-' ? 0 : c.toLocaleString(),
        deaths: d === '-' ? 0 : d.toLocaleString()
      };
    }
  },
  watch: {
    currentDate: {
      handler(value) {
        const g = d3.select('#line-chart-group');

        // TODO: date = translate x function
        const dayDiff = parseInt(Math.abs(parseTime(value) - new Date('2019/12/31')) / 1000 / 60 / 60 / 24);
        this.scale.t.x = -this.scale.gapPerDay * dayDiff;

        const xt = this.scale.t.rescaleX(this.scale.x);
        g.selectAll('.area').attr('d', this.area.x(d => xt(d.date)));
        g.select('.axis--x').call(this.xAxis.scale(xt));
      }
    },
  },
  methods: {
    async drawLineChart() {
      const vm = this;

      /** c: comfirmed, d: deaths */
      let data = { tw: { c: [], d: [] }, global: { c: [], d: [] } } 

      function parseData() {
        const valuesArray = Object.values(vm.data);
        const datesArray = Object.keys(vm.data);
        valuesArray.forEach((e, i) => {
          data.tw.c.push({
            value: e.tw.Confirmed === '-' ? 0 : e.tw.Confirmed,
            date: parseTime(datesArray[i])
          });
          data.tw.d.push({
            value: e.tw.Deaths === '-' ? 0 : e.tw.Deaths,
            date: parseTime(datesArray[i])
          });
          data.global.c.push({
            value: e.global.Confirmed === '-' ? 0 : e.global.Confirmed,
            date: parseTime(datesArray[i])
          });
          data.global.d.push({
            value: e.global.Deaths === '-' ? 0 : e.global.Deaths,
            date: parseTime(datesArray[i])
          });
        });
      }

      function renderChart() {
        vm.svg = d3.select('#line-chart');

        vm.size.margin = { top: 20, right: 50, bottom: 20, left: 50 };
        vm.size.w = document.getElementById('line-chart').clientWidth - vm.size.margin.right - vm.size.margin.left;
        vm.size.h = 100;
        
        vm.scale.x = d3.scaleTime().range([0, vm.size.w]);
        vm.scale.y = d3.scaleLinear().range([vm.size.h, 0]);
        vm.xAxis = d3.axisBottom(vm.scale.x).ticks(3);
        // const yAxis = d3.axisLeft(y);

        vm.area = d3.area()
          .curve(d3.curveMonotoneX)
          .x(d => vm.scale.x(d.date))
          .y0(vm.size.h)
          .y1(d => vm.scale.y(d.value));

        vm.svg.append('defs')
          .append('clipPath')
          .attr('id', 'clip')
          .append('rect')
          .attr('width', vm.size.w)
          .attr('height', vm.size.h);
        const g = vm.svg
          .append('g')
          .attr('id', 'line-chart-group')
          .attr('transform', 'translate(' + vm.size.margin.left + ',' + vm.size.margin.top + ')');

        vm.scale.x.domain(d3.extent(data.global.c, d => d.date));
        vm.scale.y.domain([0, d3.max(data.global.c, d => d.value)]);
      
        g.append('path')
          .datum(data.global.c)
          .attr('class', 'area area--cases')
          .attr('d', vm.area);
        g.append('path')
          .datum(data.global.d)
          .attr('class', 'area area--deaths')
          .attr('d', vm.area);
        g.append('g')
          .attr('class', 'axis axis--x')
          .attr('transform', 'translate(0,' + vm.size.h + ')')
          .call(vm.xAxis);

        // g.append('g')
        //     .attr('class', 'axis axis--y')
        //     .call(yAxis);

        const D_START = new Date(2019, 11, 30);
        const D_END = new Date(2020, 0, 31);

        vm.zoom = d3.zoom()
          .scaleExtent([1, 32])
          .translateExtent([[0, 0], [vm.size.w, vm.size.h]])
          .extent([[0, 0], [vm.size.w, vm.size.h]])
          .on('zoom', zoomed);

        vm.svg.call(vm.zoom)
          .transition()
          .duration(1500)
          .call(vm.zoom.transform, d3.zoomIdentity.scale(vm.size.w / (vm.scale.x(D_END) - vm.scale.x(D_START)))
          .translate(-vm.scale.x(D_START), 0));

        function zoomed() {
          vm.scale.t = d3.event.transform;
          vm.scale.gapPerDay = d3.event.transform.x / 1;
          
          const xt = vm.scale.t.rescaleX(vm.scale.x);
          g.selectAll('.area').attr('d', vm.area.x(d => xt(d.date)));
          g.select('.axis--x').call(vm.xAxis.scale(xt));
        }
      }

      await parseData();
      await renderChart();
    },
  },
  mounted() {
    this.drawLineChart();
  },
}
</script>

<style lang="scss">
@import '~/style/_mixins.scss';
@import '~/style/_variables.scss';
.line-chart {
  position: relative;
  width: 100%;
  height: $lineChartHeight-mob;
  @include pc {
    height: $lineChartHeight-pc;
  }

  .line-chart__table-container {
    height: 20%;
    .line-chart__meta {
      position: relative;
      width: 100%;
      border-collapse: collapse;
      th, td {
        padding: 0.1rem 16px;
        font-size: 0.8rem;
        font-weight: normal;
        border-bottom: 1px solid #d3d3d3;
        @include pc {
          padding: 0;
          font-size: 1rem;
        }
      }
      .r1 {
        width: 50%;
      }
      .r2 {
        color: #ff4343;
        width: 30%;
      }
      .r3 {
        width: 20%;
        color: #797979;
        text-align: right;
        font-size: 0.7rem;
        &.hide {
          color: #79797900;
        }
      }
      .text-l {
        font-size: 1rem;
        @include pc {
          font-size: 1.2rem;
        }
      }
    }
  }
  .line-chart__chart {
    position: relative;
    width: 100%;
    height: 80%;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);

    .line-chart__chart__legend {
      position: absolute;
      left: 16px;
      top: 16px;
      @include pc {
        left: 32px;
        top: 16px;
      }
      .line-chart__chart__legend__item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 8px;
        line-height: 1;
        font-size: 0.8rem;
        .line-chart__chart__legend__item__color {
          display: inline-block;
          width: 20px;
          height: 3px;
          margin-right: 4px;
          &.color--red {
            background-color: #979797;
          }
          &.color--black {
            background-color: #000000;
          }
        }
      }
    }

    .line-chart__chart__svg-container {
      pointer-events: none;
      position: relative;
      width: 100%;
      height: 100%;


      .area {
        fill: none;
      }
      .area--cases {
        fill: #f5f5f5;
      }
      .area--deaths {
        fill: #797979;
      }
    }
  }
}
</style>