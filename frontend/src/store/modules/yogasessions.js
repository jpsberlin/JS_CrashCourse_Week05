import axios from 'axios';

const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
const ADD_LIKES = 'ADD_LIKES';
const REQUEST_METUP_SUCCESS = 'REQUEST_METUP_SUCCESS';

const state = {
  data: [],
  likes: 0,
  yogasession: {}
};

const mutations = {
  [REQUEST_SUCCESS](state, data) {
    state.data = data;
  },
  [ADD_LIKES](state) {
    state.likes++;
  },
  [REQUEST_METUP_SUCCESS](state, data) {
    state.yogasession = data;
  }
};

const actions = {
  async fetchYogasessions({ commit }) {
    const res = await axios.get('http://localhost:3000/yogasession/all');
    commit(REQUEST_SUCCESS, res.data);
  },
  async fetchYogasession({ commit }, id) {
    const res = await axios.get(`http://localhost:3000/yogasession/${id}/json`);
    commit(REQUEST_METUP_SUCCESS, res.data)
  },
  addLikes({ commit }) {
    commit(ADD_LIKES);
  }
};

export default {
  state,
  mutations,
  actions,
};
