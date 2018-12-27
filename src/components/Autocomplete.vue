<template>
    <div class="form-group autocomplete">
        <label :class="labelClass()">{{ label }}</label>
        <div :class="divClass()">
            <input :id="elementId"
                   :type="type"
                   class="form-control"
                   style="width: 365px"
                   :required="required"
                   autocomplete="off"
                   :placeholder="placeholder"
                   v-model="search"
                   @input="onChange"
                   @keydown.down.prevent="onArrowDown"
                   @keydown.up.prevent="onArrowUp"
                   @keydown.enter="onEnter"
                   @keydown.tab="onTab"
            >
        </div>
        <ul v-show="isOpen" id="results" class="autocomplete-results">
            <li class="loading" v-if="isLoading">
                Loading results...
            </li>
            <li v-else
                v-for="(result, i) in results"
                :key="i" @click="setResult(result)"
                class="autocomplete-result"
                :class="{ 'is-active': i === arrowCounter }"
            >
                {{ result }}
            </li>
        </ul>
    </div>
</template>

<script>
    import FormInput from "./FormInput";
    export default {
        name: "Autocomplete",
        components: {
            FormInput
        },
        props: {
            items: {
                type: Array,
                required: false,
                default: () => [],
            },
            labelWidth: {
                type: String,
                required: true
            },
            inputWidth: {
                type: String,
                required: true
            },
            label: {
                type: String,
                required: false,
            },
            required: {
                type: Boolean,
                required: false,
            },
            placeholder: {
                type: String,
                required: false
            },
            elementId: String,
            isAsync: {
                type:  Boolean,
                required: false,
                default: false
            },
            type : {
                type: String,
                required: true
            },

        },
        data() {
            return {
                search: '',
                results: [],
                isOpen: false,
                isLoading: false,
                arrowCounter: 0,
                changed: false
            }
        },
        methods: {
            onArrowDown() {
                let div = document.getElementById("results");
                div.scrollTop += 25;

                if (this.arrowCounter < this.results.length) {
                    this.arrowCounter++;
                    this.search = this.results[this.arrowCounter];
                }
            },
            onArrowUp() {
                let div = document.getElementById("results");
                div.scrollTop -= 25;

                if (this.arrowCounter > 0) {
                    this.arrowCounter--;
                    this.search = this.results[this.arrowCounter];
                }
            },
            onEnter() {
                this.search = this.results[this.arrowCounter];
                this.isOpen = false;
                this.arrowCounter = 0;
                this.changed = false;
            },
            onTab() {
                if (this.arrowCounter === 0 && this.results[0] && this.changed) {
                    this.search = this.results[0];
                }
                else if (this.results[0] && this.changed){
                    this.search = this.results[this.arrowCounter];
                }
                this.isOpen = false;
                this.arrowCounter = 0;
            },
            onChange() {
                this.$emit('input', this.search);

                this.changed = true;

                if (this.isAsync) {
                    this.isLoading = true;
                }
                else {
                    this.filterResults();
                    this.isOpen = true;
                }

                if (this.search !== "") {
                    this.filterResults();
                    this.isOpen = true;
                }
                else {
                    this.isOpen = false;
                }

                // Hide div if no results exist
                if (this.results.length === 0) {
                    this.isOpen = false;
                }

            },
            filterResults() {
                this.results = this.items.filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
            },
            setResult(result) {
                this.search = result;
                this.isOpen = false;
            },
            labelClass() {
                let elementClass = "";

                if (this.required) {
                    elementClass += 'required';
                }

                if (this.labelWidth === "15") {
                    elementClass += ' input-15'
                }

                return elementClass;
            },
            divClass() {
                let elementClass = "right";

                if (this.inputWidth === "50") {
                    elementClass += ' input-50';
                }

                return elementClass;
            },
            handleClickOutside(e) {
                if (!this.$el.contains(e.target)) {
                    this.isOpen = false;
                    this.arrowCounter = 0;
                }
            }
        },
        mounted() {
            document.addEventListener('click', this.handleClickOutside);
        },
        destroyed() {
            document.removeEventListener('click', this.handleClickOutside)
        },
        watch: {
            items: function(value, oldValue) {
                if (this.isAsync) {
                    this.results = value;
                    this.isOpen = true;
                    this.isLoading = false;
                }
            }
        }
    }
</script>

<style scoped>
    .autocomplete {
        position: relative;
        width: 391px;
    }

    .autocomplete-results {
        padding: 10px 0;
        margin: 0;
        border: 1px solid #dddddd;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        max-height: 178px;
        height: auto;
        overflow-y: scroll;
        overflow-x: hidden;
        position: absolute;
        left: 198px;
        top: 33px;
        z-index: 10;
        width: 389px;
        color: #999999;
        background: white;
        box-shadow: inset 0 1px 1px rgba(0,0,0,0.075), 0 0 8px rgba(0,0,0,0.1);
    }

    .autocomplete-result {
        list-style: none;
        /*text-align: left;*/
        cursor: pointer;
        font-size: 1.1em;
        margin: 0;
        padding: 1px 5px 1px 15px;
        margin-left: -5px;
        width: 30rem;
    }

    .autocomplete-result.is-active,
    .autocomplete-result:hover {
        background-color: #206ec5;
        color: white;
    }

    .form-group {
        display: table;
        margin-bottom: 15px;
        width: 60.45%;
    }

    label {
        display: inline-block;
        padding-right: 15px;
        margin-top: 6px;
    }

    .required {
        color: #df6869;
    }

    .required::after {
        content: "*";
    }

    .form-control {
        font-size: 15px;
        line-height: 1.42857143;
        color: #555;
        /*display: block;*/
        padding: 5px 12px;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 2px;
        box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
        transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    }

    .form-control:focus {
        border-color: #66afe9;
        outline: 0;
        box-shadow: inset 0 1px 1px rgba(0,0,0,0.075), 0 0 8px rgba(102,175,233,0.6);
    }
</style>