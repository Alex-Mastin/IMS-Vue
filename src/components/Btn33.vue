<template>
    <button
            class="btn btn-33"
            :class="{ 'btn-primary': primary, 'btn-default': !primary, 'btn-small': small }"
            type="button"
    >
        <svg v-if="add" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='sub-white'><path d='M511.5 227.5h-227V.5h-57v227H-.5v57h228v228h57v-228h227z'></path></svg>
        {{ content }}
    </button>
</template>

<script>
    export default {
        name: "btn-33",
        props: {
            primary: {
                type: Boolean,
                required: false,
                default: false
            },
            content: {
                type: String,
                required: true,
            },
            large: {
                type: Boolean,
                required: false,
                default: false
            },
            add: {
                type: Boolean,
                required: false,
                default: false
            },
            code: {
                type: Boolean,
                required: false,
                default: false
            },
            bug: {
                type: Boolean,
                required: false,
                default: false
            },
            small: {
                type: Boolean,
                required: false,
                default: false,
            },
            type: {
                type: String,
                required: false,
                default: 'button'
            }
        }
    }
</script>

<style scoped>
    .sub-white {
        vertical-align: sub;
        fill: white;
    }

    .sub-grey {
        vertical-align: sub;
        fill: #222;
    }

    svg {
        margin-left: 3px;
        margin-right: 3px;
        height: 15px;
        width: 15px;
    }
</style>