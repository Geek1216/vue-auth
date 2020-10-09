import VueRouter from 'vue-router';

let routes = [
  {
    name: 'home',
    path: '/',
    component: require('./pages/Home.vue').default,
    meta: {
      title: 'Home',
    }
  },
  {
    name: 'login',
    path: '/login',
    component: require('./pages/auth/Login.vue').default,
    meta: {
      userNotAuth: true,
      title: 'Login',
      layout: 'plain'
    }
  },
  {
    name: 'signup',
    path: '/signup',
    component: require('./pages/auth/Signup.vue').default,
    meta: {
      userNotAuth: true,
      title: 'Signup',
      layout: 'plain'
    }
  },
  {
    name: 'about-us',
    path: '/about-us',
    component: require('./pages/AboutUs.vue').default,
    meta: {
      title: 'About Us',
    }
  },{
    name: 'profile',
    path: '/me',
    component: require('./pages/Profile.vue').default,
    meta: {
      userAuth: true,
      title: 'Profile',
    }
  },
  {
    name: '404',
    path: '*',
    component: require('./pages/errors/PageNotFound.vue').default,
    meta: {
      title: 'Not Found',
      layout: 'plain'
    }
  },
];

export default new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition;
    } else {
        return {x: 0, y: 0};
    }
  }
});
