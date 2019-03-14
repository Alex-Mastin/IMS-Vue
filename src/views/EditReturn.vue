<template>
    <div id="storestockedit" v-title="title">
        <modal></modal>
        <div class="column form-column">
            <div class="column-header header-btm-border">
                <div class="action-row">
                    <div class="right">
                        <return-btn @click.native="back()"></return-btn>
                    </div>
                    <div class="font-xl">
                        Edit Return
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
                                <form-input elementId="comments" label="Comments" labelWidth="15" inputWidth="50" type="text" textarea required></form-input>
                                <form-input elementId="sku" label="Product SKU" labelWidth="15" inputWidth="50" type="text" required placeholder="Hint: You can scan the barcode!"></form-input>
                                <date-picker></date-picker>
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
        name: "EditReturn",
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
                title: 'Returns - Editing ' + this.$route.params.id + ' | Device Pitstop - Maple Grove',
                manufacturer: '',
                model: '',
                comments: '',
                sku: '',
                sold: false,
                ready: false
            }
        },
        methods: {
            back() {
                this.$router.go(-1);
            },
            updateVModels() {
                let manufacturer = document.getElementById("manufacturer").value;
                let model = document.getElementById("model").value;
                let sku = document.getElementById("sku").value;

                this.manufacturer = manufacturer;
                this.model = model;
                this.sku = sku;
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
                    let comments = document.getElementById("comments").value;
                    let sku = document.getElementById("sku").value.toUpperCase();

                    let product = {
                        firstName: firstName,
                        lastName: lastName,
                        manufacturer: manufacturer,
                        model: model,
                        comments: comments,
                        sku: sku,
                        sold: this.sold,
                        ready: this.ready,
                        day: Number(this.getDay()),
                        month: Number(this.getMonth()),
                        year: Number(this.getYear()),
                        date: new Date(this.getDate()),
                        time: new Date().toLocaleTimeString()
                    };

                    database.collection('returns').doc(this.$route.params.id).get()
                        .then(docSnapshot => {
                            // This will only be true if a SKU already exists and someone is trying to enter it again.
                            // In which case, it will be processed as an update.
                            if (docSnapshot.exists) {
                                // Compare JSON objects to see if there has been any updates
                                let doc = docSnapshot.data();
                                let updates = self.compareJSON(doc, product);

                                // console.log("---");
                                // console.log(updates.comments);
                                // console.log(updates.comments[0]);

                                // If updates occurred...
                                if (updates.update) {

                                    let update = {};

                                    // If updates[key] is true (meaning that field has been updated), set update[key] to product[key]
                                    for (let key in updates) {
                                        if (updates[key] && key !== 'update') {
                                            update[key] = product[key];
                                        }
                                    }

                                    update.comments = updates.comments;

                                    console.log(update.comments);

                                    // If SKU was the only thing updated...
                                    if (update.sku) {
                                        let oldSku = self.$route.params.id;
                                        database.collection('returns').doc(oldSku).delete()
                                            .then(() => {
                                                let newDoc = doc;

                                                for (let key in update) {
                                                    newDoc[key] = update[key];
                                                }

                                                database.collection('returns').doc(newDoc.sku).set(newDoc)
                                                    .then(() => {
                                                        console.log("Document written with ID: ", newDoc.sku);
                                                        self.routeTo('/returns')
                                                    })
                                                    .catch((error) => {
                                                        console.error("Error adding document: ", error);

                                                        self.$root.$emit('openModal', {
                                                            closed: false,
                                                            text: 'An error occurred while saving to the database.',
                                                            type: 'error'
                                                        });
                                                    });

                                            })
                                    }

                                    // Otherwise, save it as normal
                                    else {
                                        database.collection('returns').doc(sku).update(update)
                                            .then(() => {
                                                console.log("Document written with ID: ", sku);
                                                self.routeTo('/returns')
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
                                }
                            }
                        })
                }
            },
            compareJSON(a, b) {
                let updates = {
                    update: false
                };

                for (let key in a) {
                    // Where a is the original JSON and b is the new JSON...
                    if (a[key] !== b[key]) {
                        // The update property shows that at least one thing in the JSON has been updated.
                        updates.update = true;

                        // This property has been updated in the JSON.
                        updates[key] = true;
                    }
                    else {
                        // This property has not been updated in the JSON.
                        updates[key] = false;
                    }
                }
                updates.comments = b.comments;

                return updates;
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
            routeTo(route) {
                this.$router.push(route);
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

            database.collection('returns').doc(this.$route.params.id).get()
                .then((docSnapshot) => {
                    let doc = docSnapshot.data();

                    // This is really not the ideal way to do this, but trying to modify the v-model just gives you undefined.
                    document.getElementById("technician").value = doc.firstName;
                    document.getElementById("technicianTwo").value = doc.lastName;
                    document.getElementById("manufacturer").value = doc.manufacturer;
                    document.getElementById("model").value = doc.model;
                    if (doc.comments) {
                        document.getElementById("comments").value = doc.comments;
                    }
                    document.getElementById("sku").value = doc.sku;
                    document.getElementById("date").value = this.getFullDate();
                    this.sold = doc.sold;
                    this.ready = doc.ready;

                    this.updateVModels();
                })
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