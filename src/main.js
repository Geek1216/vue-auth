require('./bootstrap')
import Vue from 'vue'
import router from './router.js'

import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

import DefaultLayout from './components/layouts/DefaultLayout.vue';
import PlainLayout from './components/layouts/PlainLayout.vue';

Vue.config.productionTip = false;

Vue.component('default-layout', DefaultLayout);
Vue.component('plain-layout', PlainLayout);

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.userNotAuth)) {
//         if(Vue.auth.isAuthenticated() == 'active') {
//             next({
//                 path: '/app'
//             });
//         }else if (Vue.auth.isAuthenticated() == 'payment_step') {
//             next({
//                 path: '/app/signup/payment'
//             });

//         }else{
//             next();
//         }
//     } else if (to.matched.some(record => record.meta.allAuth)) {
//         if(Vue.auth.isAuthenticated() == 'active') {
//             next();
//         }else if (Vue.auth.isAuthenticated() == 'payment_step') {
//             next({
//                 path: '/app/signup/payment'
//             });

//         }else{
//             next();
//         }
//     }else if (to.matched.some(record => record.meta.userAuth)) {
//         if(Vue.auth.isAuthenticated() == 'active') {
//             next();
//         }else if (Vue.auth.isAuthenticated() == 'payment_step') {
//             next({
//                 path: '/app/signup/payment'
//             });

//         }else {
//             next('/app/login');
//         }
//     }else if  (to.matched.some(record => record.meta.userPaymentAuth)) {
//         if(Vue.auth.isAuthenticated() == 'payment_step') {
//             next();
//         } else {
//             next({
//                 path: '/app'

//             });
//         }
//     } else {
//             next(); // make sure to always call next()!
//     }
// });


// router.beforeEach((to, from, next) => {
//     if (!to.matched.length) {
//         next('/app/404');
//     } else {
//         next();
//     }
// });

new Vue({
  render: h => h(App),
  vuetify,
  router
}).$mount('#app')
