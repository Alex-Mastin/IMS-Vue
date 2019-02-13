<template>
    <div id="icon">
        <i>
            <svg class="error" :class="{ 'wait': this.wait }" xmlns="http://www.w3.org/2000/svg" x="0px" viewBox="0 0 50 50">
                <circle class="error__circle" :class="{ 'wait': this.wait }" cx="25" cy="25" r="25"></circle>
                <polyline class="error__check check" :class="{ 'wait': this.wait }" points="16,34 25,25 34,16"></polyline>
                <polyline class="error__check check" :class="{ 'wait': this.wait }" points="16,16 25,25 34,34"></polyline>
            </svg>
        </i>
    </div>
</template>

<script>
    export default {
        name: "error-icon",
        props: {
            wait: {
                type: Boolean,
                required: true,
            }
        }
    }
</script>

<style scoped>
    .error__circle:not(.wait) {
        stroke-dasharray: 166;
        stroke-dashoffset: 166;
        stroke-width: 2;
        stroke-miterlimit: 10;
        stroke: #d75a4a;
        fill: none;
        animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards
    }

    .error:not(.wait) {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: block;
        stroke: #fff;
        stroke-miterlimit: 10;
        margin: 10% auto;
        box-shadow: inset 0px 0px 0px #d75a4a;
        animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both
    }

    .error__check:not(.wait) {
        transform-origin: 50% 50%;
        stroke-dasharray: 48;
        stroke-dashoffset: 48;
        stroke-width: 2;
        animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards
    }

    .check {
        fill: none;
        stroke: #FFFFFF;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-miterlimit: 10;
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
            box-shadow: inset 0px 0px 0px 30px #d75a4a
        }
    }

    svg {
        height: 40px;
        width: 40px;
    }
</style>