<template>
    <div id="newbuysale" v-title="title">
        <confirm-dialog></confirm-dialog>
        <modal></modal>
        <div class="column form-column">
            <div class="column-header header-btm-border">
                <div class="action-row">
                    <div class="right">
                        <return-btn @click.native="back()"></return-btn>
                    </div>
                    <div class="font-xl">
                        New Buy/Sale
                    </div>
                </div>
            </div>
            <div id="column-content-form">
                <div id="column-container">
                    <div class="row product-form">
                        <div class="row-container">
                            <form id="sign-form" action="" autocomplete="off">
                                <form-input elementId="technician" label="Technician" labelWidth="15" inputWidth="25" type="text" small double required placeholder="First Name" placeholderTwo="Last Name"></form-input>
                                <autocomplete elementId="manufacturer" :items="manufacturers" label="Manufacturer" labelWidth="15" inputWidth="50" type="text" required v-model="manufacturer"></autocomplete>
                                <autocomplete elementId="model" :items="models" label="Product Model" labelWidth="15" inputWidth="50" type="text" required v-model="model"></autocomplete>
                                <autocomplete elementId="carrier" :items="carriers" label="Carrier" labelWidth="15" inputWidth="50" type="text" v-model="carrier"></autocomplete>
                                <autocomplete elementId="capacity" :items="capacities" label="Storage Capacity" labelWidth="15" inputWidth="50" type="text" v-model="capacity"></autocomplete>
                                <form-input elementId="sku" label="Product SKU" labelWidth="15" inputWidth="50" type="text" placeholder="Hint: You can scan the barcode!"></form-input>
                                <date-picker></date-picker>
                                <br>
                                <h4 style="font-family: 'Metropolis Light'">Additional Parameters</h4>
                                <div class="form-group">
                                    <label for="buy" class="input-15">Buy</label>
                                    <div class="input-50" style="position: relative; left: 125px;">
                                        <input id="buy" type="radio" name="group" class="form-control-sm" v-model="buy">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="sale" class="input-15">Sale</label>
                                    <div class="input-50" style="position: relative; left: 123px;">
                                        <input id="sale" type="radio" name="group" class="form-control-sm" v-model="sale">
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
    import ReturnBtn  from '@/components/ReturnBtn.vue'
    import FormInput from '@/components/FormInput.vue'
    import DatePicker from '@/components/DatePicker.vue'
    import Autocomplete from '@/components/Autocomplete.vue'
    import Sign from '@/components/Sign.vue'
    import Modal from '@/components/Modal.vue'
    import ConfirmDialog from '@/components/ConfirmDialog.vue'
    import database from '@/components/firebaseInit.js'

    export default {
        name: "NewBuySale",
        components: {
            Btn33,
            ReturnBtn,
            FormInput,
            Autocomplete,
            Sign,
            Modal,
            ConfirmDialog,
            DatePicker
        },
        data() {
            return {
                manufacturers: [],
                models: [],
                carriers: [],
                capacities: [],
                title: 'Big Buys/Sales - New Buy/Sale | Device Pitstop - Maple Grove',
                manufacturer: '',
                model: '',
                carrier: '',
                capacity: '',
                sku: '',
                buy: false,
                sale: false
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
                let form = document.getElementById('sign-form');

                if (form.reportValidity()) {

                    // Sourcing these values manually instead of using v-model because v-model doesn't get the whole value when tabbing to autofill
                    let firstName = document.getElementById("technician").value;
                    let lastName = document.getElementById("technicianTwo").value;
                    let manufacturer = document.getElementById("manufacturer").value;
                    let model = document.getElementById("model").value;
                    let carrier = document.getElementById("carrier").value;
                    let capacity = document.getElementById("capacity").value;
                    let sku = document.getElementById("sku").value.toUpperCase();
                    let buy = document.querySelector("#buy");
                    let sale = document.querySelector("#sale");
                    let id = String(new Date().getTime());

                    if (!buy.checked && !sale.checked) {
                        this.$root.$emit('openModal', {
                            closed: false,
                            text: 'The transaction must be designated as a buy or sale!',
                            type: 'error'
                        });
                    }

                    else {
                        let product = {
                            firstName: firstName,
                            lastName: lastName,
                            manufacturer: manufacturer,
                            model: model,
                            carrier: carrier,
                            capacity: capacity,
                            sku: sku,
                            buy: buy.checked,
                            sale: sale.checked,
                            day: Number(this.getDay()),
                            month: Number(this.getMonth()),
                            year: Number(this.getYear()),
                            date: new Date(this.getDate()),
                            time: new Date().toLocaleTimeString()
                        };

                        database.collection('buysale').doc(id).get()
                            .then(docSnapshot => {
                                // This will only be true if a SKU already exists and someone is trying to enter it again.
                                // In which case, it will be processed as an update.
                                if (docSnapshot.exists) {
                                    self.$root.$emit('openModal', {
                                        closed: false,
                                        text: 'A buy or sale already exists with this SKU!',
                                        type: 'error'
                                    });
                                }
                                else {
                                    database.collection('buysale').doc(id).set(product)
                                        .then(() => {
                                            console.log("Document written with ID: ", id);
                                            self.routeTo('/buysale')
                                        })
                                        .catch((error) => {
                                            console.error("Error adding document: ", error);

                                            self.$root.$emit('openModal', {
                                                closed: false,
                                                text: 'An error occurred while saving to the database.',
                                                type: 'error'
                                            });
                                        });
                                }
                            })
                    }
                }
            },
            getDay() {
                return document.getElementById("date").value.split("/")[1];
            },
            getMonth() {
                return document.getElementById("date").value.split("/")[0];
            },
            getYear() {
                return document.getElementById("date").value.split("/")[2];
            },
            getDate() {
                return document.getElementById("date").value;
            },
            getFullDate() {
                let date = new Date();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                let year = date.getFullYear();

                return month + "/" + day + "/" + year;
            },
        },
        created() {

            database.collection('manufacturer').orderBy('manufacturer').get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        let manufacturer = doc.data().manufacturer;
                        this.manufacturers.push(manufacturer);
                    })
                });

            database.collection('product').orderBy('product').get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        let product = doc.data().product;
                        this.models.push(product);
                    })
                });

            database.collection('carrier').orderBy('carrier').get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        let carrier = doc.data().carrier;
                        this.carriers.push(carrier);
                    })
                });

            database.collection('capacity').orderBy('capacity', "asc").get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        let capacity = String(doc.data().capacity + "GB");
                        this.capacities.push(capacity);
                    })
                });
        },
        mounted() {
            document.getElementById("date").value = this.getFullDate();
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