import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

import AdminHomepage from './components/admin/AdminHomepage.vue';
import StudentHomepage from './components/student/StudentHomepage.vue';

const routes = [
  { path: '/admin', component: AdminHomepage },
  { path: '/student', component: StudentHomepage }
];

Vue.use(VueRouter);
Vue.config.productionTip = false;

const router = new VueRouter({
  routes: routes
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
