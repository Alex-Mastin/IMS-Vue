<template>
    <div class="inventory-panel">
        <a class="font-regular font-sm uppercase text-void">{{ label }}</a>
        <label class="font-xl text-normal right inv-container">
            <a class="font-regular">{{ quantity }}</a>
        </label>
    </div>
</template>

<script>
    import database from '@/components/firebaseInit.js'

    export default {
        name: "inventory-panel",
        props: {
            label: String,
            content: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                quantity: 0
            }
        },
        methods: {
            getFullDate() {
                let date = new Date();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                let year = date.getFullYear();

                return month + "/" + day + "/" + year;
            },
        },
        created() {
            if (this.content === 'new') {
                database.collection('devices').where("date", "==", new Date(this.getFullDate())).onSnapshot(snapshot => {
                    this.quantity = snapshot.size;
                });
            }

            else if (this.content === 'ready') {
                database.collection('devices').where("ready", "==", true).onSnapshot(snapshot => {

                    if (snapshot.size >= 100) {
                        let batch = database.batch();

                        snapshot.docs.forEach(doc => {
                            let docRef = database.collection('devices').doc(doc.id);
                            batch.update(docRef, {'ready': false});
                        });

                        batch.commit()
                            .then(() => {
                                console.log("There were 100 or more products marked as ready! Time to clean it up!")
                            }).catch((error) => {
                                console.error("An error occurred: " + error);
                        });
                    }

                    this.quantity = snapshot.size;
                });
            }
        }
    }
</script>

<style scoped>
    a {
        color: #222;
    }

    .inventory-panel {
        border: 1px solid #DAE1E4;
        border-radius: 7px;
        background-color: #fff;
        user-select: none;
        margin-bottom: 15px;
        padding: 15px 18px 9px;
        height: 25px;
    }

    .inventory-panel:hover {
        border: 1px solid #41A0D9 !important;
        cursor: pointer;
    }

    .inv-container {
        max-width: 35%;
        min-width: 15%;
        margin-top: -8px;
        border-left: 1px solid #EDF1F2;
        text-align: right;
    }
</style>