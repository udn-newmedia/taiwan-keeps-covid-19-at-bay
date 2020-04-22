import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const url = './data/taiwan_can_help.json';

export default new Vuex.Store({
  state: {
    currentDate: '2019-12-31',
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
  },
  actions: {
    getData (context) {
      context.commit('getData');
    },
  },
});