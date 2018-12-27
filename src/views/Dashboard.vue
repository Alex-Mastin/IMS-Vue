<template>
    <div id="dashboard" v-title="title">
        <div id="dashboard-content">
            <div class="dashboard-section">
                <dashboard-activity></dashboard-activity>
                <dashboard-inventory></dashboard-inventory>
            </div>
            <div class="dashboard-section">
                <div class="dashboard-row">
                    <div class="dashboard-row-item">
                        <m-s-r-p-table ref="table"></m-s-r-p-table>
                    </div>
                </div>
            </div>
            <div class="dashboard-section">
                <div class="dashboard-row" style="display: flex;">
                    <div class="dashboard-row-item half">
                        <manufacturer-table ref="table"></manufacturer-table>
                    </div>
                    <div class="dashboard-row-item half">
                        <product-table ref="table"></product-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Nav from '@/components/Navigation.vue'; // @ is an alias to /src
    import DashboardActivity from "@/components/DashboardActivity.vue";
    import DashboardInventory from "@/components/DashboardInventory.vue";
    import MSRPTable from '@/components/MSRPTable.vue'
    import ManufacturerTable from "@/components/ManufacturerTable.vue";
    import ProductTable from "../components/ProductTable.vue";

    @Component({
        components: {
            ProductTable,
            ManufacturerTable,
            DashboardInventory,
            Nav,
            DashboardActivity,
            MSRPTable
        },
        methods: {

        },
        data() {
            return {
                title: 'Dashboard | Device Pitstop - Maple Grove'
            }
        }
    })
    export default class Dashboard extends Vue {
    }
</script>

<style>

    #dashboard-content {
        width: 72.925%;
        position: absolute;
        top: 3.1rem;
    }

    .dashboard-section {
        left: 12.5rem;
        position: relative;
        width: 88.6%
    }

    .dashboard-section:first-child {
        margin-top: 0;
        padding: 0;
        background-color: #F5FAFF;
        border-bottom: 1px solid #DDE5E8;
        display: flex;
    }

    .dashboard-row {
        margin: 40px 0 0;
        padding: 0 20px;
    }

    .dashboard-row-item {
        background: #fff;
        border: 1px solid #ececec;
        padding: 15px 12px;
        padding-bottom: 0 !important;
        margin-left: 15px;
        margin-right: 15px;
    }

    .action-btn:first-child {
        margin-right: 4px;
    }

    .item-title {
        /*border-bottom: 1px solid #EDEDED;*/
        padding: 0 10px 10px 10px;
    }

    .item-title-text {
        margin-bottom: 10px;
        text-transform: uppercase;
    }

    .action-btn {
        fill: #9B9B9B;
        border: none;
        background: none;
        cursor: pointer;
    }

    svg {
        margin-left: 3px;
        margin-right: 3px;
        height: 15px;
        width: 15px;
    }

    .half {
        width: 50%!important;
    }
</style>
