<template>
    <div id="column" v-title="title">
        <div class="user-profile">
            <div class="name font-sb">Technicians</div>
            <div class="row">
                <ul class="nav nav-tabs">
                    <li class="active">
                        <a class="active">
                            Overview
                        </a>
                    </li>
                </ul>
            </div>
            <div class="details">
                <div class="user-details">
                    <div class="panel-container">
                        <div class="panel">
                            <div class="panel-body">
                                <div class="font-md font-regular">Device Pitstop of Maple Grove</div>
                                <hr>
                                <div class="panel-row">
                                    <div class="width-166">

                                    </div>
                                    <div class="width-833">
                                        <div class="font-sb">
                                            {{ name }}
                                        </div>
                                    </div>
                                </div>
                                <div class="panel-row panel-details">
                                    <div class="panel-heading">
                                        <div class="uppercase font-light">
                                            Other Details
                                        </div>
                                    </div>
                                    <div>
                                        <div class="panel-group">
                                            <div class="panel-group-row">
                                                <div class="font-light text-muted width-416">
                                                    Total Store Stocks
                                                </div>
                                                <div class="width-583" :class="{ 'text-orange': totalStoreStocks > 0, 'text-draft': totalStoreStocks === 0 }">
                                                    {{ totalStoreStocks }}
                                                </div>
                                            </div>
                                            <div class="panel-group-row">
                                                <div class="font-light text-muted width-416">
                                                    Total Buys
                                                </div>
                                                <div class="width-583" :class="{ 'text-orange': totalBuys > 0, 'text-draft': totalBuys === 0 }">
                                                    {{ totalBuys }}
                                                </div>
                                            </div>
                                            <div class="panel-group-row">
                                                <div class="font-light text-muted width-416">
                                                    Total Sales
                                                </div>
                                                <div class="width-583" :class="{ 'text-orange': totalSales > 0, 'text-draft': totalSales === 0 }">
                                                    {{ totalSales }}
                                                </div>
                                            </div>
                                            <div class="panel-group-row">
                                                <div class="font-light text-muted width-416">
                                                    Total Returns
                                                </div>
                                                <div class="width-583" :class="{ 'text-orange': totalReturns > 0, 'text-draft': totalReturns === 0 }">
                                                    {{ totalReturns }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="user-stats">
                    <div class="user" v-for="user in users">
                        <a @click="viewUser(user.firstName, user.lastName)">
                            <div class="user-tile">
                                <div class="avatar">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="lg"><path d="M405.8 355.3s-79-22.6-87.8-52.8c-8.8-30.2 26.3-86.7 26.3-86.7s52.7-52 17.6-77.8c0 0 35.1-138-105.4-138-141 0-105.7 137.8-105.7 137.8-35.3 25.8 17.6 77.5 17.6 77.5s35.2 56 26.4 86.1c-8.8 30.2-88.1 53.9-88.1 53.9C-16.8 363.9.9 512.5.9 512.5h510.3c-.1 0 17.5-148.6-105.4-157.2z"></path></svg>
                                    <span class="inactive" v-if="user.active === false">×</span>
                                </div>
                            </div>
                        </a>
                        <span class="user-name text-draft">{{ user.firstName }} {{ user.lastName }}</span>
                    </div>
                    <div class="user">
                        <a @click="routeTo('/technicians/new')">
                            <div class="user-tile">
                                <div class="avatar">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 42 42" class="lg" xml:space="preserve"><polygon points="42,20 22,20 22,0 20,0 20,20 0,20 0,22 20,22 20,42 22,42 22,22 42,22"></polygon></svg>
                                </div>
                            </div>
                        </a>
                        <span class="user-name text-draft">New Technician</span>
                    </div>
                    <div class="user">
                        <a @click="routeTo('/technicians/edit')">
                            <div class="user-tile">
                                <div class="avatar">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 55.25 55.25" class="lg" xml:space="preserve"><path d="M52.618,2.631c-3.51-3.508-9.219-3.508-12.729,0L3.827,38.693C3.81,38.71,3.8,38.731,3.785,38.749 c-0.021,0.024-0.039,0.05-0.058,0.076c-0.053,0.074-0.094,0.153-0.125,0.239c-0.009,0.026-0.022,0.049-0.029,0.075 c-0.003,0.01-0.009,0.02-0.012,0.03l-3.535,14.85c-0.016,0.067-0.02,0.135-0.022,0.202C0.004,54.234,0,54.246,0,54.259 c0.001,0.114,0.026,0.225,0.065,0.332c0.009,0.025,0.019,0.047,0.03,0.071c0.049,0.107,0.11,0.21,0.196,0.296 c0.095,0.095,0.207,0.168,0.328,0.218c0.121,0.05,0.25,0.075,0.379,0.075c0.077,0,0.155-0.009,0.231-0.027l14.85-3.535 c0.027-0.006,0.051-0.021,0.077-0.03c0.034-0.011,0.066-0.024,0.099-0.039c0.072-0.033,0.139-0.074,0.201-0.123 c0.024-0.019,0.049-0.033,0.072-0.054c0.008-0.008,0.018-0.012,0.026-0.02l36.063-36.063C56.127,11.85,56.127,6.14,52.618,2.631z M51.204,4.045c2.488,2.489,2.7,6.397,0.65,9.137l-9.787-9.787C44.808,1.345,48.716,1.557,51.204,4.045z M46.254,18.895l-9.9-9.9 l1.414-1.414l9.9,9.9L46.254,18.895z M4.961,50.288c-0.391-0.391-1.023-0.391-1.414,0L2.79,51.045l2.554-10.728l4.422-0.491 l-0.569,5.122c-0.004,0.038,0.01,0.073,0.01,0.11c0,0.038-0.014,0.072-0.01,0.11c0.004,0.033,0.021,0.06,0.028,0.092 c0.012,0.058,0.029,0.111,0.05,0.165c0.026,0.065,0.057,0.124,0.095,0.181c0.031,0.046,0.062,0.087,0.1,0.127 c0.048,0.051,0.1,0.094,0.157,0.134c0.045,0.031,0.088,0.06,0.138,0.084C9.831,45.982,9.9,46,9.972,46.017 c0.038,0.009,0.069,0.03,0.108,0.035c0.036,0.004,0.072,0.006,0.109,0.006c0,0,0.001,0,0.001,0c0,0,0.001,0,0.001,0h0.001 c0,0,0.001,0,0.001,0c0.036,0,0.073-0.002,0.109-0.006l5.122-0.569l-0.491,4.422L4.204,52.459l0.757-0.757 C5.351,51.312,5.351,50.679,4.961,50.288z M17.511,44.809L39.889,22.43c0.391-0.391,0.391-1.023,0-1.414s-1.023-0.391-1.414,0 L16.097,43.395l-4.773,0.53l0.53-4.773l22.38-22.378c0.391-0.391,0.391-1.023,0-1.414s-1.023-0.391-1.414,0L10.44,37.738 l-3.183,0.354L34.94,10.409l9.9,9.9L17.157,47.992L17.511,44.809z M49.082,16.067l-9.9-9.9l1.415-1.415l9.9,9.9L49.082,16.067z"/></svg>
                                </div>
                            </div>
                        </a>
                        <span class="user-name text-draft">Edit Technician</span>
                    </div>
                    <div class="width-100">
                        <div class="productivity">
                            <div class="productivity-item" v-for="(unit, i) in sortedUnits" :key="i">
                                <div class="time">
                                    <span class="small">{{ unit.date.toDate().toLocaleDateString() }}</span>
                                    <br>
                                    <span class="small">{{ unit.time }}</span>
                                </div>
                                <div class="item-details">
                                    <div class="arrow"></div>
                                    <p>{{ unit.unitType }} created</p>
                                    <div class="text-muted">
                                        {{ unit.unitType }} created for {{ unit.manufacturer }} {{ unit.model }}
                                        <span class="font-medium">by {{ name }}</span>
                                        -
                                        <a class="small" @click="viewUnit(unit.unitType, unit.sku)">
                                            View Details
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import database from '@/components/firebaseInit.js'

    export default {
        name: "Technicians",
        data() {
            return {
                name: '',
                storeStocks: 0,
                buys: 0,
                sales: 0,
                totalUnits: 0,
                totalStoreStocks: 0,
                totalBuys: 0,
                totalSales: 0,
                totalReturns: 0,
                title: 'Technicians | Device Pitstop - Maple Grove',
                units: [],
                currentSort: 'time',
                sortDirection: 'desc',
                users: []
            }
        },
        methods: {
            viewUser(firstName, lastName) {
                this.routeTo("/user/?fneq=" + firstName + "&lneq=" + lastName);
            },
            viewUnit(type, sku) {
                if (type === "Store Stock") {
                    this.routeTo("/storestock/edit/" + sku);
                }

                else if (type === "Buy" || type === "Sale") {
                    let epoch = '';

                    database.collection("buysale").where("sku", "==", sku).get()
                        .then((snapshot) => {
                            epoch = snapshot.docs[0].id;
                            this.routeTo("/buysale/edit/" + epoch);
                        }).catch((error) => {
                        console.error("An error occurred: " + error);
                    });
                }
            },
            routeTo(route) {
                this.$router.push(route);
            },
            getDate() {
                let today = new Date();
                let day = today.getDate();
                let month = today.getMonth() + 1;
                let year = today.getFullYear();

                return month + "/" + day + "/" + year;
            },
            getFormattedDate() {
                let today = new Date();
                let day = today.getDate();
                let month = today.getMonth() + 1;
                let year = today.getFullYear();

                return month + "-" + day + "-" + year;
            },
            viewStat(type) {
                let date = this.getFormattedDate();

                switch (type) {
                    case 'Store Stock':
                        this.$router.push('/advanced-search/storestock/?fneq=' + this.name.split(" ")[0] + '&lneq=' + this.name.split(" ")[1] + '&deq=' + date);
                        break;
                    case 'Buy':
                    case 'Sale':
                        this.$router.push('/advanced-search/buysale/?fneq=' + this.name.split(" ")[0] + '&lneq=' + this.name.split(" ")[1] + '&deq=' + date);
                        break;
                }
            }
        },
        created() {
            let date = new Date(this.getDate());
            let limit = 0;

            // database.collection("devices").where("firstName", "==", this.name.split(" ")[0]).where("lastName", "==", this.name.split(" ")[1]).where("date", "==", date).onSnapshot(snapshot => {
            //     this.totalUnits -= this.storeStocks; // this prevents a bug where if a store stock is created while the user page is loaded, the count gets messed up
            //     this.storeStocks = snapshot.size;
            //     this.totalUnits += this.storeStocks;
            //
            //     snapshot.forEach(doc => {
            //         let unit = doc.data();
            //         unit.unitType = 'Store Stock';
            //
            //         if (typeof unit.time === "object") { // this prevents a bug where if the time is represented as a timestamp instead of just a time (ex. 9:30:05 AM) an error will occur
            //             unit.time = unit.time.toDate().toLocaleTimeString();
            //         }
            //
            //         this.units.push(unit);
            //     })
            // });
            //
            // database.collection("buysale").where("firstName", "==", this.name.split(" ")[0]).where("lastName", "==", this.name.split(" ")[1]).where("date", "==", date).where("buy", "==", true).onSnapshot(snapshot => {
            //     this.totalUnits -= this.buys;
            //     this.buys = snapshot.size;
            //     this.totalUnits += this.buys;
            //
            //     snapshot.forEach(doc => {
            //         let unit = doc.data();
            //         unit.unitType = 'Buy';
            //
            //         if (typeof unit.time === "object") {
            //             unit.time = unit.time.toDate().toLocaleTimeString();
            //         }
            //
            //         this.units.push(unit);
            //     })
            // });
            //
            // database.collection("buysale").where("firstName", "==", this.name.split(" ")[0]).where("lastName", "==", this.name.split(" ")[1]).where("date", "==", date).where("sale", "==", true).onSnapshot(snapshot => {
            //     this.totalUnits -= this.sales;
            //     this.sales = snapshot.size;
            //     this.totalUnits += this.sales;
            //
            //     snapshot.forEach(doc => {
            //         let unit = doc.data();
            //         unit.unitType = 'Sale';
            //
            //         if (typeof unit.time === "object") {
            //             unit.time = unit.time.toDate().toLocaleTimeString();
            //         }
            //
            //         this.units.push(unit);
            //     });
            //
            //     switch (this.units.length) {
            //         case 0:
            //             limit = 5;
            //             break;
            //         case 1:
            //             limit = 4;
            //             break;
            //         case 2:
            //             limit = 3;
            //             break;
            //         case 3:
            //             limit = 2;
            //             break;
            //         case 4:
            //             limit = 1;
            //             break;
            //     }
            //
            //     if (this.units.length < 5) {
            //         database.collection("devices").where("firstName", "==", this.name.split(" ")[0]).where("lastName", "==", this.name.split(" ")[1]).where("date", "<", date).orderBy("date", "desc").limit(limit).onSnapshot(snapshot => {
            //             // this.totalUnits -= this.storeStocks; // this prevents a bug where if a store stock is created while the user page is loaded, the count gets messed up
            //             // this.storeStocks = snapshot.size;
            //             // this.totalUnits += this.storeStocks;
            //
            //             snapshot.forEach(doc => {
            //                 let unit = doc.data();
            //                 unit.unitType = 'Store Stock';
            //
            //                 if (typeof unit.time === "object") { // this prevents a bug where if the time is represented as a timestamp instead of just a time (ex. 9:30:05 AM) an error will occur
            //                     unit.time = unit.time.toDate().toLocaleTimeString();
            //                 }
            //
            //                 this.units.push(unit);
            //             })
            //         });
            //     }
            // });


            database.collection("technicians").orderBy("firstName", "asc").onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        let doc = change.doc.data();
                        doc.id = change.doc.id;

                        this.users.push(doc)
                    }
                    else if (change.type === 'removed'){
                        let doc = change.doc.data();
                        doc.id = change.doc.id;

                        this.users = this.users.filter(e => e!== doc)
                    }
                })
            })

            // ******************
            // Total Store Stocks
            // ******************
            database.collection("devices").onSnapshot(snapshot => {
                this.totalStoreStocks = snapshot.size;
            });

            // **********
            // Total Buys
            // **********

            database.collection("buysale").where("buy", "==", true).onSnapshot(snapshot => {
                this.totalBuys = snapshot.size;
            });

            // ***********
            // Total Sales
            // ***********

            database.collection("buysale").where("sale", "==", true).onSnapshot(snapshot => {
                this.totalSales = snapshot.size;
            });

            // *************
            // Total Returns
            // *************

            database.collection("returns").onSnapshot(snapshot => {
                this.totalReturns = snapshot.size;
            });
        },
        computed: {
            sortedUnits() {
                return this.units.sort((a, b) => {
                    let modifier = 1;
                    if (this.sortDirection === 'desc') modifier = -1;

                    if (this.currentSort === "time") {
                        let dateA = new Date();
                        let dateB = new Date();
                        let timeA = a[this.currentSort].split(":");
                        let timeB = b[this.currentSort].split(":");

                        // Remove AM/PM and convert PM to 24-hour time
                        if (timeA[2].includes("AM")) {
                            timeA[2] = timeA[2].replace(" AM", "");

                            if (timeA[0] === "12") {
                                timeA[0] = Number(timeA[0]) - 12;
                            }
                        }
                        if (timeA[2].includes("PM")) {
                            timeA[2] = timeA[2].replace(" PM", "");
                            timeA[0] = Number(timeA[0]) + 12;
                        }

                        if (timeB[2].includes("AM")) {
                            timeB[2] = timeB[2].replace(" AM", "");

                            if (timeB[0] === "12") {
                                timeB[0] = Number(timeB[0]) - 12;
                            }
                        }
                        if (timeB[2].includes("PM")) {
                            timeB[2] = timeB[2].replace(" PM", "");
                            timeB[0] = Number(timeB[0]) + 12;
                        }

                        // Updates date object with time from each string
                        dateA.setHours(timeA[0], timeA[1], timeA[2]);
                        dateB.setHours(timeB[0], timeB[1], timeB[2]);

                        if (dateA < dateB){
                            return -1 * modifier;
                        }
                        if (dateA > dateB){
                            return 1 * modifier;
                        }
                    }

                    else {
                        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                    }


                    return 0;
                });
            }
        },
    }
</script>

<style scoped>
    #column {
        top: 3.1rem;
        left: 12.5rem;
        position: relative;
        max-width: 1650px;
        /*z-index: 0;*/
    }

    .user-profile {
        padding: 0 20px;
    }

    .name {
        font-size: 22px;
        margin-bottom: 5px;
        margin-top: 14px;
    }

    .row {
        padding-top: 54px;
        border-bottom: 1px solid #ededed;
        margin-left: -20px;
        margin-right: -15px;
    }

    .nav {
        margin-bottom: 0;
        padding-left: 0;
        list-style: none;
    }

    .nav-tabs {
        border: 0;
    }

    .nav-tabs li {
        float: left;
        margin-top: -44px;
    }

    .nav li a {
        padding: 10px 15px;
    }

    .nav li, .nav li a {
        display: block;
        position: relative;
    }

    .nav-tabs li.active a, .nav-tabs li.active a:focus, .nav-tabs li.active a:hover {
        padding: 10px 0;
        margin-left: 20px;
        margin-right: 15px;
        border-bottom: 3px solid #2fa3e6;
        border-left: 0;
        border-top: 0;
        border-right: 0;
        border-radius: 0;
    }

    .nav-tabs li.active a, .nav-tabs li.active a:focus, .nav-tabs li.active a:hover {
        color: #555;
        cursor: default;
    }

    .details {
        margin-left: -20px;
        margin-right: -20px;
        padding-top: 0;
        display: flex;
        flex-direction: row;
        align-items: stretch;
        min-height: 100%;
    }

    .user-details {
        width: 35%;
        background-color: #f9f9f9;
        min-height: 600px;
    }

    .user-stats {
        margin-left: 5%;
        max-width: 55%;
        padding-top: 30px;
        display: flex;
        flex-wrap: wrap;
        align-content: baseline;
    }

    .panel-container {
        padding: 12px 12px 684px;
        word-wrap: break-word;
    }

    .panel-body {
        padding: 15px;
        padding-bottom: 30px;
    }

    .panel-row {
        padding-bottom: 15px;
        margin-left: -15px;
        margin-right: -15px;
    }

    table {
        width: 100%;
        max-width: 100%;
    }

    tr:hover {
        background-color: unset!important;
    }

    .stats-table {
        table-layout: fixed;
        margin-bottom: 0;
        border: 1px solid #ebebeb;
        padding: 15px 35px 10px;
    }

    .stat-section {
        width: 46.5%;
        vertical-align: middle;
    }

    .stats-table tbody tr:first-child td {
        border-top: 1px solid #ebebeb;
    }

    .stats-table tbody tr td:last-child {
        border-left: 1px solid #ecf7f5;
        padding: 15px 15px 5px;
    }

    .stats-table tbody tr td {
        border-top: 1px solid #ecf7f5;
        padding: 15px 35px 10px;
    }

    .text-orange {
        color: #F26C4F;
    }

    .text-void {
        color: #666;
    }

    .text-draft {
        color: #999;
    }

    .small {
        font-size: 86%;
    }

    td a {
        margin-bottom: 5px;
    }

    hr {
        margin-top: 10px;
        margin-bottom: 21px;
        border: 0;
        border-top: 1px solid #eee;
        box-sizing: content-box;
        height: 0;
    }

    .width-166 {
        width: 16.66666667%;
        position: relative;
        padding-left: 15px;
        float: left;
    }

    .width-416 {
        width: 41.66666667%;
    }

    .width-583 {
        padding-left: 15px;
        padding-right: 15px;
        width: 58.33333333%;
    }


    .width-833 {
        width: 83.33333333%;
    }

    .width-166, .width-833 {

    }

    .avatar {
        padding: 25px 25px 25px 22.5px;
    }

    .lg {
        height: 75px;
        width: 75px;
        position: relative;
        fill: #e0e0e0;
    }

    .inactive {
        font-size: 48px;
        position: relative;
        left: 50px;
        top: -40px;
        color: #a0a0a0;
    }

    .panel-heading {
        padding: 10px 0 5px;
        border-bottom: 1px solid #eee;
    }

    .panel-details {
        margin-top: 50px;
    }

    .panel-group {
        padding: 15px;
    }

    .panel-group-row {
        display: flex;
        padding-bottom: 15px;
    }

    .productivity {
        margin: 50px 15px 50px 85px;
        border-left: 1px solid #277ad8;
    }

    .productivity .productivity-item:first-child {
        padding-top: 0;
    }

    .productivity .productivity-item:before {
        content: ' ';
        position: absolute;
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        top: 30px;
        left: -20px;
        background-color: #277ad8;
    }

    .productivity .item-details .arrow {
        top: 15px;
        left: -11px;
        position: absolute;
        width: 0;
        height: 0;
        border-color: transparent #f3f3f3 transparent transparent;
        border-style: solid;
        border-width: 11px 11px 11px 0;
    }

    .productivity .item-details .arrow:after {
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent #fff transparent transparent;
        border-style: solid;
        border-width: 10px 10px 10px 0;
        content: " ";
        left: 1px;
        bottom: -10px;
    }

    .productivity .item-details {
        padding: 10px 20px;
        position: relative;
        margin-bottom: 10px;
        margin-left: 25px;
        border: 1px solid #efefef;
        background-color: #fff;
        border-radius: 6px;
    }

    .productivity-item {
        padding: 10px 0;
        position: relative;
        margin-left: 15px;
    }

    .productivity .time {
        left: -120px;
        position: absolute;
        top: 25px;
        width: 90px;
        text-align: right;
    }

    .user {
        padding: 0 25px 30px 25px;
    }

    .user-tile {
        border: 1px solid #ececec;
        width: 125px;
        height: 125px;
    }

    .user-tile:hover {
        border-color: #d9d9d9;
    }

    .user-tile:hover svg {
        fill: #d9d9d9;
    }

    .user-tile:hover .inactive {
        color: #919191;
    }

    .user-name {
        display: table;
        margin: auto;
        padding-top: 5px;
    }
</style>