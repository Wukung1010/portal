import axios from '@/lib/axios'

export const getRoutes = () => {
  return axios.request({
    url: 'api/routes',
    method: 'get'
  })
  // return Promise.resolve([
  //   { key: 'root', title: 'root', name: '_home', icon: 'ios-book', component: '/app/router_config', hideInMenu: false },
  //   { key: 'app', title: '下级都是app', parentId: 'root', name: 'app', icon: 'ios-book', component: 'router_config', hideInMenu: false },
  //   { key: '12', title: 'child 1-2', parentId: 'root', name: 'child 1-2', icon: 'ios-book', component: 'app', hideInMenu: false },
  //   { key: 'l111', title: '路由管理', parentId: 'app', name: 'routerConfig', icon: 'ios-book', component: 'routerConfig', hideInMenu: false, params: { name: 'routerConfig' } },
  //   { key: 'l112', title: 'app商店', parentId: 'app', name: 'appStore', icon: 'ios-book', component: 'appStore', hideInMenu: false, params: { name: 'appStore' } },
  //   { key: 'l113', title: '主页', parentId: '12', name: 'home', icon: 'ios-book', component: '', hideInMenu: false }
  // ])
}

export const modifyRoutes = (newRoute) => {
  return axios.request({
    url: 'api/routes',
    params: newRoute,
    method: 'post'
  })
}

export const modifyAppById = (id, config) => {
  return axios.request({
    url: 'api/route_params',
    params: {
      'configJson': config,
      'routeId': id
    },
    method: 'post'
  })
}

export const deleteRoute = (id) => {
  return axios.request({
    url: 'api/routes' + '/' + id,
    method: 'delete'
  })
}

export const getUserRoutes = (token) => {
  return axios.request({
    url: 'api/routes/user',
    params: token,
    method: 'get'
  })
}
