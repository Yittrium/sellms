import Vue from 'vue'



import App from './App.vue'
import router from './router'
//重置样式
import "./assets/css/reset.css"

import "./assets/fonts/iconfont.css"

//elementui
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"

Vue.use(ElementUI);


//v-bus
var bus = new Vue();
Vue.prototype.bus = bus;


//路由守卫
router.beforeEach((to, from, next) => {
  if (window.localStorage.getItem("token") || to.path === "/login") {
    next();
  } else {
    next("/login");
  }

})


Vue.config.productionTip = false



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
