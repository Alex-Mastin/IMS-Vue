<template>
    <div id="modal">
        <div class="modal" :class="{ 'closed': this.closed === true, 'open': this.closed === false }">
            <div id="modal-content" class="modal-dialog fade show in" :class="{ 'closed': this.closed === true, 'open': this.closed === false }">
                <div class="modal-body">
                    <div class="modal-row">
                        <div class="alert-icon">
                            <success-icon v-if="type === 'success'" :wait="this.wait"></success-icon>
                            <error-icon v-if="type === 'error'" :wait="this.wait"></error-icon>
                            <warning-icon v-if="type === 'warning'" :wait="this.wait"></warning-icon>
                        </div>
                        <div class="modal-content">
                            <p id="modal-text">{{ text }}</p>
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
    import WarningIcon from '@/components/WarningIcon.vue'

    export default {
        name: "modal",
        components: {
            SuccessIcon,
            ErrorIcon,
            WarningIcon
        },
        data() {
            return {
                closed: true,
                wait: true,
                type: '',
                text: '',
                dimScreen: false,
            }
        },
        methods: {
            closeModal() {
                let self = this;

                this.closed = true;

                setTimeout(function(){
                    self.wait = true;
                    self.type = '';
                    self.text = '';
                }, 300)
            },
        },
        mounted() {
            this.$root.$on('openModal', data => {
                let self = this;

                this.closed = data.closed;
                this.wait = data.closed;
                this.type = data.type;
                this.text = data.text;

                setTimeout(function(){
                    self.closeModal();
                }, 2250)

            });

            this.$root.$on('closeModal', data => {
                this.closeModal();
            });
        },
    }
</script>

<style scoped>
    .adjustUp {
        position: relative;
        top: -0.81em;
    }

    .modal.closed {
        z-index: -1;
    }

    .modal, .modal-open {
        overflow-x: auto;
        overflow-y: auto;
    }

    .modal-dialog.open {
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transition: transform 0.3s ease-out;
        -o-transition: transform 0.3s ease-out;
        -webkit-transition: transform 0.3s ease-out;
    }

    .modal-dialog.closed {
        opacity: 0;
        -webkit-transform: translate3d(0, -25%, 0);
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

</style>