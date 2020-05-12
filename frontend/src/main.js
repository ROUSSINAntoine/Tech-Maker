import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

import AdminHomepage from './components/admin/AdminHomepage.vue';
import AdminStudentCSV from './components/admin/AdminStudentCSV.vue';

const routes = [
  { path: '/admin', component: AdminHomepage, children: [
    { path: 'AdminStudentCSV', component: AdminStudentCSV }
  ] }
];

Vue.use(VueRouter);
Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
