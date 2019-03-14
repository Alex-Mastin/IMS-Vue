<template>
    <div id="confirmDialog">
        <div class="modal" :class="{ 'closed': this.closed === true, 'open': this.closed === false }">
            <div
                    v-if="dimScreen"
                    id="backdrop"
                    class="modal-backdrop fade"
                    :class="{
                        'closed': this.closed === true,
                        'open': this.closed === false,
                        'backdropClosed': this.backdropClosed === true,
                        'backdropOpen': this.backdropClosed === false
                     }"></div>
            <div id="modal-content" class="modal-dialog fade show" :class="{ 'closed': this.closed === true, 'open': this.closed === false }">
                <div class="modal-body">
                    <div class="modal-row">
                        <div class="alert-icon">
                            <success-icon v-if="type === 'success'" :wait="this.wait"></success-icon>
                            <error-icon v-if="type === 'error'" :wait="this.wait"></error-icon>
                            <warning-icon v-if="type === 'warning'" :wait="this.wait"></warning-icon>
                        </div>
                        <div class="modal-content">
                            <p id="modal-text">{{ text }}</p>
                            <div class="alert-actions">
                                <btn primary content="OK" @click.native="confirm()"></btn>
                                <btn content="Cancel" @click.native="closeDialog()"></btn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SuccessIcon from '@/components/SuccessIcon.vue'
    import ErrorIcon from '@/components/ErrorIcon.vue'
    import Btn from '@/components/Btn.vue'
    import WarningIcon from "./WarningIcon";

    export default {
        name: "confirm-dialog",
        components: {
            WarningIcon,
            SuccessIcon,
            ErrorIcon,
            Btn
        },
        data() {
            return {
                closed: true,
                wait: true,
                type: '',
                text: '',
                dimScreen: false,
                backdropClosed: true,
            }
        },
        methods: {
            closeDialog() {
                let self = this;
                this.closed = true;

                this.$root.$emit('dialogClosing', {

                });

                setTimeout(function(){
                    self.wait = true;
                    self.type = '';
                    self.text = '';
                    self.dimScreen = false;
                    self.backdropClosed = true;
                }, 300)
            },
            confirm() {
                this.$root.$emit('confirm', {

                });

                this.closeDialog();
            }
        },
        mounted() {
            this.$root.$on('openConfirm', data => {
                let self = this;

                this.wait = data.closed;
                this.type = data.type;
                this.text = data.text;
                this.dimScreen = data.dimScreen;
                this.backdropClosed = false;

                setTimeout(function() {
                    self.closed = data.closed
                });
            });

            this.$root.$on('closeConfirm', data => {
                this.closeDialog();
            });
        },
    }
</script>

<style scoped>
    .adjustUp {
        position: relative;
        top: -0.81em;
    }

    .backdropClosed {
        z-index: -1;
    }

    .backdropOpen {
        z-index: 1;
    }

    .modal-backdrop.closed {
        opacity: 0;
        -webkit-transition: opacity .15s linear;
        transition: opacity .15s linear;
    }

    .modal-backdrop.open {
        opacity: 1;
        -webkit-transition: opacity .15s linear;
        transition: opacity .15s linear;
    }

    .modal-backdrop {
        position: fixed;
        background: rgba(255, 255, 255, 0.5);
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
    }

    .modal.closed {
        z-index: -1;
    }

    .modal, .modal-open {
        overflow-x: auto;
        overflow-y: auto;
    }

    .modal-dialog.open {
        transform: translate3d(0, 0, 0);
        -moz-transition: transform .3s ease-out;
        -o-transition: transform .3s ease-out;
        -webkit-transition: transform .3s ease-out;
    }

    .modal-dialog.closed {
        opacity: 0;
        transform: translate3d(0, -25%, 0);
        -moz-transition:transform 0.3s ease-out, opacity 0.15s linear;
        -o-transition:transform 0.3s ease-out, opacity 0.15s linear;
        -webkit-transition: transform 0.3s ease-out, opacity 0.15s linear;
    }

    .modal-dialog {
        width: 510px;
        position: fixed;
        z-index: 11;
        outline: 0;
        left: 42%;
        box-shadow: 0 3px 9px rgba(0,0,0,0.5);
        background: #fff;
    }

    .fade {
        opacity: inherit;
    }

    .show {
        display: block !important;
    }

    .modal-body {
        padding: 15px 20px 0 20px;
    }

    .modal-row {
        padding-left: 15px;
        padding-right: 15px;
    }

    .alert-icon {
        padding-right: 15px;
        width: 16.6666667%;
    }

    svg {
        margin-left: 9px!important;
        margin-top: 9px!important;
        position: relative;
        top: 2px;
    }

    .modal-content {
        bottom: 2.5rem;
        position: relative;
        width: 83.333333333333%;
        float: right;
        padding-left: 15px;
    }

    #modal-text {
        position: relative;
        left: 11px;
        top: 1px;
    }

    p {
        margin: 0 0 10.5px;
    }

    .alert-actions {
        margin-top: 18px;
        margin-left: 12px;
    }

    .alert-actions .btn:nth-child(2) {
        margin-left: 4px;
    }

</style>