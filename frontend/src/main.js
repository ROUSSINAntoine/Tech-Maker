import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

import Login from './views/Login.vue';
import AdminHomepage from './components/admin/AdminHomepage.vue';
import AdminStudentCSV from './components/admin/AdminStudentCSV.vue';
import StudentHomepage from './views/StudentHomepage.vue';
import TeacherHomepage from './views/TeacherHomepage.vue';
import TechnologiesTable from './components/TechnologiesTable.vue';
import ProjectsCards from './components/teacher/ProjectsCards.vue';
import CreateProject from './components/teacher/CreateProject.vue';

const routes = [
  {
    path: '/admin',
    component: AdminHomepage,
    children: [
      { path: 'AdminStudentCSV', component: AdminStudentCSV }
    ]
  },
  { path: '/student/:id', component: StudentHomepage },
  { path: '/', component: Login },
  { path: '/login', component: Login },
  {
    path: '/teacher/:id',
    component: TeacherHomepage,
    children: [
      {
        path: 'technologies',
        component: TechnologiesTable,
        props: { isAdmin: false }
      },
      { path: 'projects', components: { default: ProjectsCards, CreateProject: CreateProject } }
    ]
  }
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
