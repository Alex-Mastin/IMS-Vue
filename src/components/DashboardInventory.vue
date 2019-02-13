<template>
    <div id="inventory">
        <label class="bottom-space font-lg font-light">Inventory Summary</label>
        <div>
            <inventory-panel label="New Store Stock" content="new" v-on:click.native="routeTo('/advanced-search/storestock/?deq=' + getFullDate())"></inventory-panel>
            <inventory-panel label="Ready for Floor" content="ready" v-on:click.native="routeTo('/advanced-search/storestock/?ready')"></inventory-panel>
        </div>
    </div>
</template>

<script>
    import InventoryPanel from '@/components/InventoryPanel'

    export default {
        name: "DashboardInventory",
        components: {
            InventoryPanel
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
    #inventory {
        width: 28.9%;
        border-left: 1px solid #ECF1F3;
        padding: 30px 35px 15px 40px;
        display: inline-block;
    }
</style>