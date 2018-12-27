<template>
    <div class="form-group">
        <label :class="labelClass()">{{ label }}</label>
        <div :class="divClass()">
            <input :id="elementId" :type="type" :step="step" class="form-control" style="width: 365px" :required="required" autocomplete="off" :placeholder="placeholder">
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
            }
        },
        methods: {
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
            }
        }
    }
</script>

<style scoped>
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

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        margin: 3px 0;
    }
</style>