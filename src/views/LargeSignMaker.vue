<template>
    <div id="new-large-sign" v-title="title">
        <confirm-dialog></confirm-dialog>
        <modal></modal>
        <div class="column form-column">
            <div class="column-header header-btm-border">
                <div class="action-row">
                    <div class="right">
                        <return-btn @click.native="toSignMaker()"></return-btn>
                    </div>
                    <div class="font-xl">
                        New Large Sign
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
                                <autocomplete elementId="identifier" :items="identifiers" label="Product Identifier" labelWidth="15" inputWidth="50" type="text"></autocomplete>
                                <autocomplete elementId="cpu" :items="processors" label="Processor" labelWidth="15" inputWidth="50" type="text" required></autocomplete>
                                <autocomplete elementId="memory" :items="memory" label="Memory" labelWidth="15" inputWidth="50" type="text" required></autocomplete>
                                <autocomplete elementId="capacity" :items="capacities" label="Storage Capacity" labelWidth="15" inputWidth="50" type="text" required></autocomplete>
                                <autocomplete elementId="drive" :items="drives" label="Storage Type" labelWidth="15" inputWidth="50" type="text" required></autocomplete>
                                <form-input elementId="price" label="Price" labelWidth="15" inputWidth="50" type="number" :step=0.01 required></form-input>
                                <form-input elementId="msrp" label="MSRP" labelWidth="15" inputWidth="50" type="number" :step=0.01></form-input>
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
                    <large-sign :manufacturer="manufacturer" :model="model" :cpu="cpu" :capacity="capacity" :drive="drive" :memory="ram" :msrp=Number(msrp) :price=Number(price) :comment="comments" :sku="sku" v-if="(manufacturer, model, cpu, memory, capacity, drive, price, sku)"></large-sign>
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
    import LargeSign from '@/components/LargeSign.vue'
    import Modal from '@/components/Modal.vue'
    import ConfirmDialog from '@/components/ConfirmDialog.vue'
    import database from '@/components/firebaseInit.js'

    export default {
        name: "NewLargeSign",
        components: {
            Btn33,
            ReturnBtn,
            FormInput,
            Autocomplete,
            LargeSign,
            Modal,
            ConfirmDialog
        },
        data() {
            return {
                manufacturers: [],
                models: [],
                carriers: [],
                capacities: [],
                drives: [],
                memory: [],
                processors: [],
                identifiers: [],
                title: 'Sign Maker - New Large Sign | Device Pitstop - Maple Grove',
                manufacturer: '',
                model: '',
                identifier: '',
                carrier: '',
                capacity: '',
                comments: '',
                cpu: '',
                drive: '',
                price: '',
                ram: '',
                sku: '',
                msrp: '',
            }
        },
        methods: {
            toSignMaker() {
                this.$router.push("/signmaker");
            },
            toQueue() {
                let routeData = this.$router.resolve({name: 'Large Print Queue'});
                window.open(routeData.href, '_blank');
            },
            createPreview() {
                let form = document.getElementById('sign-form');

                if (form.reportValidity()) {
                    this.manufacturer = document.getElementById("manufacturer").value;
                    this.model = this.formatModel(document.getElementById("model").value, document.getElementById("identifier").value);
                    this.cpu = document.getElementById("cpu").value;
                    this.ram = document.getElementById("memory").value;
                    this.capacity = document.getElementById("capacity").value + " " + document.getElementById("drive").value;
                    this.drive = document.getElementById("drive").value;
                    this.price = document.getElementById("price").value;
                    this.msrp = document.getElementById("msrp").value;
                    this.comments = document.getElementById("comments").value;
                    this.sku = document.getElementById("sku").value;

                    form.reset();
                }
            },
            formatModel(model, identifier) {
                // Removes the parenthesis and year from the model, if it exists.
                // If model is MacBook Air 11.6" (Mid 2014), it becomes MacBook Air 11.6"
                if (model.includes("(") && model.includes(")")) {
                    let leftIndex = model.indexOf("(");
                    let rightIndex = model.indexOf(")");
                    let substring = model.substring(leftIndex, rightIndex + 1);

                    model = model.replace(substring, "");
                }

                // Concatenate identifier (ex. MLUQ2LL/A)
                if (identifier) {
                    return model + "(" + identifier + ")";
                }

                return model;
            },
            checkQueue() {
                let self = this;
                database.collection('largesigns').get()
                    .then(snapshot => {
                        if (snapshot.size < 1) {
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

                // let signValues = document.querySelector(".card") // .card
                //     .children[0] // sign-#############
                //     .children[0] // sign
                //     .children[0] // div
                //     .children[0] // table
                //     .children[0] // tbody
                //     .children; // tr collection

                let signProduct = document.querySelector("#sign-product");
                let signModel = document.querySelector("#sign-model");
                let signProcessor = document.querySelector("#sign-cpu");
                let signMemory = document.querySelector("#sign-ram");
                let signDrive = document.querySelector("#sign-drive");
                let signMsrp = document.querySelector("#sign-msrp");
                let signPrice = document.querySelector("#sign-price");
                let signComments = document.querySelector("#sign-comment");
                let signSku = document.querySelector("#sign-sku");

                let manufacturer = '';
                let model = '';
                let cpu = '';
                let ram = '';
                let capacity = '';
                let price = '';
                let comments = '';
                let msrp = '';
                let sku = '';

                // Validate that fields are defined
                if (signProduct && signModel && signProcessor && signMemory && signDrive && signPrice && signComments) {

                    manufacturer = signProduct.value;
                    model = signModel.value;
                    cpu = signProcessor.value;
                    ram = signMemory.value;
                    capacity = signDrive.value;
                    price = signPrice.value;
                    price = price.replace("$", "");
                    comments = signComments.value;
                    sku = self.sku; // SKU is not currently being used on the sign, so we can just reference the prop.

                    if (signMsrp) {
                        msrp = signMsrp.value;
                        msrp = msrp.replace("$", "");
                    }

                    console.log(capacity);

                    // Add sign to database
                    database.collection("largesigns").add({
                        manufacturer: manufacturer,
                        model: model,
                        cpu: cpu,
                        ram: ram,
                        capacity: capacity,
                        price: price,
                        comments: comments,
                        sku: sku || 'N/A',
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
                    this.cpu = '';
                    this.ram = '';
                    this.capacity = '';
                    this.drive = '';
                    this.price = '';
                    this.msrp = '';
                    this.comments = '';
                    this.sku = '';
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

            database.collection('identifiers').orderBy('id').get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        let identifier = doc.data().id;
                        this.identifiers.push(identifier);
                    })
                });

            database.collection('processors').orderBy('generation').get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        let processor = doc.data().manufacturer + " " + doc.data().series + " " + doc.data().model + " (" + doc.data().generation + ")";
                        this.processors.push(processor);
                    })
                });

            database.collection('capacity').orderBy('capacity', "asc").get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        let capacity = doc.id.includes("tb") ? String(doc.data().capacity + "TB") : String(doc.data().capacity + "GB");
                        this.capacities.push(capacity);
                        this.memory.push(capacity);
                    })
                });

            database.collection('drives').orderBy('type').get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        let drive = doc.data().type;
                        this.drives.push(drive);
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
        width: 316px;
        height: 236px;
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