<template>
    <div class="inventory-panel">
        <label class="font-regular font-sm uppercase text-void">{{ label }}</label>
        <label class="font-xl text-normal right inv-container"><span class="font-regular">0</span></label>
    </div>
</template>

<script>
    export default {
        name: "inventory-panel",
        props: {
            label: String
        }
    }
</script>

<style scoped>
    .inventory-panel {
        border: 1px solid #DAE1E4;
        border-radius: 7px;
        background-color: #fff;
        user-select: none;
        margin-bottom: 15px;
        padding: 15px 18px 9px;
        height: 25px;
    }

    .inventory-panel:hover {
        border: 1px solid #41A0D9 !important;
        cursor: pointer;
    }

    .inv-container {
        max-width: 35%;
        min-width: 15%;
        margin-top: -8px;
        border-left: 1px solid #EDF1F2;
        text-align: right;
    }
</style>