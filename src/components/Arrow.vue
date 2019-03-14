<template>
    <div class="arrow">
        <div>
            <svg class="arrow" :class="{ 'flipLeft': left === true }" x="0px" y="0px" viewBox="0 0 60 60">
                <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M45.563,30.826l-22,15  C23.394,45.941,23.197,46,23,46c-0.16,0-0.321-0.038-0.467-0.116C22.205,45.711,22,45.371,22,45V15c0-0.371,0.205-0.711,0.533-0.884  c0.328-0.174,0.724-0.15,1.031,0.058l22,15C45.836,29.36,46,29.669,46,30S45.836,30.64,45.563,30.826z"></path>
            </svg>
            <div class="dot"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "arrow",
        props: {
            left: Boolean,
        }
    }
</script>

<style scoped>

    .arrow {
        height: 12px;
        width: 12px;
        fill: #444;
        position: relative;
        z-index: 1;
    }

    .dot {
        height: 9px;
        width: 9px;
        border-radius: 50%;
        background: #fff;
        position: relative;
        margin-top: -16.5px;
        margin-left: 4.5px;
        z-index: 0;
    }

    .flipLeft {
        -moz-transform: scaleX(-1);
        -o-transform: scaleX(-1);
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
        filter: FlipH;
        -ms-filter: "FlipH";
    }
</style>