import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

/* test environment */
// const cors = 'https://cors-anywhere.herokuapp.com/';
// const url = `${cors}https://newmedia.udn.com.tw/taiwan-keeps-covid-19-at-bay/data/taiwan_can_help.json`;

/* online environment */
const url = './data/taiwan_can_help.json';

export default new Vuex.Store({
  state: {
    currentDate: '12-31-2019',
    data: null,
  },
  mutations: {
    getData(state) {
      axios.get(url)
      .then(res => {
        state.data = res.data;
      })
      .catch(error => {
        console.log(error);
      });
    },
    updatedCurrentDate(state, payload) {
      state.currentDate = payload;
    }
  },
  actions: {
    getData(context) {
      context.commit('getData');
    },
    updatedCurrentDate(context, payload) {
      context.commit('updatedCurrentDate', payload);
    }
  },
});