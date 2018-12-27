<template>
    <button class="btn btn-transparent btn-small return">
        <svg class="text-top svg-18" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M466.745 0L256 210.745 45.255 0 0 45.254 210.745 256 0 466.745 45.255 512 256 301.255 466.745 512 512 466.745 301.255 256 512 45.254z"></path></svg>
    </button>
</template>

<script>
    export default {
        name: "return-btn"
    }
</script>

<style scoped>
    .btn {
        margin-right: 1rem!important;
    }

    .return {
        display: block;
        margin: 0 auto;
        fill: #777;
    }

    .btn-small {
        padding: 5px 10px;
        font-size: 13px;
        line-height: 1.5;
        border-radius: 3px;
    }

    .btn-transparent {
        background-color: transparent;
    }

    .text-top {
        vertical-align: text-top;
    }


</style>