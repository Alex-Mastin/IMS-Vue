<template>
    <div class="form-group">
        <label :class="{ 'required': required, 'label-15': labelWidth === 15 }">{{ label }}</label>
        <div class="right" :class="divClass()">
            <select
                    v-if="select === true"
                    :id="elementId"
                    :type="type"
                    :step="step"
                    class="form-control"
                    :class="{ 'large': small === false, 'small': small === true }"
                    autocomplete="off"
                    :placeholder="placeholder"
                    v-model="selected"
                    @change="parseOption(selected)"
            >
                <option value="" disabled="" selected="" hidden="">Select an option...</option>
                <option v-for="option in options">{{ option }}</option>
            </select>
            <input
                    v-if="textarea === false && select === false"
                    :id="elementId"
                    :type="type"
                    :step="step"
                    class="form-control"
                    :class="{ 'large': small === false, 'small': small === true }"
                    :required="required"
                    autocomplete="off"
                    :placeholder="placeholder"
                    v-model="inputOne"
                    :disabled="disabled"
            >
            <input
                    v-if="textarea === false && double === true"
                    :id="elementId + 'Two'"
                    :type="type"
                    :step="step"
                    class="form-control double"
                    :class="{ 'large': small === false, 'small': small === true }"
                    :style="small === true ? 'width: 154px' : ''"
                    :required="required"
                    autocomplete="off"
                    :placeholder="placeholderTwo"
                    v-model="inputTwo"
                    :disabled="disabled"
            >
            <textarea
                    v-if="textarea === true"
                    :id="elementId"
                    :type="type"
                    :step="step"
                    class="form-control double"
                    :class="{ 'large': small === false, 'small': small === true, 'tall': tall === true }"
                    :required="required"
                    autocomplete="off"
                    :placeholder="placeholder"
                    rows="1"
                    v-model="textArea"
                    :disabled="disabled"
            ></textarea>
        </div>
    </div>
</template>

<script>
    export default {
        name: "form-input",
        props: {
            labelWidth: String,
            inputWidth: String,
            label: String,
            required: Boolean,
            placeholder: String,
            placeholderTwo: String,
            elementId: String,
            type: {
                type: String,
                required: false,
                default: 'text'
            },
            step: {
                type: Number,
                required: false,
                default: 1
            },
            small: {
                type: Boolean,
                required: false,
                default: false
            },
            tall: {
                type: Boolean,
                required: false,
                default: false
            },
            double: {
                type: Boolean,
                required: false,
                default: false
            },
            textarea: {
                type: Boolean,
                required: false,
                default: false
            },
            select: {
                type: Boolean,
                required: false,
                default: false
            },
            options: Array,
            disabled: Boolean
        },
        data() {
            return {
                inputOne: '',
                inputTwo: '',
                selected: '',
                textArea: '',
            }
        },
        methods: {
            divClass() {
                return 'input-' + this.inputWidth;
            },
            parseOption(val) {
                // If input does not contain val, and is just an empty string, make input equal to val.
                if (!this.inputTwo.includes(val)) if (!this.inputTwo) {
                    this.inputTwo = val;
                }
                // Else concatenate val to input value
                else {
                    this.inputTwo += ", " + val
                }
            }
        }
    }
</script>

<style scoped>
    .form-group {
        display: table;
        margin-bottom: 15px;
        width: 60.45%;
        white-space: nowrap;
    }

    label {
        display: inline-block;
        padding-right: 15px;
        margin-top: 6px;
        margin-left: 15px;
    }

    textarea {
        resize: vertical;
        min-height: 21px!important;
    }

    textarea.tall {
        min-height: 100px!important;
    }

    select {
        height: 33px;
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

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        margin: 3px 0;
    }

    .input-25 {
        width: 64.75%;
    }

    .double {
        margin-left: 32px;
    }

    .large {
        width: 365px;
    }

    input.small {
        width: 153px;
    }

    select.small {
        width: 179px;
    }

    :disabled {
        background-color: #f9f9f9!important;
        color: #999!important;
        cursor: not-allowed;
    }

</style>