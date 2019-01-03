import Login from '@/view/login'
import Main from '@/view/main'

export default [
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'main',
    path: '/',
    component: Main,
    children: [
      {
        name: 'app',
        path: '/app/:id',
        component: () => {}
      }
    ]
  }
]
