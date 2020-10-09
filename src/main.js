
import Vue from 'vue'
import router from './router.js'
import Auth from './packages/Auth';
import store from './store/store.js';
import VueRouter from 'vue-router';

import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

import DefaultLayout from './components/layouts/DefaultLayout.vue';
import PlainLayout from './components/layouts/PlainLayout.vue';

Vue.use(VueRouter);
Vue.use(Auth);

Vue.component('default-layout', DefaultLayout);
Vue.component('plain-layout', PlainLayout);

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.userNotAuth)) {
    return Vue.auth.check().then(response => {
      if (response) {
        return next({
          name: 'home'
        })
      }
      return next()
    })
  } else if (to.matched.some(record => record.meta.userAuth)) {
    return Vue.auth.check().then(response => {
      if (!response) {
        return next({
          name: 'login'
        })
      }
      return next()
    })
  } else {
    next();
  }
});

new Vue({
  render: h => h(App),
  vuetify,
  router,
  store
}).$mount('#app')
