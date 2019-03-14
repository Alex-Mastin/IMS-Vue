import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/advanced-search',
            name: 'Advanced Search',
            component: () => import('./views/AdvancedSearch.vue')
        },
        {
            path: '/advanced-search/storestock/',
            name: 'Advanced Store Stock',
            component: () => import('./views/AdvancedStoreStock.vue')
        },
        {
            path: '/advanced-search/buysale/',
            name: 'Advanced Buy/Sale',
            component: () => import('./views/AdvancedBuySale.vue')
        },
        {
            path: '/advanced-search/returns/',
            name: 'Advanced Returns',
            component: () => import('./views/AdvancedReturns.vue')
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: () => import('./views/Dashboard.vue')
        },
        {
            path: '/storestock',
            name: 'Store Stock',
            component: () => import('./views/StoreStock.vue')
        },
        {
            path: '/storestock/new',
            name: 'New Store Stock',
            component: () => import('./views/NewStoreStock.vue')
        },
        {
            path: '/storestock/edit/:id',
            name: 'Edit Store Stock',
            component: () => import('./views/EditStoreStock.vue')
        },
        {
            path: '/storestock/search/',
            name: 'Store Stock Search',
            component: () => import('./views/StoreStockQuery.vue')
        },
        {
            path: '/buysale',
            name: 'Buy/Sale',
            component: () => import('./views/BuySale.vue')
        },
        {
            path: '/buysale/new',
            name: 'New Buy/Sale',
            component: () => import('./views/NewBuySale.vue')
        },
        {
            path: '/buysale/edit/:id',
            name: 'Edit Buy/Sale',
            component: () => import('./views/EditBuySale.vue')
        },
        {
            path: '/buysale/search',
            name: 'Buy/Sale Search',
            component: () => import('./views/BuySaleQuery.vue')
        },
        {
            path: '/returns',
            name: 'Returns',
            component: () => import('./views/Returns.vue')
        },
        {
            path: '/returns/new',
            name: 'New Return',
            component: () => import('./views/NewReturn.vue')
        },
        {
            path: '/returns/edit/:id',
            name: 'Edit Return',
            component: () => import('./views/EditReturn.vue')
        },
        {
            path: '/returns/search/',
            name: 'Returns Search',
            component: () => import('./views/ReturnsQuery.vue')
        },
        {
            path: '/signmaker',
            name: 'Sign Maker',
            component: () => import('./views/SignMaker.vue')
        },
        {
            path: '/signmaker/new',
            name: 'New Sign',
            component: () => import('./views/NewSign.vue')
        },
        {
            path: '/signmaker/large/new',
            name: 'New Large Sign',
            component: () => import('./views/LargeSignMaker.vue')
        },
        {
            path: '/reports',
            name: 'Reports',
            component: () => import('./views/Reports.vue')
        },
        {
            path: '/signmaker/printqueue',
            name: 'Print Queue',
            component: () => import('./views/PrintQueue.vue')
        },
        {
            path: '/signmaker/printqueue/large',
            name: 'Large Print Queue',
            component: () => import('./views/LargePrintQueue.vue')
        },
        {
            path: '/signmaker/printqueue/:month-:day-:year/:id',
            name: 'Print Queue History',
            component: () => import('./views/PrintHistory.vue')
        },
        {
            path: '/support',
            name: 'Support',
            component: () => import('./views/Support.vue')
        },
        {
            path: '/support/feature-request',
            name: 'Feature Request',
            component: () => import('./views/FeatureRequest.vue')
        },
        {
            path: '/support/report-a-bug',
            name: 'Bug Report',
            component: () => import('./views/BugReport.vue')
        },
        {
            path: '/user/',
            name: 'User',
            component: () => import('./views/User.vue')
        },
        {
            path: '/technicians/',
            name: 'Technicians',
            component: () => import('./views/Technicians.vue')
        },
        {
            path: "*",
            name: "Page Not Found",
            component: () => import('./views/PageNotFound.vue')
        }
    ]
})
