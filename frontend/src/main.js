import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

import Login from './views/Login.vue';
import AdminHomepage from './views/AdminHomepage.vue';
import StudentHomepage from './views/StudentHomepage.vue';
import TeacherHomepage from './views/TeacherHomepage.vue';
import TechnologiesTable from './components/TechnologiesTable.vue';
import ProjectsCards from './components/teacher/ProjectsCards.vue';
import ProjectForm from './components/ProjectForm.vue';
import AdminStudentCSV from './components/admin/AdminStudentCSV.vue';
import AdminStudentTable from './components/admin/AdminStudentTable.vue';

const routes = [
  {
    path: '/admin/:id',
    component: AdminHomepage,
    children: [
      { path: 'technologies', component: TechnologiesTable },
      {
        path: 'students',
        components: {
          default: AdminStudentTable,
          AdminStudentCSV: AdminStudentCSV
        }
      }
    ]
  },
  { path: '/student/:id', component: StudentHomepage },
  { path: '/', component: Login, meta: { token: ''} },
  { path: '/login', component: Login, meta: { token: ''} },
  {
    path: '/teacher/:id',
    component: TeacherHomepage,
    children: [
      { path: 'technologies', component: TechnologiesTable },
      { path: 'projects', component: ProjectsCards },
      {
        path: 'project/:pid',
        component: ProjectForm,
        props: (route) => ({ editable: true, projectId: Number(route.params.pid) })
      }
    ]
  }/*,
  { path: '*', component: }*/
];

Vue.use(VueRouter);
Vue.config.productionTip = false;

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  console.log(from);
  if (from.meta.token === undefined && (from.fullPath !== '/' || from.fullPath !== '/login')) {
    console.log('1');
    next('/login');
  } else {
    console.log('2');
    next();
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
