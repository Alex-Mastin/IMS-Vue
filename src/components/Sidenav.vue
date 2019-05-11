<template>
    <div id="sidebar-container">
        <ul class="nav" id="sidebar">
            <tab-item title="Dashboard" icon="dashboard" :active="this.getRoute('Dashboard')" :route="'/dashboard/'" @click.middle.native="toNewTab('/dashboard/')"></tab-item>
            <tab-item title="Technicians" icon="technicians" :active="this.getRoute('Technician')" :route="'/technicians/'" @click.middle.native="toNewTab('/technicians/')"></tab-item>
            <navigation-divider></navigation-divider>
            <tab-item title="Store Stock" icon="storestock" :active="this.getRoute('Store Stock')" :route="'/storestock/'" :newable="true" :newRoute="'/storestock/new'" @click.middle.native="toNewTab('/storestock/')"></tab-item>
            <tab-item title="Big Buys/Sales" icon="buysale" :active="this.getRoute('Buy/Sale')" :route="'/buysale/'" :newable="true" :newRoute="'/buysale/new'" @click.middle.native="toNewTab('/buysale/')"></tab-item>
            <tab-item title="Returns" icon="returns" :active="this.getRoute('Return')" :route="'/returns/'" :newable="true" :newRoute="'/returns/new'" @click.middle.native="toNewTab('/returns/')"></tab-item>
            <navigation-divider></navigation-divider>
            <tab-item title="Sign Maker" icon="signmaker" :dropdown="true" :items="items"></tab-item>
            <tab-item title="Reports" icon="reports" :active="this.getRoute('Reports')" v-on:click.native="routeTo('/reports/')" @click.middle.native="toNewTab('/reports/')"></tab-item>
            <tab-item :blocker="true"></tab-item>
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
        data() {
            return {
                items: [
                    {
                        text: 'New Sign',
                        route: '/signmaker/',
                    },
                    {
                        text: 'Print Queue',
                        route: '/signmaker/printqueue/'
                    },
                ]
            }
        },
        methods: {
            routeTo(route) {
                let routeData = this.$router.resolve({path: route});
                window.open(routeData.href, '_self');
            },
            toNewTab(route) {
                let routeData = this.$router.resolve({path: route});
                window.open(routeData.href, '_blank');
            },
            getRoute(val) {
                if (this.$route.name) {
                    return this.$route.name.includes(val);
                }
            },
            isSignMaker() {
                return this.$route.name === 'Sign Maker' || this.$route.name === 'New Sign' || this.$route.name === 'Print Queue' || this.$route.name === 'Print Queue History';
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
        overflow-x: hidden;
    }

    .bottom {
        position: absolute;
        bottom: 50px;
        width: 200px;

    }

</style>