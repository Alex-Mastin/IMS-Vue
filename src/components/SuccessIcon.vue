<template>
    <div id="icon">
        <i>
            <svg class="checkmark" :class="{ 'wait': this.wait }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle class="checkmark__circle" :class="{ 'wait': this.wait }" cx="26" cy="26" r="25" fill="none"></circle>
                <path class="checkmark__check" :class="{ 'wait': this.wait }" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"></path>
            </svg>
        </i>
    </div>
</template>

<script>
    export default {
        name: "success-icon",
        props: {
            wait: {
                type: Boolean,
                required: true,
            }
        }
    }
</script>

<style scoped>
    .checkmark__circle:not(.wait) {
        stroke-dasharray: 166;
        stroke-dashoffset: 166;
        stroke-width: 2;
        stroke-miterlimit: 10;
        stroke: #7ac142;
        fill: none;
        animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards
    }

    .checkmark:not(.wait) {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: block;
        stroke: #fff;
        stroke-miterlimit: 10;
        margin: 10% auto;
        box-shadow: inset 0px 0px 0px #7ac142;
        animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both
    }

    .checkmark__check:not(.wait) {
        transform-origin: 50% 50%;
        stroke-dasharray: 48;
        stroke-dashoffset: 48;
        stroke-width: 2;
        animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards
    }

    @keyframes stroke {
        100% {
            stroke-dashoffset: 0
        }
    }

    @keyframes scale {
        0%, 100% {
            transform: none
        }

        50% {
            transform: scale3d(1.1, 1.1, 1)
        }
    }

    @keyframes fill {
        100% {
            box-shadow: inset 0px 0px 0px 30px #7ac142
        }
    }
</style>