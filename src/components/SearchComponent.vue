<template>
    <div class="search-component">
        <div class="search-group">
            <p>{{ text }}</p>
            <viewable-dropdown :options="options" class="dropdown-primary"></viewable-dropdown>
            <viewable-dropdown :options="queryOptions" v-if="!omit"></viewable-dropdown>
            <form-input small :placeholder="getRandomTerm()" v-if="!omit"></form-input>
        </div>
    </div>
</template>

<script>
    import FormInput from '@/components/FormInput.vue'
    import ViewableDropdown from '@/components/ViewableDropdown.vue'

    export default {
        name: "search-component",
        props: {
            text: {
                type: String,
                required: true
            },
            options: {
                type: Array,
                required: true
            },
            omit : {
                type: Boolean,
                required: false
            }
        },
        components: {
            FormInput,
            ViewableDropdown,
        },
        data() {
            return {
                queryOptions: ['<', '<=', '==', '>=', '>',],
                primary: '',
                selected: ''
            }
        },
        methods: {
            getRandomTerm() {
                if (this.primary) {
                    let primaryContent = document.querySelector("#" + this.primary).childNodes[0].children[0].innerText;

                    if (primaryContent === 'Technician') {
                        return 'e.g. John Cena';
                    }
                }
            }
        },
        mounted() {
            this.$root.$on('changed', data => {
                if (data.selected) {
                    this.selected = data.selected;
                }
                this.primary = data.id;
            })
        }
    }
</script>

<style scoped>
    .search-group {
        display: inline-block;
    }

    p {
        font-family: "Courier New";
        font-size: 18px;
        display: inline-block;
    }

    .dropdown {
        display: inline-block;
        margin-left: 15px;
    }

    .form-group {
        display: unset;
        width: 12.75%!important;
        margin-left: -15px;
    }
</style>