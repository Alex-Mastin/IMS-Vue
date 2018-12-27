<template>
    <div class="activity-panel text-center">
        <div class="panel">
            <p :class="panelClass">
                <span>0</span>
            </p>
            <div class="qty">
                <span class="font-xs">Qty</span>
            </div>
            <div class="qty-label">
                <label class="font-light uppercase">{{ label }}</label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "activity-panel",
        props: {
            color: String,
            label: String
        },
        data() {
            return {
                panelClass: "legend overflow font-light " + this.color
            }
        }
    }
</script>

<style scoped>
    .activity-panel {
        width: 21.41%;
        display: inline-block;
        margin-right: 19px;
        padding: 21px 5px 0;
        height: 100px;
        vertical-align: top;
    }

    .activity-panel:hover, .inventory-panel:hover {
        border: 1px solid #41A0D9 !important;
        cursor: pointer;
    }

    .activity-panel, .inventory-panel {
        border: 1px solid #DAE1E4;
        border-radius: 7px;
        background-color: #fff;
        user-select: none;
    }

    .panel {
        margin-top: 7px;
    }

    .qty {
        margin-top: -7px;
        font-size: 8px;
        color: #8d99ae;
    }

    .qty-label {
        font-size: 12px;
        padding-top: 15px;
        color: #495569;
        display: inline-block;
        max-width: 100%;
        margin-bottom: 5px;
    }
</style>