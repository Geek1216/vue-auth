import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

var axios = require('axios');

// var axiosInstance = axios.create({
//   baseURL: 'http://localhost:3000',
// });

axios.defaults.baseURL = 'http://localhost:3000';

axios.interceptors.request.use(
  (config) => {
    const token = Vue.auth.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

const axiosPlugin = store => {
   store.$axios = axios
}

const dataState = createPersistedState({
  paths: ['auth']
})

export default new Vuex.Store({
  namespaced: true,
  strict: false,
  modules: {
    auth,
  },
  plugins: [axiosPlugin, dataState]
});
