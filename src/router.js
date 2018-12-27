import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import SignMaker from './views/SignMaker.vue';
import NewSign from './views/NewSign.vue';
import PrintQueue from './views/PrintQueue.vue';
Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard
        },
        {
            path: '/storestock',
            name: 'Store Stock',
        },
        {
            path: '/buysale',
            name: 'Buy Sale',
        },
        {
            path: '/returns',
            name: 'Returns',
        },
        {
            path: '/signmaker',
            name: 'Sign Maker',
            component: SignMaker
        },
        {
            path: '/signmaker/new',
            name: 'New Sign',
            component: NewSign
        },
        {
            path: '/reports',
            name: 'Reports',
        },
        {
            path: '/signmaker/printqueue',
            name: 'Print Queue',
            component: PrintQueue
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: "*",
            name: "Page Not Found",
            component: () => import('./views/PageNotFound.vue')
        }
    ]
});
//# sourceMappingURL=router.js.map