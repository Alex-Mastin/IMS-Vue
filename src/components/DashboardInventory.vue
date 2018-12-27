<template>
    <div id="inventory">
        <label class="bottom-space font-lg font-light">Inventory Summary</label>
        <div>
            <inventory-panel label="New Store Stock" v-on:click.native="getNewStoreStock"></inventory-panel>
            <inventory-panel label="Ready for Floor" v-on:click.native="getReadyForFloor"></inventory-panel>
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
            getNewStoreStock() {
                alert("This function has not been implemented yet");
            },
            getReadyForFloor() {
                alert("This function has not been implemented yet");
            }
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