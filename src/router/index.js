import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/personMsg',
      component: Home,
      children: [
        {
          path: '',
          component: () => import('@/components/PersonMsg')
        }
      ]
    },
    {
      path: '/dayRecord',
      component: Home,
      children: [
        {
          path: '',
          component: () => import('@/components/DayRecord')
        }
      ]
    },
    {
      path: '/addDayRecord',
      component: Home,
      children: [
        {
          path: '',
          component: () => import('@/components/AddDayRecord')
        }
      ]
    }
  ]
})
