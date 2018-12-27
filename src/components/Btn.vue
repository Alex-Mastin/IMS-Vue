<template>
    <button v-if="primary === true" class="btn btn-primary btn-large" type="button">{{ content }}</button>
    <button v-else class="btn btn-default btn-large" type="button">{{ content }}</button>
</template>

<script>
    export default {
        name: "btn",
        props: {
            primary: Boolean,
            content: String
        }
    }
</script>

<style scoped>

</style>