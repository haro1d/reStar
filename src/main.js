// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import myAxios from './axios/myAxios'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import tinymce from 'tinymce'
import VueTinymce from '@packy-tang/vue-tinymce'
import Vuex from 'vuex'
import getDate from './assets/js/getDate'
global.getDate = getDate 


Vue.use(Vuex)
Vue.prototype.$tinymce = tinymce // 将全局tinymce对象指向给Vue作用域下
Vue.use(VueTinymce)              // 安装vue的tinymce组件
Vue.prototype.$axios = axios  // 将axios挂载到原型上方便使用
Vue.prototype.myAxios=myAxios
Vue.use(ElementUI)
Vue.config.productionTip = true


const store = new Vuex.Store({
  state: {
   // iName: ''
   iName: JSON.parse(localStorage.getItem("iName")) || '',//先去localStorage中获取数据
   
  },
  mutations: {
    // increment (state) {
    //   state.count++
    // }
    setuserInfo(state, v1) {
      localStorage.setItem('iName', JSON.stringify(v1));//将传递的数据先保存到localStorage中
      state.iName = v1;// 之后才是修改state中的状态
    },

  

  }
})


new Vue({
  el: '#app',
  router,
  store: store,
  render: h => h(App)
  // components: { App },
  // template: '<App/>'
})
