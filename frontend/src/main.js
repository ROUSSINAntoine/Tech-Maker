import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

import Login from './views/Login.vue';
import AdminHomepage from './components/admin/AdminHomepage.vue';
import StudentHomepage from './views/StudentHomepage.vue';
import TeacherHomepage from './views/TeacherHomepage.vue';
import TechnologiesTable from './components/TechnologiesTable.vue';
import ProjectsCards from './components/teacher/ProjectsCards.vue';
import ProjectForm from './components/ProjectForm.vue';

const routes = [
  { path: '/admin/:id', component: AdminHomepage },
  { path: '/student/:id', component: StudentHomepage },
  { path: '/', component: Login },
  { path: '/login', component: Login },
  {
    path: '/teacher/:id', component: TeacherHomepage,
    children: [
      {
        path: 'technologies',
        component: TechnologiesTable,
        props: { isAdmin: false }
      },
      { path: 'projects', component: ProjectsCards },
      { 
        path: 'project/:pid',
        component: ProjectForm,
        props: (route) => ({ editable: true, projectId: Number(route.params.pid) })
      }
    ]
  }
];

Vue.use(VueRouter);
Vue.config.productionTip = false;

const router = new VueRouter({
  routes: routes/*,
  mode: 'history'*/
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
