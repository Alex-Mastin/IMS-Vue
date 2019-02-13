<template>
    <div id="new-sign" v-title="title">
        <confirm-dialog></confirm-dialog>
        <modal></modal>
        <div class="column form-column">
            <div class="column-header header-btm-border">
                <div class="action-row">
                    <div class="right">
                        <return-btn @click.native="toSignMaker()"></return-btn>
                    </div>
                    <div class="font-xl">
                        New Sign
                    </div>
                </div>
            </div>
            <div id="column-content-form">
                <div id="column-container">
                    <div class="row product-form">
                        <div class="row-container">
                            <form id="sign-form" action="" autocomplete="off">
                                <autocomplete elementId="manufacturer" :items="manufacturers" label="Manufacturer" labelWidth="15" inputWidth="50" type="text" required></autocomplete>
                                <autocomplete elementId="model" :items="models" label="Product Model" labelWidth="15" inputWidth="50" type="text" required></autocomplete>
                                <autocomplete elementId="carrier" :items="carriers" label="Carrier" labelWidth="15" inputWidth="50" type="text" required></autocomplete>
                                <autocomplete elementId="capacity" :items="capacities" label="Storage Capacity" labelWidth="15" inputWidth="50" type="text" required></autocomplete>
                                <form-input elementId="price" label="Price" labelWidth="15" inputWidth="50" type="number" :step=0.01 required></form-input>
                                <form-input elementId="comments" label="Comments" labelWidth="15" inputWidth="50" type="text"></form-input>
                                <form-input elementId="sku" label="Product SKU" labelWidth="15" inputWidth="50" type="text" required placeholder="Hint: You can scan the barcode!"></form-input>
                            </form></div>
                    </div>
                    <hr class="border-light">
                    <div class="row">
                        <div class="btn-toolbar-left">
                            <btn-33 primary content="Create Sign" @click.native="createPreview()"></btn-33>
                            <btn-33 content="Cancel" @click.native="toSignMaker()"></btn-33>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="preview">
            <div id="column-header" class="header-btm-border preview-header">
                <div class="action-row">
                    <div class="font-xl">
                        Preview
                    </div>
                </div>
            </div>
            <div class="page">
                <div class="card">
                    <sign v-if="(manufacturer, model, carrier, capacity, price, sku)" :manufacturer="manufacturer" :model="model" :carrier="carrier" :capacity="capacity" :price=Number(price) :comment="comments" :sku="sku"></sign>
                </div>
            </div>
            <div class="btn-toolbar-center">
                <btn-33 primary content="Add to Queue" @click.native="checkQueue"></btn-33>
                <btn-33 content="Go to Queue" @click.native="toQueue()"></btn-33>
            </div>

        </div>
    </div>
</template>

<script>
    import Btn33 from '@/components/Btn33.vue'
    import ReturnBtn  from '@/components/ReturnBtn.vue'
    import FormInput from '@/components/FormInput.vue'
    import Autocomplete from '@/components/Autocomplete.vue'
    import Sign from '@/components/Sign.vue'
    import Modal from '@/components/Modal.vue'
    import ConfirmDialog from '@/components/ConfirmDialog.vue'
    import database from '@/components/firebaseInit.js'

    export default {
        name: "NewSign",
        components: {
            Btn33,
            ReturnBtn,
            FormInput,
            Autocomplete,
            Sign,
            Modal,
            ConfirmDialog
        },
        data() {
            return {
                manufacturers: [],
                models: [],
                carriers: [],
                capacities: [],
                title: 'Sign Maker - New Sign | Device Pitstop - Maple Grove',
                manufacturer: '',
                model: '',
                carrier: '',
                capacity: '',
                price: '',
                comments: '',
                sku: '',
                msrp: '',
            }
        },
        methods: {
            toSignMaker() {
                this.$router.push("/signmaker");
            },
            toQueue() {
                let routeData = this.$router.resolve({name: 'Print Queue'});
                window.open(routeData.href, '_blank');
            },
            createPreview() {
                let form = document.getElementById('sign-form');

                if (form.reportValidity()) {
                    this.manufacturer = document.getElementById("manufacturer").value;
                    this.model = document.getElementById("model").value;
                    this.carrier = document.getElementById("carrier").value;
                    this.capacity = document.getElementById("capacity").value;
                    this.price = document.getElementById("price").value;
                    this.comments = document.getElementById("comments").value;
                    this.sku = document.getElementById("sku").value;

                    form.reset();
                }
            },
            checkQueue() {
                let self = this;
                database.collection('signs').get()
                    .then(snapshot => {
                        if (snapshot.size < 10) {
                            this.addToQueue();
                        }
                        else {
                            self.$root.$emit('openConfirm', {
                                closed: false,
                                text: 'The print queue is full! Print some signs first.',
                                type: 'warning',
                                dimScreen: true,
                            });
                        }
                    });
            },
            addToQueue() {
                let self = this;

                let signValues = document.querySelector(".card") // .card
                                .children[0] // sign-#############
                                .children[0] // sign
                                .children[0] // div
                                .children[0] // table
                                .children[0] // tbody
                                .children; // tr collection

                let signProduct = document.querySelector("#sign-product");
                let signCarrier = signValues[3].children[0].children[0]; // This is necessary because you have no idea what the ID will be since it's dynamic.
                let signCapacity = document.querySelector("#sign-capacity");
                let signPrice = document.querySelector("#sign-price");
                let signComments = signValues[4].children[0].children[0]; // This is necessary because you have no idea what the ID will be since it's dynamic.
                let signMsrp = document.querySelector("#sign-msrp");
                let signSku = document.querySelector("#sign-sku");

                let manufacturer = '';
                let model = '';
                let carrier = '';
                let capacity = '';
                let price = '';
                let comments = '';
                let msrp = '';
                let sku = '';

                // Validate that fields are defined
                if (signProduct && signCarrier && signCapacity && signPrice && signComments && signSku) {
                    let product = document.querySelector("#sign-product").value;
                    let signManufacturer = product.split(" ")[0];
                    let signModel = product.slice(signManufacturer.length + 1, product.length);

                    manufacturer = signManufacturer;
                    model = signModel;
                    carrier = signCarrier.value;
                    capacity = signCapacity.value;
                    price = signPrice.value;
                    price = price.replace("$", "");
                    comments = signComments.value;
                    sku = signSku.value;

                    if (signMsrp) {
                        msrp = signMsrp.value;
                        msrp = msrp.replace("MSRP: $", "");
                    }

                    // Add sign to database
                    database.collection("signs").add({
                        manufacturer: manufacturer,
                        model: model,
                        carrier: carrier,
                        capacity: capacity,
                        price: price,
                        comments: comments,
                        sku: sku,
                        msrp: msrp || ''
                    }).then(function(docRef) {
                        console.log("Document written with ID: ", docRef.id);

                        self.$root.$emit('openModal', {
                            closed: false,
                            text: 'The sign was successfully added to the queue!',
                            type: 'success'
                        });
                    })
                        .catch(function(error) {
                            console.error("Error adding document: ", error);

                            self.$root.$emit('openModal', {
                                closed: false,
                                text: 'An error occurred while adding the sign to the queue!',
                                type: 'error'
                            });
                        });


                    this.manufacturer = '';
                    this.model = '';
                    this.carrier = '';
                    this.capacity = '';
                    this.price = '';
                    this.comments = '';
                    this.sku = '';
                    this.msrp = '';
                }
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
            this.$root.$on('confirm', data => {
                this.toQueue();
            });
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

    .preview {
        width: 30%;
        height: -webkit-fill-available;
        top: 50px;
        position: fixed;
        right: 0;
        border-left: 1px solid #ededed;
    }

    .preview-header {
        border: none;
        text-align: center;
        margin: 0 auto;
    }

    .page {
        background-color: #fff;
        width: 34em;
        margin: 7em auto;
        padding: 4em;
    }

    .card {
        box-shadow: 0px 10px 20px -2px rgba(0,0,0,0.2);
        width: 330px;
        height: 199px;
        margin: 0 auto;
    }

    .btn-toolbar-left {
        margin-left: 0.75rem;
    }

    .btn-toolbar-center {
        text-align: center;
        margin-right: 2px;
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
</style>