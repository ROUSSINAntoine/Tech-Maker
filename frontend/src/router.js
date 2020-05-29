import VueRouter from 'vue-router';
import { isConnected } from './services/services.js';
import Login from './views/Login.vue';
import AdminHomepage from './views/AdminHomepage.vue';
import StudentHomepage from './views/StudentHomepage.vue';
import TeacherHomepage from './views/TeacherHomepage.vue';
import TechnologiesTable from './components/TechnologiesTable.vue';
import ProjectsCards from './components/teacher/ProjectsCards.vue';
import ProjectForm from './components/ProjectForm.vue';
import AdminStudentCSV from './components/admin/AdminStudentCSV.vue';
import AdminStudentTable from './components/admin/AdminStudentTable.vue';
import NotFound from './views/NotFound.vue';

async function beforeEnter (to, from, next) {
  const resp = await isConnected();
  if (resp.connected && resp.userType === to.path.split('/')[1]) {
    next();
  } else {
    next('/login');
  }
}

const routes = [
  {
    path: '/admin',
    component: AdminHomepage,
    beforeEnter,
    children: [
      {
        path: 'technologies',
        component: TechnologiesTable
      },
      {
        path: 'students',
        components: {
          default: AdminStudentTable,
          AdminStudentCSV: AdminStudentCSV
        }
      }
    ]
  },
  {
    path: '/student',
    component: StudentHomepage,
    beforeEnter
  },
  {
    path: '/teacher',
    component: TeacherHomepage,
    beforeEnter,
    children: [
      {
        path: 'technologies',
        component: TechnologiesTable
      },
      {
        path: 'projects',
        component: ProjectsCards
      },
      {
        path: 'project/:projectName',
        component: ProjectForm,
        props: (route) => ({ editable: true, projectName: Number(route.params.projectName) })
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Login
  },
  {
    path: '*',
    component: NotFound
  }
];

export default new VueRouter({
  routes: routes,
  mode: 'history'
});