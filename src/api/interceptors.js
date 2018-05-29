import axios from 'axios'
import store from '../store/index'
import router from '../router/index'

//axios 默认值
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://139.196.104.246:8089/cepingweb'; //api测试环境地址
// axios.defaults.baseURL = 'http://192.168.0.177:8080/cepingweb/'; //resume本机
// axios.defaults.baseURL = 'http://192.168.0.192:8089/cepingweb/'; //plan本机
axios.defaults.headers.post['Content-Type'] = 'application/json';

//http request 拦截器
axios.interceptors.request.use(config => {
  if (store.getters.getToken) {
    config.headers.Authorization = `${store.getters.getToken}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

//http response 拦截器
axios.interceptors.response.use(function(response) {
    // console.log('------', response)
    if (response.data.code == 1) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  }, function(error) {
    console.log('拦截器', error)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.commit('logout')
          router.replace({
            path: '/',
            query: { redirect: router.currentRoute.fullPath } //router.history.current.fullPath
          })
      }
    }
    return Promise.reject(error.response)
  })
  //判断登录状态
  // router.beforeEach((to, from, next) => {
  //   let user = router.app.$options.store.state.user.loginInfo.data.data.token
  //   if (to.matched.some(recored => recored.meta.isLogin)) {
  //     if (JSON.stringify(user) == '') {
  //       next()
  //       router.push({ path: '/', query: { redirect: to.fullPath } })
  //     } else {
  //       next()
  //     }
  //   } else {
  //     next()
  //   }
  // })

export default axios