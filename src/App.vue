<template>
	<div id="app">
		<transition :name="transitionName">
      <keep-alive :include="includes">
			  <router-view class="child-view"></router-view>
      </keep-alive>
		</transition>
	</div>
</template>

<script>
import '../src/styles/base.less'
// import Req from '@/utils/Https';
export default {
	name: 'App',
	data(){
		return {
			transitionName:'',
      includes: ['pageIndex', 'register', 'forgetPassword'],
      phoneParams:{
        Version:'2019-11-05',
        Timestamp: this.dateFormat("YYYY-mm-dd HH:MM:SS", new Date()),
        Longitude:'103.898168',
        Latitude:'1.28134',
        OS:'ios',
        OSVersion:'13.0.1',
        Manufacturer:'apple',
        PhoneModel:'iphoneX',
        Resolution:'1242x2688',
      },
		}
	},
  created() {
    
  },
  mounted(){
    sessionStorage.setItem('phoneParams',JSON.stringify(this.phoneParams))
  },
	watch: {
		$route(to, from) {
      if(to.meta.index == 'fade' || from.meta.index == 'fade'){
          this.transitionName = 'fade';
          return
      }
			if(!from.meta.index) return
			// 通过事先在路由中设置的index层级，判断前进还是后退
			if(to.meta.index > from.meta.index){
				this.transitionName = 'slide-left';
				return
			}
			this.transitionName = 'slide-right';
		}
    },
    methods: {
      dateFormat(fmt, date) {
        let ret;
        const opt = {
            "Y+": date.getFullYear().toString(),        // 年
            "m+": (date.getMonth() + 1).toString(),     // 月
            "d+": date.getDate().toString(),            // 日
            "H+": date.getHours().toString(),           // 时
            "M+": date.getMinutes().toString(),         // 分
            "S+": date.getSeconds().toString()          // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
            };
        };
        return fmt;
      }
    }
}

</script>

<style>
@import './styles/base.less';
#app {
  font-family: 'Montserrat', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	height: 100%;
	position: relative;
}
</style>
