<template>
    <div id="print-queue" v-title="title">
        <modal></modal>
        <confirm-dialog></confirm-dialog>
        <div class="sign-page">
            <div class="queue-left">
                <div v-for="(sign, i) in signsLeft" :key="i">
                    <sign
                            :manufacturer="sign.manufacturer"
                            :model="sign.model"
                            :carrier="sign.carrier"
                            :capacity="sign.capacity"
                            :price=Number(sign.price)
                            :comment="sign.comments"
                            :sku="sign.sku"
                            removable
                    ></sign>
                </div>
            </div>
            <div class="queue-right">
                <div v-for="(sign, i) in signsRight" :key="i">
                    <sign
                            :manufacturer="sign.manufacturer"
                            :model="sign.model"
                            :carrier="sign.carrier"
                            :capacity="sign.capacity"
                            :price=Number(sign.price)
                            :comment="sign.comments"
                            :sku="sign.sku"
                            removable
                    ></sign>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import database from '@/components/firebaseInit.js'
    import Sign from "../components/Sign";
    import ConfirmDialog from "@/components/ConfirmDialog.vue";
    import Modal from '@/components/Modal.vue'

    export default {
        name: "PrintQueue",
        components: {
            Sign,
            ConfirmDialog,
            Modal
        },
        methods: {
            clearQueue() {
                return Promise.all(
                    database.collection("signs").get()
                        .then(querySnapshot => {
                            querySnapshot.forEach((doc) => {
                                doc.ref.delete().then(() => {
                                    console.log("Document successfully deleted!");
                                }).catch((error) => {
                                    console.error("Error removing document: ", error);
                                })
                            })
                        })
                )
            },
            showConfirm(message, type) {
                this.$root.$emit('openConfirm', {
                    closed: false,
                    text: message,
                    type: type,
                    dimScreen: true,
                });
            },
            showModal(message, type) {
                this.$root.$emit('openModal', {
                    closed: false,
                    text: message,
                    type: type
                })
            },
        },
        data() {
            return {
                title: 'Print Queue | Device Pitstop - Maple Grove',
                signsLeft: [],
                signsRight: [],
                signCount: 0
            }
        },
        created() {
            let counter = 0;
            let self = this;

            database.collection('signs').onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    // console.log(change.type);
                    if (change.type === 'added') {
                        counter++;
                        let doc = change.doc.data();
                        let sign = {
                            manufacturer: doc.manufacturer,
                            model: doc.model,
                            capacity: doc.capacity,
                            carrier: doc.carrier,
                            comments: doc.comments,
                            price: doc.price,
                            sku: doc.sku,
                            msrp: doc.msrp,
                        };

                        if (counter % 2 === 0) {
                            this.signsRight.push(sign);
                        }
                        else {
                            this.signsLeft.push(sign);
                        }
                    }
                });
                self.signCount = snapshot.size;
            });
        },
        mounted() {
            let self = this;

            this.$root.$on('confirm', data => {
                let toDelete = document.querySelector(".to-delete");
                if (!toDelete) {
                    this.clearQueue()
                        .then(() => {
                            setTimeout(function() {
                                self.showModal('All signs were successfully removed.', 'success');
                            }, 300);
                        }).catch((error) => {
                            setTimeout(function() {
                                console.error(error);
                                self.showModal('An error has occurred. Some signs were not removed.', 'error');
                            }, 300);
                        })
                }
            });

            window.onafterprint = () => {
                this.showConfirm('Would you like to clear the signs in the queue?', 'warning');
            };
        }
    }
</script>

<style scoped>
    .queue-left {
        display: table;
        float: left;
    }

    .queue-right {
        display: table;
        position: relative;
        right: 2px;
    }

    @media print {
        html {
            overflow: hidden!important;
        }

        #print-queue {
            padding-top: 0.81em;
            padding-left: 2.3em;
        }

        .sign-preview *{
            visibility: visible!important;
            -webkit-print-color-adjust: exact;
            page-break-before: always;
            page-break-inside: avoid;
        }

        .container {
            padding: 32px;
            width: 100%;
        }

        .sign-delete {
            display: none;
        }

        tr:not(#comment-cell):hover {
            background-color: #fff;
        }

    }
</style>