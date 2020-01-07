import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Table from '@/components/Table'

import Weather from '@/components/Weather'
import Soli from '@/components/Soli'
import Water from '@/components/Water'
import Pm from '@/components/Pm'
import User from '@/components/User'
import Jurisdiction from '@/components/Jurisdiction'
import Equipment from '@/components/Equipment'
import Log from '@/components/Log'
import Passthrough from '@/components/Passthrough'
import Facility from '@/components/Facility'
import RegisterDevice from '@/components/RegisterDevice'
import Deviceidinfo from '@/components/Deviceidinfo'
import Waterquality from '@/components/Waterquality'
import Greenhouse from '@/components/Greenhouse'

import {getUserInfo} from '@/assets/js/auth'
// ljj
import Home from '@/components/Home'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/Table',
          name: 'Table',
          component: Table
        },
        {
          path: '/Home',
          name: 'Home',
          component: Home
        },
        {
          path: '/Weather',
          name: 'Weather',
          component: Weather
        },
        {
          path: '/Soli',
          name: 'Soli',
          component: Soli
        },
        {
          path: '/Water',
          name: 'Water',
          component: Water
        },
        {
          path: '/Pm',
          name: 'Pm',
          component: Pm
        },
        {
          path: '/User',
          name: 'User',
          component: User
        },
        {
          path: '/Jurisdiction',
          name: 'Jurisdiction',
          component: Jurisdiction
        },
        {
          path: '/Equipment',
          name: 'Equipment',
          component: Equipment
        },
        {
          path: '/Log',
          name: 'Log',
          component: Log
        },
        {
          path: '/Passthrough',
          name: 'Passthrough',
          component: Passthrough
        },
        {
          path: '/Facility',
          name: 'Facility',
          component: Facility
        },
        {
          path: '/RegisterDevice/:profile',
          name: 'RegisterDevice',
          component: RegisterDevice
        },
        {
          path: '/Deviceidinfo/:deviceId/:profile',
          name: 'Deviceidinfo',
          component: Deviceidinfo
        },
        {
          path: '/Waterquality',
          name: 'Waterquality',
          component: Waterquality
        },
        {
          path: '/Greenhouse',
          name: 'Greenhouse',
          component: Greenhouse
        },
      ]
    }
  ]
})
// 添加路由拦截钩子
router.beforeEach((to, from, next) => {
  if (to.name === 'Login') {
    // console.log('1')
    // 如果是登录页，就放行，直接跳转到登录页
    next()
  } else {
    // 如果不是登录页面，就先获取token,判断是否有token，没有token就跳转到登录页，有token就直接跳转
    const token = getUserInfo()
    if (!token) {
      next({
        name: 'Login'
      })
    } else {
      next()
    }
  }
})
export default router
