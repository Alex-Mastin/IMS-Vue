<template>
    <div id="print-queue" v-title="title">
        <modal></modal>
        <confirm-dialog></confirm-dialog>
        <div class="sign-page">
            <large-sign v-for="(sign, i) in largeSigns" :key="i"
                    :manufacturer="sign.manufacturer"
                    :model="sign.model"
                    :cpu="sign.cpu"
                    :memory="sign.ram"
                    :capacity="sign.capacity"
                    :drive="getDrive(sign.capacity)"
                    :msrp=Number(sign.msrp)
                    :price=Number(sign.price)
                    :comment="sign.comments"
                    :sku="sign.sku"
                    :removable="true"
            ></large-sign>
        </div>

    </div>
</template>

<script>
    import database from '@/components/firebaseInit.js'
    import LargeSign from "@/components/LargeSign.vue";
    import ConfirmDialog from "@/components/ConfirmDialog.vue";
    import Modal from '@/components/Modal.vue'

    export default {
        name: "LargePrintQueue",
        components: {
            LargeSign,
            ConfirmDialog,
            Modal
        },
        methods: {
            getDrive(drive) {
                if (drive.includes("HDD")) {
                    return "HDD";
                }
                else if (drive.includes("SSD")) {
                    return "SSD";
                }
                else if (drive.includes("SSHD")) {
                    return "SSHD";
                }
                else {
                    return "";
                }
            },
            clearQueue() {
                return Promise.all(
                    database.collection("largesigns").get()
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
                largeSigns: [],
                signCount: 0
            }
        },
        created() {
            let counter = 0;
            let self = this;

            database.collection('largesigns').onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    // console.log(change.type);
                    if (change.type === 'added') {
                        counter++;
                        let doc = change.doc.data();
                        let sign = {
                            manufacturer: doc.manufacturer,
                            model: doc.model,
                            cpu: doc.cpu,
                            ram: doc.ram,
                            capacity: doc.capacity,
                            comments: doc.comments,
                            price: doc.price,
                            sku: doc.sku,
                            msrp: doc.msrp,
                        };

                        console.log(doc.capacity);

                        this.largeSigns.push(sign);
                    }
                });
                self.signCount = snapshot.size;
            });
        },
        mounted() {
            let self = this;

            this.$root.$on('confirm', data => {
                this.clearQueue()
                    .then(() => {
                        setTimeout(function() {
                            self.showModal('All signs were successfully removed.', 'success');
                        }, 300);
                    }).catch((error) => {
                        setTimeout(function() {
                            if (!error.message.includes("object is not iterable")) {
                                console.error(error);
                                self.showModal('An error has occurred. Some signs were not removed.', 'error');
                            }
                            else {
                                setTimeout(function() {
                                    self.showModal('All signs were successfully removed.', 'success');
                                }, 300);
                            }

                        }, 300);
                })
            });

            window.onafterprint = () => {
                this.showConfirm('Would you like to clear this sign from the queue?', 'warning');
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
            /*padding-top: 0.81em;*/
            /*padding-left: 2.3em;*/
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

        ::-webkit-scrollbar-thumb {
            background-color: unset;
        }

    }
</style>