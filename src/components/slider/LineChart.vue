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

export default {
  name: 'LineChart',
  data() {
    return {
      
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
  methods: {
    drawLineChart() {
      const vm = this;
      const svg = d3.select('#line-chart')
        .append('g')
        .attr('class', 'line-chart-group');

      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 300;
      const height = 100;


      const x = d3.scaleTime().range([0, width]);
      const y = d3.scaleLinear().range([height, 0]);

      const xAxis = d3.axisBottom(x);
      const yAxis = d3.axisLeft(y);

      // const zoom = d3.zoom()
      //     .scaleExtent([1, 32])
      //     .translateExtent([[0, 0], [width, height]])
      //     .extent([[0, 0], [width, height]])
      //     .on("zoom", zoomed);

      const area = d3.area()
        // .curve(d3.curveMonotoneX)
        .x(d => x(d.date))
        .y0(height)
        .y1(d => y(d.price));

      svg.append("defs")
        .append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

      const g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




      const data = [
        {date: 1, price: 394.46},
        {date: 2, price: 200},
        {date: 3, price: 100}
      ];



      x.domain(d3.extent(data, d => d.date));
      y.domain([0, d3.max(data, d => d.price)]);

      g.append("path")
          .datum(data)
          .attr("class", "area")
          .attr("d", area);

      g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      g.append("g")
          .attr("class", "axis axis--y")
          .call(yAxis);

      var d0 = new Date(2003, 0, 1),
          d1 = new Date(2004, 0, 1);

      // Gratuitous intro zoom!
      // svg.call(zoom)
      //   .transition()
      //   .duration(1500)
      //   .call(zoom.transform, d3.zoomIdentity
      //   .scale(width / (x(d1) - x(d0)))
      //   .translate(-x(d0), 0));

      // function zoomed() {
      //   var t = d3.event.transform, xt = t.rescaleX(x);
      //   g.select(".area").attr("d", area.x(function(d) { return xt(d.date); }));
      //   g.select(".axis--x").call(xAxis.scale(xt));
      // }

    },
  },
  mounted() {
    this.drawLineChart();
  },
}
</script>

<style lang="scss" scoped>
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
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
}
</style>