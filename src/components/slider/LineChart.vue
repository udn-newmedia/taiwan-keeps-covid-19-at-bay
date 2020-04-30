<template>
  <div class="line-chart">
    <div class="line-chart__table-container">
      <table class="line-chart__meta">
        <tr>
          <th class="r1">Taiwan</th>
          <th class="r2">Worldwide</th>
          <th class="r3 hide">unit</th>
        </tr>
        <tr>
          <td class="r1 text-l">{{currentTaiwanAmount.cases}} / {{currentTaiwanAmount.deaths}}</td>
          <td class="r2 text-l">{{currentTotalAmount.cases}} / {{currentTotalAmount.deaths}}</td>
          <td class="r3">Cases/Deaths</td>
        </tr>
      </table>
    </div>
    <div class="line-chart__chart">
      <div class="line-chart__chart__svg-container">
        <svg id="line-chart" width="100%" height="100%" />
      </div>
      <div class="line-chart__chart__legend">
        <ul class="line-chart__chart__legend__item">
          <span class="line-chart__chart__legend__item__color color--red" />Cases
        </ul>
        <ul class="line-chart__chart__legend__item">
          <span class="line-chart__chart__legend__item__color color--black" />Deaths
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import { autoResize_3 } from '@/mixins/masterBuilder.js';
import vueScrollTo from 'vue-scrollto';

const parseTime = d3.timeParse('%m-%d-%Y');
const formatTime = d3.timeFormat('%b %d');
Date.prototype.addDays = function(days) {
  this.setDate(this.getDate() + days);
  return this;
}

export default {
  name: 'LineChart',
  mixins: [autoResize_3],
  data() {
    return {
      svg: null,
      zoom: null,
      area: null,
      xAxis: null,
      yAxis: null,
      scale: {
        x: null,
        y: null,
        xt: null
      },
      size: {
        w: null,
        h: null,
        margin: null
      },
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
    },
    boundaryDistance() {
      if (this.deviceType === 'pc') return 50;
      return 45;
    }
  },
  watch: {
    deviceType: {
      handler() {
        d3.select('#line-chart-group').remove();
        this.svg.call(this.zoom.transform, d3.zoomIdentity);
        vueScrollTo.scrollTo('#enter-anchor');
        setTimeout(() => {
          this.$store.dispatch('updatedCurrentDate', '12-31-2019');
          this.drawLineChart();
        }, 1000);
      },
    },
    currentDate: {
      handler(value) {
        const vm = this;
        const g = d3.select('#line-chart-group');

        const dayDiff = parseInt(Math.abs(parseTime(value) - new Date('2019/12/31')) / 1000 / 60 / 60 / 24);
        this.scale.t.x = -this.scale.gapPerDay * (dayDiff - this.boundaryDistance);

        const xt = this.scale.t.rescaleX(this.scale.x);
        g.selectAll('.area').transition().duration(333).attr('d', this.area.x(d => xt(d.date)));
        g.selectAll('.e-circle').transition().duration(333).attr('cx', d => xt(d.date));
        // g.select('.axis--x').call(this.xAxis.scale(xt));
        g.select('#current-date').text(formatTime(parseTime(vm.currentDate)));
        g.select('#prev-date').text(formatTime(parseTime(vm.currentDate).addDays(-this.boundaryDistance)));
        g.select('#next-date').text(formatTime(parseTime(vm.currentDate).addDays(+this.boundaryDistance)));
        g.selectAll('.e-circle').classed("e-circle--c-active", function() {
          if (this.id === `circle-c-${vm.currentDate}`) return true;
          return false;
        });
        g.selectAll('.e-circle').classed("e-circle--d-active", function() {
          if (this.id === `circle-d-${vm.currentDate}`) return true;
          return false;
        });
      }
    },
  },
  methods: {
    drawLineChart() {
      const vm = this;

      /** c: comfirmed, d: deaths */
      let data = { c: [], d: [] };
      let dataCircle = { c: [], d: [] };

      function parseData() {
        const valuesArray = Object.values(vm.data);
        const datesArray = Object.keys(vm.data);
        valuesArray.forEach((e, i) => {
          data.c.push({
            value: e.global.Confirmed === '-' ? 0 : e.global.Confirmed,
            date: parseTime(datesArray[i])
          });
          data.d.push({
            value: e.global.Deaths === '-' ? 0 : e.global.Deaths,
            date: parseTime(datesArray[i])
          });
        });
      }

      function parseCircleData() {
        const data = vm.$store.state.data.epidemic;
        const years = Object.keys(data);

        years.forEach(y => {
          const months = Object.keys(data[y]);
          months.forEach(m => {
            const days = data[y][m].date;
            days.forEach(d => {
              const parsedM = m < 10 ? `0${m}` : m;
              const parsedD = d.day < 10 ? `0${d.day}` : d.day;
              const dataString = `${parsedM}-${parsedD}-${y}`

              if (!vm.data[dataString].global) return;

              /**
               * { date: 12-31-2019, value: 123 }
               */ 
              dataCircle.c.push({
                date: parseTime(dataString),
                value: vm.data[dataString].global.Confirmed === '-' ? 0 : vm.data[dataString].global.Confirmed,
                dateString: dataString
              })
              dataCircle.d.push({
                date: parseTime(dataString),
                value: vm.data[dataString].global.Deaths === '-' ? 0 : vm.data[dataString].global.Deaths,
                dateString: dataString
              })
            })
          })
        })
      }

      function renderChart() {
        vm.svg = d3.select('#line-chart');

        vm.size.margin = { top: 25, right: 50, bottom: 25, left: 50 };
        vm.size.w = document.getElementById('line-chart').clientWidth - vm.size.margin.right - vm.size.margin.left;
        vm.size.h = (vm.deviceType === 'pc' ? 170 : 145) - vm.size.margin.top - vm.size.margin.bottom;
        
        vm.scale.x = d3.scaleTime().range([0, vm.size.w]);
        vm.scale.y = d3.scaleLinear().range([vm.size.h, 0]);
        // vm.xAxis = d3.axisBottom(vm.scale.x).ticks(2);
        vm.yAxis = d3.axisRight(vm.scale.y).ticks(4).tickFormat(d => '-  ' + (d > 0 ? `${d / 1000000}m` : 0));

        vm.area = d3.area()
          .curve(d3.curveMonotoneX)
          .x(d => vm.scale.x(d.date))
          .y0(vm.size.h)
          .y1(d => vm.scale.y(d.value));

        vm.scale.x.domain(d3.extent(data.c, d => d.date));
        vm.scale.y.domain([0, d3.max(data.c, d => d.value)]);

        const g = vm.svg
          .append('g')
          .attr('id', 'line-chart-group')
          .attr('transform', 'translate(' + vm.size.margin.left + ',' + vm.size.margin.top + ')');

        function drawAreas() {
          const path_g = g.append('g')
            .attr('class', 'path-group');

          path_g.append('path')
            .datum(data.c)
            .attr('class', 'area area--cases')
            .attr('d', vm.area);
          path_g.append('path')
            .datum(data.d)
            .attr('class', 'area area--deaths')
            .attr('d', vm.area);
        }

        function drawLine() {
          const line_g = g.append('g')
            .attr('class', 'line-group');
          line_g.append('line')
            .attr('class', 'indicator-line')
            .attr('x1', vm.size.w * 0.5)
            .attr('x2', vm.size.w * 0.5)
            .attr('y1', 0)
            .attr('y2', vm.size.h)
        }

        function drawCurrentDate() {
          const text_g = g.append('g')
            .attr('class', 'text-group');

          text_g.append('text')
            .attr('class', 'date-text')
            .attr('id', 'current-date')
            .attr('x', vm.size.w * 0.5)
            .attr('y', vm.size.h)
            .attr('dy', '24px')
            .text(formatTime(parseTime(vm.currentDate)));

          /* previous 14 days and next 14 days */
          text_g.append('text')
            .attr('class', 'date-text date-text--prev')
            .attr('id', 'prev-date')
            .attr('x', 24)
            .attr('y', vm.size.h)
            .attr('dy', '24px')
            .text(formatTime(parseTime(vm.currentDate).addDays(-vm.boundaryDistance)));

          text_g.append('text')
            .attr('class', 'date-text date-text--next')
            .attr('id', 'next-date')
            .attr('x', vm.size.w - 24)
            .attr('y', vm.size.h)
            .attr('dy', '24px')
            .text(formatTime(parseTime(vm.currentDate).addDays(+vm.boundaryDistance)));
        }

        function drawCircles() {
          const circles_g = g.append('g')
            .attr('class', 'circle-group');

          circles_g.selectAll("e-circle")
            .data(dataCircle.c)
            .enter()
            .append("circle")
            .attr('class', 'e-circle')
            .attr('id', d => `circle-c-${d.dateString}`)
            .attr("cx", d => vm.scale.x(d.date))
            .attr("cy", d => vm.scale.y(d.value))
            .attr("r", 2.5)

          circles_g.selectAll("e-circle")
            .data(dataCircle.d)
            .enter()
            .append("circle")
            .attr('class', 'e-circle')
            .attr('id', d => `circle-d-${d.dateString}`)
            .attr("cx", d => vm.scale.x(d.date))
            .attr("cy", d => vm.scale.y(d.value))
            .attr("r", 2.5)
        }

        function drawAxis() {
          // g.append('g')
          //   .attr('class', 'axis axis--x')
          //   .attr('transform', 'translate(0,' + vm.size.h + ')')
          //   .call(vm.xAxis);
          g.append("g")
            .attr("class", "axis axis--y")
            .attr('transform', 'translate(' + (vm.size.w + 12) + ', 0)')
            .call(vm.yAxis);
        }


        function assignZoom() {
          const D_START = parseTime(vm.currentDate).addDays(-vm.boundaryDistance);
          const D_END = parseTime(vm.currentDate).addDays(+vm.boundaryDistance);

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
            vm.scale.gapPerDay = d3.event.transform.x / (vm.boundaryDistance);
            
            const xt = vm.scale.t.rescaleX(vm.scale.x);
            g.selectAll('.area').attr('d', vm.area.x(d => xt(d.date)));
            g.selectAll('.e-circle').attr('cx', d => xt(d.date));
            // g.select('.axis--x').call(vm.xAxis.scale(xt));
          }
        }
        drawAreas();
        drawLine();
        drawCurrentDate();
        drawCircles();
        drawAxis();
        assignZoom();
      }

      parseData();
      parseCircleData();
      renderChart();
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
    position: relative;
    width: 100%;
    height: 25%;
    .line-chart__meta {
      position: relative;
      width: 100%;
      border-collapse: collapse;
      th, td {
        padding: 0.1rem 8px;
        font-size: 0.7rem;
        font-weight: normal;
        white-space: nowrap;
        border-bottom: 1px solid #d3d3d3;
        @include pc {
          padding: 0;
          font-size: 1rem;
        }
      }
      .r1 {
        color: #ff4343;
        width: 30%;
        @include pc {
          width: 40%;
        }
      }
      .r2 {
        width: 50%;
        @include pc {
          width: 40%;
        }
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
    overflow: hidden;
    width: 100%;
    height: 75%;
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

      .indicator-line {
        stroke-dasharray: 4, 4;
        stroke-linejoin: round;
        stroke-linecap: round;
        stroke: #979797;
        stroke-width: 1px;
      }

      .date-text {
        text-anchor: middle;
        &.date-text--prev {
          text-anchor: end;
          fill: #d3d3d3;
        }
        &.date-text--next {
          text-anchor: start;
          fill: #d3d3d3;
        }
      }
      text {
        font-size: 0.8rem;
        font-family: Roboto, Arial, Helvetica, sans-serif;
      }
      .e-circle {
        fill: #d3d3d3;
        &.e-circle--c-active {
          fill: #979797;
        }
        &.e-circle--d-active {
          fill: #000000;
        }
      }

      .axis.axis--x, .axis.axis--y {
        path.domain {
          fill: none;
          opacity: 0;
          // fill: #dcdcdc;
        }
        .tick {
          line {
            opacity: 0;
          }
        }
      }
      .axis.axis--y {
        text {
          fill: #797979;
          text-anchor: start;
        }
      }
    }
  }
}
</style>