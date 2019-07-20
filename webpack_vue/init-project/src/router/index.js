import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName:'home'*/'@/components/home/Home')
    },
    {
      path: '/todos',
      name: 'Todos',
      component: () => import(/* webpackChunkName:'todos'*/'@/components/todos/Todos')
    }
  ]
})
