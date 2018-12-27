<template>
    <div id="sidebar-container">
        <ul class="nav" id="sidebar">
            <tab-item title="Dashboard" icon="dashboard" :active="this.getRoute('Dashboard')" v-on:click.native="toDashboard(false)" @click.middle.native="toDashboard(true)"></tab-item>
            <navigation-divider></navigation-divider>
            <tab-item title="Store Stock" icon="storestock" :active="this.getRoute('Store Stock')" v-on:click.native="toStoreStock(false)" @click.middle.native="toStoreStock(true)"></tab-item>
            <tab-item title="Big Buys/Sales" icon="buysale" :active="this.getRoute('Big Buys/Sales')" v-on:click.native="toBuySale(false)" @click.middle.native="toBuySale(true)"></tab-item>
            <tab-item title="Returns" icon="returns" :active="this.getRoute('Returns')" v-on:click.native="toReturns(false)" @click.middle.native="toReturns(true)"></tab-item>
            <navigation-divider></navigation-divider>
            <tab-item title="Sign Maker" icon="signmaker" :active="isSignMaker()" v-on:click.native="toSignMaker(false)" @click.middle.native="toSignMaker(true)"></tab-item>
            <tab-item title="Reports" icon="reports" :active="this.getRoute('Reports')" v-on:click.native="toReports(false)" @click.middle.native="toReports(true)"></tab-item>
        </ul>
    </div>

</template>

<script>
    import TabItem from '@/components/TabItem'
    import NavigationDivider from '@/components/NavigationDivider'
    export default {
        name: "sidenav",
        components: {
            TabItem,
            NavigationDivider
        },
        methods: {
            getRoute(val) {
                return this.$route.name === val;
            },
            toDashboard(newTab) {
                if (!newTab) {
                    this.$router.push({
                        path: '/dashboard',
                    })
                }

                // middle click support
                else {
                    let routeData = this.$router.resolve({name: 'Dashboard'});
                    window.open(routeData.href, '_blank');
                }

            },
            toStoreStock(newTab) {
                if (!newTab) {
                    this.$router.push({
                        path: '/storestock',
                    })
                }

                // middle click support
                else {
                    let routeData = this.$router.resolve({name: 'Store Stock'});
                    window.open(routeData.href, '_blank');
                }
            },
            toBuySale(newTab) {
                if (!newTab) {
                    this.$router.push({
                        path: '/buysale',
                    })
                }

                // middle click support
                else {
                    let routeData = this.$router.resolve({name: 'Buy Sale'});
                    window.open(routeData.href, '_blank');
                }
            },
            toReturns(newTab) {
                if (!newTab) {
                    this.$router.push({
                        path: '/returns',
                    })
                }

                // middle click support
                else {
                    let routeData = this.$router.resolve({name: 'Returns'});
                    window.open(routeData.href, '_blank');
                }
            },
            toSignMaker(newTab) {
                if (!newTab) {
                    this.$router.push({
                        path: '/signmaker',
                    })
                }

                // middle click support
                else {
                    let routeData = this.$router.resolve({name: 'Sign Maker'});
                    window.open(routeData.href, '_blank');
                }
            },
            toReports(newTab) {
                if (!newTab) {
                    this.$router.push({
                        path: '/reports',
                    })
                }

                // middle click support
                else {
                    let routeData = this.$router.resolve({name: 'Reports'});
                    window.open(routeData.href, '_blank');
                }
            },
            isSignMaker() {
                return this.$route.name === 'Sign Maker' || this.$route.name === 'New Sign' || this.$route.name === 'Print Queue';
            }
        }
    }
</script>

<style scoped>
    #sidebar-container {
        background: #2d373c;
        width: 12.5rem;
        border-right: 1px solid #e2e2e2;
        position: relative;
        z-index: 1;
    }

    #sidebar {
        padding-top: 12px;
        width: 12.5rem;
        height: -webkit-fill-available;
        bottom: -3.1rem;
        overflow-y: auto;
        position: fixed;
        background-color: inherit;
    }

    .nav {
        margin-bottom: 0;
        padding-left: 0;
        list-style: none;
    }


</style>