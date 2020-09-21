import Vue from 'vue'
import Router from 'vue-router'
import PageIndex from '@/pages/default/Index'
import Login from '@/pages/default/Login'
import Register from '@/pages/default/Register'

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
		}
	]
})
