<template>
    <div id="sign">
        <div class="sign-preview">
            <div v-if="removable" class="sign-delete"></div>
            <div>
                <table>
                    <tbody>
                        <tr class="bottom-border">
                            <td class="dp-logo sign-logo"></td>
                            <td class="sign-cell">
                                <input id="sign-price" class="sign-price sign-value" :value="'$' + price" autocomplete="off">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="sign-cell">
                                <input id="sign-product" class="sign-product sign-cell sign-value" v-model="product" @input="updateMSRP" :created="updateMSRP()" autocomplete="off">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="sign-cell">
                                <input id="sign-capacity" class="sign-storage sign-cell sign-value" v-model="productCapacity" autocomplete="off" @input="updateMSRP">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" id="carrier-cell" class="sign-cell">
                                <input id="sign-carrier" class="sign-carrier sign-cell sign-value" @input="styleCarrier" v-model="carrier" autocomplete="off">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" id="comment-cell" :class="{'sign-cell': true, 'sign-comment': comment}">
                                <input
                                    id="sign-comment"
                                    :class="{'sign-cell': true, 'sign-value': true, 'sign-comment': comment}"
                                    v-model="comment"
                                    @input="highlightComment"
                                    autocomplete="off"
                                >
                            </td>
                        </tr>
                        <tr v-if="msrp">
                            <td colspan="1" class="sign-cell sign-msrp">
                                <input id="sign-msrp" class="sign-cell sign-value sign-msrp" :value="'MSRP: $' + msrp" disabled autocomplete="off">
                            </td>
                            <td colspan="1" class="sign-cell sign-sku">
                                <input id="sign-sku" class="sign-cell sign-value sign-sku inputSKU" style="margin-top: -3px;" v-model="sku" autocomplete="off">
                            </td>
                        </tr>
                        <tr v-else>
                            <td colspan="2" class="sign-cell sign-sku">
                                <input id="sign-sku" class="sign-cell sign-value sign-sku inputSKU" v-model="sku" autocomplete="off">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import database from '@/components/firebaseInit.js'

    export default {
        name: "sign",
        props: {
            manufacturer: {
                type: String,
                required: true,
            },
            model: {
                type: String,
                required: true,
            },
            carrier: {
                type: String,
                required: true,
            },
            capacity: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: false,
            },
            sku: {
                type: String,
                required: true,
            },
            removable: {
                type: Boolean,
                required: false
            }
        },
        data() {
            return {
                msrps: [],
                msrp: '',
                product: this.manufacturer + " " + this.model,
                productCapacity: this.capacity,
            }
        },
        methods: {
            highlightComment() {
                let comment = document.querySelector("#sign-comment").value;

                if (comment) {
                    document.getElementById("sign-comment").classList.add("sign-comment");
                    document.getElementById("comment-cell").classList.add("sign-comment");
                }

                else {
                    document.getElementById("sign-comment").classList.remove("sign-comment");
                    document.getElementById("comment-cell").classList.remove("sign-comment");
                }
            },
            styleCarrier() {
                let carrier = document.querySelector("#sign-carrier").value;

                if (carrier.includes('Unlocked')) {
                    document.getElementById("sign-carrier").classList.add("highlight-yellow");
                    document.getElementById("carrier-cell").classList.add("highlight-yellow");
                }

                else {
                    document.getElementById("sign-carrier").classList.remove("highlight-yellow");
                    document.getElementById("carrier-cell").classList.remove("highlight-yellow");
                }
            },
            updateMSRP() {
                for (let product of this.msrps) {
                    if (product.manufacturer + " " + product.model === this.product && product.capacity + 'GB' === this.productCapacity) {
                        this.msrp = product.msrp;
                        return;
                    }
                }
                this.msrp = '';
            },

        },
        created() {
            database.collection('msrp').orderBy('model').get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        let manufacturer = doc.data().manufacturer;
                        let model = doc.data().model;
                        let msrp = doc.data().msrp;
                        let capacity = doc.data().capacity;

                        this.msrps.push({
                            manufacturer: manufacturer,
                            model: model,
                            msrp: msrp,
                            capacity: capacity,
                        });
                    })
                });
        }
    }
</script>

<style scoped>
    table {
        border: none;
    }

    .sign-preview {
        height: 15em;
        width: 24.5em;
        background-color: #fff;
        border: 2px solid #ededed;
        max-height: 14.75em;
        zoom: 89%;
    }

    .dp-logo.sign-logo {
        background: url(https://www.devicepitstop.com/wp-content/themes/devicepitstop/less/../images/site-logo.png) no-repeat 0 0;
        height: 3.85em;
        width: 14em;
        background-size: 12em;
        background-position: 1em;
        display: table;
    }

    .bottom-border {
        border-bottom: 4px solid #8dc63f !important;
    }

    .sign-cell {
        text-align: center;
        padding: 5px 10px;
        border-bottom: none !important;
        font-family: 'Metropolis SemiBold', sans-serif;
        margin: auto;
    }

    input.sign-value {
        padding: 0;
        width: 100%;
    }

    input:disabled {
        background: white;
    }

    input:disabled:hover {
        color: #999;
        background: #f0f0f0;
        cursor: not-allowed;
    }

    .sign-value {
        line-height: 1.42857143;
        color: #231f20;
        display: block;
        border: none;
        transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    }

    .sign-price {
        font-size: 25px;
        font-family: "Metropolis Black" !important;
        border-bottom: none !important;
        text-align: right;
        width: 5em!important;
        float: right;
    }

    .sign-product {
        font-size: 18px;
        font-family: "Metropolis Bold" !important;
    }

    .sign-comment {
        color: #df6869 !important;
        background-color: yellow;
        text-transform: uppercase;
        font-family: 'Metropolis Bold';
        border-bottom: none !important;
    }

    .sign-msrp {
        text-align: left !important;
        font-size: 15px;
        position: relative;
        border-bottom: none !important;
        text-transform: uppercase;
        font-family: 'Metropolis Bold';
        width: 50%;
    }

    .sign-sku {
        text-align: right !important;
        font-size: 12px;
        position: relative;
        border-bottom: none !important;
        text-transform: uppercase;
    }

    .highlight-yellow {
        background-color: yellow;
    }

    .sign-delete:hover {
        background-color: rgba(255,0,0,0.55);
    }

    .sign-delete {
        width: 20px;
        height: 12px;
        position: absolute;
        left: 23.26em;
    }

    .sign-delete:hover::before {
        content: '\00d7';
        position: absolute;
        left: 0.27em;
        bottom: -0.45em;
        color: rgba(255,255,255,0.75);
        font-size: 1.2666666667em;
    }

</style>