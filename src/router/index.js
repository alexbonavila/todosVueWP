import Vue from 'vue'
import Router from 'vue-router'
import auth from '../services/auth'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import NotFound from '@/components/NotFound'


Vue.use(Router)


const routes = [
  { path: '/android_asset/www/index.html',
    component: Login,
    meta: { auth: false }
  },
  {
    path: '/',
    component: Hello,
    meta: { auth: true }
  },
  // {
  //   path: '/todos',
  //   component: Todos,
  //   meta: { auth: true }
  // },
  // {
  //   path: '/tokens',
  //   component: Tokens,
  //   meta: { auth: false }
  // },
  // {
  //   path: '/profile',
  //   component: Profile,
  //   meta: { auth: true }
  // },
  // {
  //   path: '/device_info',
  //   component: DeviceInfo,
  //   meta: { auth: false }
  // },
  // { path: '/cordova',
  //   component: Cordova,
  //   meta: { auth: false }
  // },
  {
    path: '/login',
    component: Login,
    meta: { auth: false }
  },
  // { path: '/notifications',
  //   component: Notifications,
  //   // props: Notifications.get(),
  //   meta: { auth: true }
  // },
  {
    path: '*',
    component: NotFound,
    meta: { auth: false }
  }
]

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !auth.loggedIn()) {
    return next('/login')
  }
  next()
})

export default router

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Hello',
//       component: Hello
//     },
//     {
//       path: '/login',
//       name: 'Login',
//       component: Login
//     }
//   ]
// })
