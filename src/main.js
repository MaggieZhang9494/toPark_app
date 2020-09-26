import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import vueTouch from '@/utils/Touch'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import "@/theme/index.css";
import '@/utils/Vconsole.js'

Vue.use(ElementUI);

Vue.directive("tap",{
  bind:function(el,binding){
    new vueTouch(el,binding,"tap");
  }
});
Vue.directive("swipe",{
  bind:function(el,binding){
    new vueTouch(el,binding,"swipe");
  }
});
Vue.directive("swipeleft",{
  bind:function(el,binding){
    new vueTouch(el,binding,"swipeleft");
  }
});
Vue.directive("swiperight",{
  bind:function(el,binding){
    new vueTouch(el,binding,"swiperight");
  }
});
Vue.directive("swipedown",{
  bind:function(el,binding){
    new vueTouch(el,binding,"swipedown");
  }
});
Vue.directive("swipeup",{
  bind:function(el,binding){
    new vueTouch(el,binding,"swipeup");
  }
});
Vue.directive("longtap",{
  bind:function(el,binding){
    new vueTouch(el,binding,"longtap");
  }
});

Vue.config.productionTip = false
window.DEBUG = true
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

