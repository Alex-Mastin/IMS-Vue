<template>
    <div id="sign-maker" v-title="title">
        <modal></modal>
        <confirm-dialog></confirm-dialog>
        <div class="column width-884">
            <div class="sign-maker-column">
                <h3 class="font-xl">Start Managing Your Store Stock!</h3>
                <p class="text-muted">Create, customize, and save your signs.</p>
                <div class="btn-container">
                    <btn primary content="Create New Sign" @click.native="toNewSign" large></btn>
                    <btn content="View Signs" @click.native="toQueue" large></btn>
                </div>
                <br>
                <h4 class="btn-link"><a @click="showConfirm()">Remove Pending Signs to be Printed</a></h4>
            </div>
        </div>
    </div>
</template>

<script>
    import Btn from '@/components/Btn.vue'
    import database from '@/components/firebaseInit.js'
    import ConfirmDialog from '@/components/ConfirmDialog.vue';
    import Modal from '@/components/Modal.vue';

    export default {
        name: "SignMaker",
        components: {
            ConfirmDialog,
            Btn,
            Modal,

        },
        data() {
            return {
                title: 'Sign Maker | Device Pitstop - Maple Grove',
                signIds: [],
            }
        },
        methods: {
            toNewSign() {
                this.$router.push('/signmaker/new');
            },
            toQueue() {
                let routeData = this.$router.resolve({name: 'Print Queue'});
                window.open(routeData.href, '_blank');
            },
            showConfirm() {
                this.$root.$emit('openConfirm', {
                    closed: false,
                    text: 'Are you sure you want to delete all signs?',
                    type: 'warning',
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
            emptyQueue() {
                return Promise.all(
                    this.signIds.map(id => {
                        database.collection("signs").doc(id).delete();
                    })
                )
            }
        },
        created() {
            database.collection("signs").get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        this.signIds.push(doc.id);
                    })
                });
        },
        mounted() {
            this.$root.$on('confirm', () => {
                let self = this;

                this.emptyQueue()
                    .then(() => {
                        setTimeout(function() {
                            self.showModal('All signs were successfully removed.', 'success');
                        }, 300);
                    }).catch(() => {
                        setTimeout(function() {
                            self.showModal('An error has occurred. Some signs were not removed.', 'error');
                        }, 300);
                    })
            });
        }
    }
</script>

<style scoped>
    .sign-maker-column {
        margin: auto;
        text-align: center;
        top: 79px;
        position: relative;
        padding: 4% 10%;
    }

    .btn-container {
        margin-top: 25px;
    }

    .btn-link {
        margin-top: 0px;
        margin-bottom: 10.5px;
    }

    .btn:nth-child(2) {
        margin-left: 4px;
    }

    h3 {
        margin-bottom: 20px;
    }
</style>