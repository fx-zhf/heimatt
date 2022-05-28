import { createRouter, createWebHashHistory } from 'vue-router'
import LOGIN from '@/views/Login'
import LAYOUT from '@/views/Layout'
import HOME from '@/views/Layout/Home'
import USER from '@/views/Layout/User'
import SEARCH from '@/views/Layout/Searchdata'
import SEARCHRESULT from '@/views/Layout/SearchResult'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LOGIN },
    {
      path: '/layout',
      component: LAYOUT,
      redirect: '/layout/home',
      children: [
        {
          path: 'home',
          component: HOME
        },
        { path: 'user', component: USER },
        { path: 'search', component: SEARCH },
        { path: 'searchresult', component: SEARCHRESULT }

      ]
    }
  ]

})

export default router
