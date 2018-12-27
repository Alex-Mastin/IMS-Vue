<template>
    <div id="print-queue" v-title="title">
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
</template>

<script>
    import database from '@/components/firebaseInit.js'
    import Sign from "../components/Sign";
    export default {
        name: "PrintQueue",
        components: {Sign},
        data() {
            return {
                title: 'Print Queue | Device Pitstop - Maple Grove',
                signsLeft: [],
                signsRight: []
            }
        },
        created() {
            let counter = 0;
            database.collection("signs").get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        counter++;
                        let sign = {
                            manufacturer: doc.data().manufacturer,
                            model: doc.data().model,
                            capacity: doc.data().capacity,
                            carrier: doc.data().carrier,
                            comments: doc.data().comments,
                            price: doc.data().price,
                            sku: doc.data().sku,
                            msrp: doc.data().msrp,
                        };

                        if (counter % 2 === 0) {
                            this.signsRight.push(sign);
                        }
                        else {
                            this.signsLeft.push(sign);
                        }

                    })
                });
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
</style>