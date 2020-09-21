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
import { mapState, mapActions } from 'vuex'
// import Req from '@/utils/Https';
// import Android from '@/utils/Android'
export default {
	name: 'App',
	data(){
		return {
			transitionName:'',
            includes: ['pageIndex', 'register', 'forgetPassword']
		}
	},
    created() {
        // Req.getHttp()
        // window.app = window.app || {}

        let __this = this
        // window.app.onShow = function (paramsStr) {
        //     try {
        //         if (paramsStr) {
        //             var params = JSON.parse(paramsStr);
        //             __this.openComponent(params)
        //         }
        //     } catch (e) {

        //     }
        // }
        // Android.getEnterMes().then(res=>{
        //     if(res.targetTimes){
        //         let targetTimes = new Date(res.targetTimes*1000)
        //         let startTimes = this.getMonthTamp(targetTimes)
        //         this.saveWidgeTimes(startTimes)
        //     }
        //     if (res && res.isWidget*1) {
        //         this.changeWidget(true)
        //     } else {
        //         // this.openByOutSide(true)
        //         this.openComponent(res)
        //     }
        // })

        // session刷新
        // window.sys.app.addListener({
        //     key: 'SessionRefreshEvent',
        //     name: 'SessionRefreshEvent',
        //     callback: function (res) {
        //         // 重新获取授权信息，并修改token的值
        //         Req.init(true)
        //     }})

        // window.app.mirror.setAppIconBadgeNumber({
        //     badgeNumber: 0
        // });
    },
    mounted(){
        this.handleFocusOut()
        this.handleResize()
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
        ...mapActions(['changeWidget','saveWidgeTimes']),
        /**
         * 从外部打开对应的组件
         */
        openComponent(params){
            if (params) {
                let page = params.page || undefined
                let isWidget = params.isWidget || false
                if (page) {
                    // params.person = {}
                    // params.person.user_id = 3306
                    // page = 'group'
                    let routerParams = {
                        path: '/'+page,
                        query: params
                    }
                    this.$router.push(routerParams)
                }
            }
        },
        /**
         * 获取当月起始时间戳
         */
        getMonthTamp: function(time){
            let targetTimes = new Date(time)
            let year = targetTimes.getFullYear()
            let month = targetTimes.getMonth()+1
            let startTimes = year+'-'+month+'-'+'01'+' '+ '00:00:00';
            console.log('startTimes',startTimes)
            startTimes = new Date(startTimes).getTime();
            startTimes = startTimes/1000;
            return startTimes
        },
        handleFocusOut() {
            // input 焦点失焦后，ios 键盘收起，但没有触发 window resize，导致实际页面dom仍然被键盘顶上去--错位
            document.addEventListener('focusout', () => {
            document.body.scrollTop = 0;
            });
        },
        // 监听resize事件（键盘弹起触发），然后将 input textarea 元素滑动到可视区域，并将特定元素隐藏
        handleResize() {
            const clientHeight = document.documentElement.clientHeight;
            window.addEventListener('resize', () => {
            // 判断当前 active 的元素是否为 input 或 textarea
            if (
                document.activeElement.tagName === 'INPUT' ||
                document.activeElement.tagName === 'TEXTAREA'
            ) {
                setTimeout(() => {
                // 原生方法，滚动至需要显示的位置
                document.activeElement.scrollIntoView();
                }, 0);
            }

            // 解决键盘弹起后 fixed 定位元素被顶起问题
            const bodyHeight = document.documentElement.clientHeight;
            const ele = document.getElementById('fixed-bottom');
            if (ele) {
                if (clientHeight > bodyHeight) {
                    ele.style.display = 'none';
                } else {
                    ele.style.display = 'block';
                }
            }
            });
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
