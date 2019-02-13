<template>
    <div id="activity">
        <label class="bottom-space font-lg font-light">Activity</label>
        <div>
            <activity-panel color="blue" label="Buys Today" content="buys" v-on:click.native="routeTo('/advanced-search/buysale/?buy&deq=' + getFullDate())"></activity-panel>
            <activity-panel color="red" label="Sales Today" content="sales" v-on:click.native="routeTo('/advanced-search/buysale/?sale&deq=' + getFullDate())"></activity-panel>
            <activity-panel color="green" label="Returns Today" content="returns" v-on:click.native="routeTo('/advanced-search/returns/?deq=' + getFullDate())"></activity-panel>
            <activity-panel color="yellow" label="Signs Pending" content="signs" v-on:click.native="routeTo('/signmaker/printqueue')"></activity-panel>
        </div>
    </div>
</template>

<script>
    import ActivityPanel from '@/components/ActivityPanel'

    export default {
        name: "DashboardActivity",
        components: {
            ActivityPanel
        },
        methods: {
            routeTo(route) {
                this.$router.push(route);
            },
            getFullDate() {
                let date = new Date();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                let year = date.getFullYear();

                return month + "-" + day + "-" + year;
            },
        }
    }
</script>

<style scoped>
    #activity {
        width: 68%;
        float: left;
        padding: 30px 27px 24px 35px;
    }
</style>