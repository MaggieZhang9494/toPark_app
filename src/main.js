import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import vueTouch from '@/utils/Touch'
// import CalUtil from '@/utils/cal/CalendarUtil'
// import '@/utils/Vconsole.js'
// import app from '../static/moa.min.js'

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

if(window.DEBUG){

}else{
    // CalUtil.init(function (res) {
    //     console.log('cal util : ', res)
    // })
}

