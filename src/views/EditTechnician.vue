<template>
    <div id="technicianedit" v-title="title">
        <modal></modal>
        <div class="column form-column">
            <div class="column-header header-btm-border">
                <div class="action-row">
                    <div class="right">
                        <return-btn @click.native="back()"></return-btn>
                    </div>
                    <div class="font-xl">
                        Edit Technician
                    </div>
                </div>
            </div>
            <div id="column-content-form">
                <div id="column-container">
                    <div class="row product-form">
                        <div class="row-container">
                            <form id="sign-form" action="" autocomplete="off">
                                <form-input elementId="actions" label="Technician" labelWidth="15"
                                            inputWidth="25" :concatenate=false type="text" small double select required
                                            :options="users"></form-input>
                                <form-input elementId="firstName" label="First Name" labelWidth="15" inputWidth="50"
                                            type="text" required></form-input>
                                <form-input elementId="lastName" label="Last Name" labelWidth="15" inputWidth="50"
                                            type="text" required></form-input>
                                <form-input elementId="email" label="Email Address" labelWidth="15" inputWidth="50"
                                            type="text"></form-input>
                                <form-input elementId="phoneNumber" label="Phone Number" labelWidth="15" inputWidth="50"
                                            type="text"></form-input>
                                <br>
                                <h4 style="font-family: 'Metropolis Light'">Additional Parameters</h4>
                                <div class="form-group">
                                    <label class="input-15">Active Technician</label>
                                    <div class="input-50" style="position: relative; left: 40px;">
                                        <input id="active" type="checkbox" class="form-control-sm" v-model="active">
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                    <hr class="border-light">
                    <div class="row">
                        <div class="btn-toolbar-left">
                            <btn-33 primary content="Save" @click.native="save()"></btn-33>
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
    import ReturnBtn from '@/components/ReturnBtn.vue'
    import FormInput from '@/components/FormInput.vue'
    import Autocomplete from '@/components/Autocomplete.vue'
    import Sign from '@/components/Sign.vue'
    import Modal from '@/components/Modal.vue'
    import ConfirmDialog from '@/components/ConfirmDialog.vue'
    import DatePicker from '@/components/DatePicker.vue'
    import database from '@/components/firebaseInit.js'

    export default {
        name: "EditTechnician",
        components: {
            Btn33,
            ReturnBtn,
            FormInput,
            Autocomplete,
            Sign,
            Modal,
            ConfirmDialog,
        },
        data() {
            return {
                title: 'Technicians - Editing Technician | Device Pitstop - Maple Grove',
                technicians: [],
                users: [],
                user: '',
                active: true
            }
        },
        methods: {
            updateVModels() {

            },
            back() {
                this.$router.go(-1);
            },
            save() {
                let self = this;
                let form = document.getElementById('sign-form');

                if (form.reportValidity()) {

                    // Sourcing these values manually instead of using v-model because v-model doesn't get the whole value when tabbing to autofill
                    let originalFirstName = document.getElementById("actionsTwo").value.split(" ")[0];
                    let originalLastName = document.getElementById("actionsTwo").value.split(" ")[1];
                    let firstName = document.getElementById("firstName").value;
                    let lastName = document.getElementById("lastName").value;
                    let email = document.getElementById("email").value;
                    let phoneNumber = document.getElementById("phoneNumber").value;

                    let user = {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        phoneNumber: phoneNumber,
                        active: this.active,
                    };

                    database.collection('technicians').where("firstName", "==", originalFirstName).where("lastName", "==", originalLastName).get()
                        .then(docSnapshot => {
                            if (docSnapshot.size === 1) {
                                let doc = docSnapshot.docs[0];

                                database.collection('technicians').doc(doc.id).update(user)
                                    .then(() => {
                                        console.log("Document written with ID: ", doc.id);
                                        self.routeTo('/technicians')
                                    })
                                    .catch((error) => {
                                        console.error("Error updating document: ", error);

                                        self.$root.$emit('openModal', {
                                            closed: false,
                                            text: 'An error occurred while saving to the database.',
                                            type: 'error'
                                        });
                                    });

                            }
                            else if (docSnapshot.size > 1) {
                                self.$root.$emit('openModal', {
                                    closed: false,
                                    text: 'An error occurred. There is more than 1 user with this name.',
                                    type: 'error'
                                })
                            }
                            else {
                                self.$root.$emit('openModal', {
                                    closed: false,
                                    text: 'An error occurred. This user does not exist.',
                                    type: 'error'
                                })
                            }
                        })
                }
            },
            routeTo(route) {
                this.$router.push(route);
            },
        },
        created() {
            database.collection('technicians').orderBy('firstName', "asc").get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        this.technicians.push(doc.data());

                        this.users.push(doc.data().firstName + ' ' + doc.data().lastName);
                    })
                });
        },
        beforeUpdate() {
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
</style>