import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    redirect: '/fq'
  },
  {
    path: '/reg',
    name: 'reg',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "reg" */ '../views/reg.vue')
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import(/* webpackChunkName: "forget" */ '../views/forget.vue')
  },
  {
    path: '/fq',
    name: 'fq',
    component: () => import(/* webpackChunkName: "fq" */ '../views/fq.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  },
  {
    path: '/study_ts',
    name: 'study_ts',
    component: () => import(/* webpackChunkName: "study_ts" */ '../views/study_ts.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
