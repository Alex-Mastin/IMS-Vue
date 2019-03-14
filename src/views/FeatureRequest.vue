<template>
    <div id="storestocknew" v-title="title">
        <modal></modal>
        <div class="column form-column">
            <div class="column-header header-btm-border">
                <div class="action-row">
                    <div class="right">
                        <return-btn @click.native="back()"></return-btn>
                    </div>
                    <div class="font-xl">
                        New Feature Request
                    </div>
                </div>
            </div>
            <div id="column-content-form">
                <div id="column-container">
                    <div class="row product-form">
                        <div class="row-container">
                            <form id="feature-form" action="" autocomplete="off">
                                <form-input elementId="to" label="To:" labelWidth="15" inputWidth="50" type="text" disabled placeholder="support@imsdb.com"></form-input>
                                <form-input elementId="from" label="From: " labelWidth="15" inputWidth="50" type="text" required></form-input>
                                <form-input elementId="subject" label="Subject: " labelWidth="15" inputWidth="50" type="text" required></form-input>
                                <form-input elementId="content" label="Content: " labelWidth="15" inputWidth="50" type="text" required tall textarea placeholder="Describe your idea here"></form-input>
                            </form>
                        </div>
                    </div>
                    <hr class="border-light">
                    <div class="row">
                        <div class="btn-toolbar-left">
                            <btn-33 primary content="Send" @click.native="save()"></btn-33>
                            <btn-33 content="Cancel" @click.native="back()"></btn-33>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Btn33 from '@/components/Btn33.vue'
    import ReturnBtn  from '@/components/ReturnBtn.vue'
    import FormInput from '@/components/FormInput.vue'
    import Modal from '@/components/Modal.vue'

    export default {
        name: "FeatureRequest",
        components: {
            Btn33,
            ReturnBtn,
            FormInput,
            Modal,
        },
        data() {
            return {
                title: 'Support - Request a Feature | Device Pitstop - Maple Grove',
            }
        },
        methods: {
            routeTo(route) {
                this.$router.push(route);
            },
            back() {
                this.$router.go(-1);
            },
            save() {
                let self = this;
                let form = document.getElementById('feature-form');

                if (form.reportValidity()) {
                    let to = "mastin.alexander@gmail.com";
                    let from = document.getElementById("from").value;
                    let subject = document.getElementById("subject").value;
                    let content = document.getElementById("content").value + "\n Sent from: " + from;
                    let regex = "[\\w-]+@([\\w-]+\\.)+[\\w-]+";

                    // Check that email format is correct (ex. example@example.com)
                    if (from.match(regex)) {
                        Email.send({
                            Host : "smtp.elasticemail.com",
                            Username : "mastin.alexander@gmail.com",
                            Password : "488c22e7-4cf0-46f6-bfbb-630899a1ec46",
                            To : 'mastin.alexander@gmail.com',
                            From : 'dpimssr@gmail.com',
                            Subject : "[Maple Grove] IMS - Feature Request: " + subject,
                            Body : content
                        }).then(
                            message => {
                                console.log(message);
                                const INVALID_EMAIL = "Mailbox name not allowed. The server response was: Envelope FROM email address not allowed.";
                                const SENT = "OK";

                                if (message === SENT) {
                                    self.$root.$emit('openModal', {
                                        closed: false,
                                        text: 'Your feature request has been sent!',
                                        type: 'success'
                                    });

                                    setTimeout(() => {
                                        self.routeTo('/support');
                                    }, 600);
                                }

                                else if (message === INVALID_EMAIL) {
                                    self.$root.$emit('openModal', {
                                        closed: false,
                                        text: 'The provided email is either not allowed or is invalid!',
                                        type: 'error'
                                    });
                                }

                                // Daily limit exceeded
                                else if (message.includes("Error: 421")) {
                                    self.$root.$emit('openModal', {
                                        closed: false,
                                        text: 'The support service has exceeded its daily limit. Sorry!',
                                        type: 'error'
                                    });
                                }
                            }

                        );
                    }

                    else {
                        self.$root.$emit('openModal', {
                            closed: false,
                            text: 'Please enter a valid email!',
                            type: 'error'
                        });
                    }
                }
            },
        },
        created() {

        },
        mounted() {

        }
    }
</script>

<style scoped>
    #sign-form {
        margin-top: -1px;
    }

    .action-row {
        padding: 16px 10px 15px 18px;
    }

    .form-column {
        width: 65.5%;
    }

    .column {
        top: 3.1rem;
    }

    .btn-toolbar-left {
        margin-left: 0.75rem;
    }

    .btn {
        margin-left: 0.75rem;
    }

    #column-content-form {
        max-width: 1040px;
        margin-top: 25px;
        margin-right: 32px;
    }

    .product-form {
        padding: 0 20px 50px;
    }

    .border-light {
        border-top: none;
        border-bottom: 1px solid #F3F3F3;
        margin: 0 0 25px 15px;
    }

    hr {
        border: 0;
        background: #e5e5e5;
        margin: 0 0 20px;
    }

    .form-group {
        margin-bottom: 15px;
    }

    .form-group label {
        display: inline-block;
        padding-right: 15px;
    }

    .form-group div {
        display: inline-block;
    }

    textarea {
        max-height: 100px;
    }

</style>