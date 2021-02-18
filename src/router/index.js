import Vue from 'vue'
import Router from 'vue-router'
import Login from '../page/login'
import UserList from '../page/userlist'
import FilmList from '../page/filmlist'
import CinemaList from '../page/cinemalist'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/userlist',
      name: 'UserList',
      component: UserList
    },
    {
      path: '/filmlist',
      name: 'FilmList',
      component: FilmList
    },
    {
      path: '/cinemalist',
      name: 'CinemaList',
      component: CinemaList
    }

  ]
})
