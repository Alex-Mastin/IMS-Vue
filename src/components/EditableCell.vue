<template>
    <td>
        <div contenteditable="true" :data-text="placeholder"></div>
    </td>
</template>

<script>
    export default {
        name: "EditableCell",
        props: {
            placeholder: String
        }
    }
</script>

<style scoped>
    [contenteditable=true] {
        background: #F5FAFF;
    }

    [contenteditable=true]:empty:not(:focus):before {
        color: #777 !important;
        content:attr(data-text);
    }
</style>