import Vue from 'vue'
import Router from 'vue-router'
import Login from '../page/login'
import UserList from '../page/userlist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/userlist',
      name: 'UserList',
      component: UserList
    },

  ]
})
