import { createApp } from 'vue/dist/vue.esm-bundler.js'
import { createWebHistory, createRouter } from 'vue-router'
import { createStore  } from 'vuex'

import ExampleStore from '@/src/stores/example.js'

const store = createStore({
	modules: {
		example: ExampleStore
	}
});

const Example = () => import('@/src/components/example/Example.vue')

const routes = [
	{
		path: '/',
		name: 'example',
		title: 'Example',
		component: Example
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
})

const routerApp = createApp(router)
routerApp.use(router)
routerApp.use(store)
routerApp.mount('#router_app')
