<template>
    <button v-if="primary === true" class="btn btn-33 btn-primary" type="button">{{ content }}</button>
    <button v-else class="btn btn-33 btn-default" type="button">{{ content }}</button>
</template>

<script>
    export default {
        name: "btn-33",
        props: {
            primary: Boolean,
            content: String
        }
    }
</script>

<style scoped>

</style>