import Vue from 'vue';
import Vuex from 'vuex';

import yogasessions from './modules/yogasessions';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    yogasessions,
  },
});
