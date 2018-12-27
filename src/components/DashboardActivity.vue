<template>
    <div id="activity">
        <label class="bottom-space font-lg font-light">Activity</label>
        <div>
            <activity-panel color="blue" label="Buys Today" v-on:click.native="toBuySale"></activity-panel>
            <activity-panel color="red" label="Sales Today" v-on:click.native="toBuySale"></activity-panel>
            <activity-panel color="green" label="Returns Today" v-on:click.native="toReturns"></activity-panel>
            <activity-panel color="yellow" label="Signs Pending" v-on:click.native="toSignMaker"></activity-panel>
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
            toBuySale() {
                this.$router.push({
                    path: '/buysale',
                })
            },
            toReturns() {
                this.$router.push({
                    path: '/returns'
                })
            },
            toSignMaker() {
                this.$router.push({
                    path: '/signmaker'
                })
            }
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