import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

import AdminHomepage from './components/admin/AdminHomepage.vue';
import StudentHomepage from './components/student/StudentHomepage.vue';
import TeacherHomepage from './views/TeacherHomepage.vue';
import TechnologiesTable from './components/TechnologiesTable.vue';
import ProjectsCards from './components/teacher/ProjectsCards.vue';

const routes = [
  { path: '/admin', component: AdminHomepage },
  { path: '/student', component: StudentHomepage },
  {
    path: '/teacher/:id', component: TeacherHomepage,
    props: { isAdmin: false},
    children: [
      { path: 'technologies', component: TechnologiesTable },
      { path: 'projects', component: ProjectsCards }
    ]
  }
];

Vue.use(VueRouter);
Vue.config.productionTip = false;

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
