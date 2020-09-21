import Vue from 'vue'
import Router from 'vue-router'
import PageIndex from '@/pages/default/Index'
import Login from '@/pages/default/Login'
import Register from '@/pages/default/Register'
import SetPwd from '@/pages/default/SetPwd'
import UpdateInfo from '@/pages/default/UpdateInfo'
import RegisterResult from '@/pages/default/RegisterResult'
import ScanCode from '@/pages/default/ScanCode'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'PageIndex',
			component: PageIndex,
			meta: {index: 1}
		},
		{
			path: '/register',
			name: 'Register',
			component: Register,
			meta: {index: 2}
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: {index: 3}
		},
		{
			path: '/setPwd',
			name: 'SetPwd',
			component: SetPwd,
			meta: {index: 3}
		},
		{
			path: '/updateInfo',
			name: 'UpdateInfo',
			component: UpdateInfo,
			meta: {index: 4}
    },
    {
			path: '/registerResult',
			name: 'RegisterResult',
			component: RegisterResult,
			meta: {index: 5}
    },
    {
			path: '/login',
			name: 'Login',
			component: Login,
			meta: {index: 6}
    },
    {
			path: '/scanCode',
			name: 'ScanCode',
			component: ScanCode,
			meta: {index: 7}
    },
    
	]
})
