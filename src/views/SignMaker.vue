<template>
    <div id="sign-maker" v-title="title">
        <div class="column width-884">
            <div class="sign-maker-column">
                <h3 class="font-xl">Start Managing Your Store Stock!</h3>
                <p class="text-muted">Create, customize, and save your signs.</p>
                <div class="btn-container">
                    <btn primary content="Create New Sign" @click.native="toNewSign"></btn>
                    <btn content="View Signs" @click.native="toQueue"></btn>
                </div>
                <br>
                <h4 class="btn-link"><a @click="emptyQueue()">Remove Pending Signs to be Printed</a></h4>
            </div>
        </div>
    </div>
</template>

<script>
    import Btn from '@/components/Btn.vue'
    import database from '@/components/firebaseInit.js'

    export default {
        name: "SignMaker",
        components: {
            Btn,

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
            emptyQueue() {
                for (let id of this.signIds) {
                    database.collection("signs").doc(id).delete().then(function() {
                        console.log("Document successfully deleted!");
                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
                }

            }
        },
        created() {
            database.collection("signs").get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        this.signIds.push(doc.id);
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
        padding: 10px 24px 10px 23px;
    }

    h3 {
        margin-bottom: 20px;
    }
</style>