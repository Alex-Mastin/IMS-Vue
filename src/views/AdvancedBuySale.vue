<template>
    <div id="buysale" v-title="title">
        <confirm-dialog></confirm-dialog>
        <modal></modal>
        <div id="column" class="width-884">
            <div id="column-header" class="wide">
                <div id="action-row">
                    <div class="btn-toolbar-right">
                        <btn primary small add content="New" @click.native="routeTo('/buysale/new')"></btn>
                    </div>
                    <div class="font-xl">
                        Results for {{ search }}
                    </div>
                </div>
            </div>
            <div id="column-content">
                <div id="column-container">
                    <div class="width-100">
                        <div id="buys-column" class="transaction-column">
                            <div class="transaction-header arrow-right off-blue">
                                <span id="title-buys" class="font-md text-normal font-regular" v-if="selectedBuys.length === 0">Buys</span>
                                <div class="actions" v-else>
                                    <input class="selectAll-sales btn-spacer" type="checkbox" @click="selectAll('buys')" :checked="buysChecked()">
                                    <button class="btn btn-transparent btn-small no-padding" @click="confirmDelete('buys')">
                                        <svg class="svg-18" x="0px" y="0px" width="774.266px" height="774.266px" viewBox="0 0 774.266 774.266"><g><g><path d="M640.35,91.169H536.971V23.991C536.971,10.469,526.064,0,512.543,0c-1.312,0-2.187,0.438-2.614,0.875 C509.491,0.438,508.616,0,508.179,0H265.212h-1.74h-1.75c-13.521,0-23.99,10.469-23.99,23.991v67.179H133.916 c-29.667,0-52.783,23.116-52.783,52.783v38.387v47.981h45.803v491.6c0,29.668,22.679,52.346,52.346,52.346h415.703 c29.667,0,52.782-22.678,52.782-52.346v-491.6h45.366v-47.981v-38.387C693.133,114.286,670.008,91.169,640.35,91.169z M285.713,47.981h202.84v43.188h-202.84V47.981z M599.349,721.922c0,3.061-1.312,4.363-4.364,4.363H179.282 c-3.052,0-4.364-1.303-4.364-4.363V230.32h424.431V721.922z M644.715,182.339H129.551v-38.387c0-3.053,1.312-4.802,4.364-4.802 H640.35c3.053,0,4.365,1.749,4.365,4.802V182.339z"></path> <rect x="475.031" y="286.593" width="48.418" height="396.942"></rect> <rect x="363.361" y="286.593" width="48.418" height="396.942"></rect><rect x="251.69" y="286.593" width="48.418" height="396.942"></rect></g></g></svg>
                                    </button>
                                    <button class="fill-normal right btn btn-transparent btn-small return no-padding" @click="resetColumn('buys')">
                                        <svg class="text-top" width="512" height="512" viewBox="0 0 512 512"><path d="M466.745 0L256 210.745 45.255 0 0 45.254 210.745 256 0 466.745 45.255 512 256 301.255 466.745 512 512 466.745 301.255 256 512 45.254z"></path></svg>
                                    </button>
                                </div>
                            </div>
                            <div id="buys" class="transaction-column-content">
                                <div class="transaction-list-item" v-for="buy in buys">
                                    <div class="width-10">
                                        <div>
                                            <input type="checkbox" @click="selectBuy($event, buy.id)">
                                        </div>
                                    </div>
                                    <div class="width-90">
                                        <div class="transaction-product">
                                            <span class="font-medium">{{ buy.manufacturer }} {{ buy.model }}</span>
                                        </div>
                                        <div class="transaction-technician">
                                            <span class="block">
                                                <a class="no-select">
                                                    {{ buy.firstName }} {{ buy.lastName }}
                                                </a>
                                            </span>
                                        </div>
                                        <div class="transaction-sku" v-if="buy.sku">
                                            <span class="block text-muted font-light no-select">
                                                {{ buy.sku }}
                                            </span>
                                        </div>
                                        <div class="right">
                                            <div>
                                                <button type="button" class="edit-icon" @click="routeTo('/buysale/edit/' + buy.id)">
                                                    <svg x="0px" y="0px" width="528.899px" height="528.899px" viewBox="0 0 528.899 528.899"><g><path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981 c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611 C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069 L27.473,390.597L0.3,512.69z"></path></g></svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="transaction-date">
                                            <label class="text-muted font-light no-select">
                                                {{ buy.date }}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="transaction-list-item-empty text-center text-muted" v-if="buys.length === 0">
                                    <label>No Records Found</label>
                                </div>
                            </div>
                        </div>
                        <div id="sales-column" class="transaction-column">
                            <div class="transaction-header arrow-right off-red">
                                <span id="title-sales" class="font-md text-normal font-regular" v-if="selectedSales.length === 0">Sales</span>
                                <div class="actions" v-else>
                                    <input class="selectAll-sales btn-spacer" type="checkbox" @click="selectAll('sales')" :checked="salesChecked()">
                                    <button class="btn btn-transparent btn-small no-padding" @click="confirmDelete('sales')">
                                        <svg class="svg-18" x="0px" y="0px" width="774.266px" height="774.266px" viewBox="0 0 774.266 774.266"><g><g><path d="M640.35,91.169H536.971V23.991C536.971,10.469,526.064,0,512.543,0c-1.312,0-2.187,0.438-2.614,0.875 C509.491,0.438,508.616,0,508.179,0H265.212h-1.74h-1.75c-13.521,0-23.99,10.469-23.99,23.991v67.179H133.916 c-29.667,0-52.783,23.116-52.783,52.783v38.387v47.981h45.803v491.6c0,29.668,22.679,52.346,52.346,52.346h415.703 c29.667,0,52.782-22.678,52.782-52.346v-491.6h45.366v-47.981v-38.387C693.133,114.286,670.008,91.169,640.35,91.169z M285.713,47.981h202.84v43.188h-202.84V47.981z M599.349,721.922c0,3.061-1.312,4.363-4.364,4.363H179.282 c-3.052,0-4.364-1.303-4.364-4.363V230.32h424.431V721.922z M644.715,182.339H129.551v-38.387c0-3.053,1.312-4.802,4.364-4.802 H640.35c3.053,0,4.365,1.749,4.365,4.802V182.339z"></path> <rect x="475.031" y="286.593" width="48.418" height="396.942"></rect> <rect x="363.361" y="286.593" width="48.418" height="396.942"></rect><rect x="251.69" y="286.593" width="48.418" height="396.942"></rect></g></g></svg>
                                    </button>
                                    <button class="fill-normal right btn btn-transparent btn-small return no-padding" @click="resetColumn('sales')">
                                        <svg class="text-top" width="512" height="512" viewBox="0 0 512 512"><path d="M466.745 0L256 210.745 45.255 0 0 45.254 210.745 256 0 466.745 45.255 512 256 301.255 466.745 512 512 466.745 301.255 256 512 45.254z"></path></svg>
                                    </button>
                                </div>
                            </div>
                            <div id="sales" class="transaction-column-content">
                                <div class="transaction-list-item" v-for="sale in sales">
                                    <div class="width-10">
                                        <div>
                                            <input type="checkbox" @click="selectSale($event, sale.id)">
                                        </div>
                                    </div>
                                    <div class="width-90">
                                        <div class="transaction-product">
                                            <span class="font-medium">
                                                {{ sale.manufacturer }} {{ sale.model }}
                                            </span>
                                        </div>
                                        <div class="transaction-technician">
                                            <span class="block">
                                                <a class="no-select">
                                                    {{ sale.firstName }} {{ sale.lastName }}
                                                </a>
                                            </span>
                                        </div>
                                        <div class="transaction-sku" v-if="sale.sku">
                                            <span class="block text-muted font-light no-select">
                                                {{ sale.sku }}
                                            </span>
                                        </div>
                                        <div class="right">
                                            <div>
                                                <button type="button" class="edit-icon" @click="routeTo('/buysale/edit/' + sale.id)">
                                                    <svg x="0px" y="0px" width="528.899px" height="528.899px" viewBox="0 0 528.899 528.899"><g><path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981 c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611 C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069 L27.473,390.597L0.3,512.69z"></path></g></svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="transaction-date">
                                            <label class="text-muted font-light no-select">
                                                {{ sale.date }}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="transaction-list-item-empty text-center text-muted" v-if="sales.length === 0">
                                    <label>No Records Found</label>
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
    import Btn from '@/components/Btn.vue'
    import ConfirmDialog from '@/components/ConfirmDialog.vue'
    import Modal from '@/components/Modal.vue'
    import database from '@/components/firebaseInit.js'

    export default {
        name: "BuySale",
        components: {
            Btn,
            ConfirmDialog,
            Modal
        },
        data() {
            return {
                title: 'Advanced Search - Big Buys/Sales | Device Pitstop - Maple Grove',
                buys: [],
                sales: [],
                selectedBuys: [],
                selectedSales: [],
                search: ''
            }
        },
        methods: {
            routeTo(route) {
                this.$router.push(route);
            },
            getFullDate() {
                let date = new Date();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                let year = date.getFullYear();

                return month + "/" + day + "/" + year;
            },
            buysChecked() {
                return document.querySelectorAll("#buys input[type=checkbox]").length === this.selectedBuys.length;
            },
            salesChecked() {
                return document.querySelectorAll("#sales input[type=checkbox]").length === this.selectedSales.length;
            },
            selectBuy(e, id) {
                if (e.srcElement.checked) {
                    this.selectedBuys.push(id);
                }

                else {
                    this.selectedBuys = this.selectedBuys.filter(e => e !== id);
                }
            },
            selectSale(e, id) {
                if (e.srcElement.checked) {
                    this.selectedSales.push(id);
                }

                else {
                    this.selectedSales = this.selectedSales.filter(e => e !== id);
                }
            },
            selectAll(column) {
                let checkboxes;
                let selectAll;

                if (column === 'buys') {
                    selectAll = document.querySelector(".selectAll-buys");
                    checkboxes = document.querySelectorAll("#buys input[type=checkbox]");
                }
                else if (column === 'sales') {
                    selectAll = document.querySelector(".selectAll-sales");
                    checkboxes = document.querySelectorAll("#sales input[type=checkbox]");
                }

                // Check / Uncheck all checkboxes
                for (let checkbox of checkboxes) {
                    checkbox.checked = selectAll.checked;
                }

                if (selectAll.checked === false) {
                    if (column === 'buys') {
                        this.selectedBuys = [];
                    }
                    else if (column === 'sales') {
                        this.selectedSales = [];
                    }
                }
            },
            resetColumn(column) {
                let checkboxes;
                let selectAll;

                if (column === 'buys') {
                    this.selectedBuys = [];
                    checkboxes = document.querySelectorAll("#buys input[type=checkbox]");
                }
                else if (column === 'sales') {
                    this.selectedSales = [];
                    checkboxes = document.querySelectorAll("#sales input[type=checkbox]");
                }

                // Check / Uncheck all checkboxes
                for (let checkbox of checkboxes) {
                    checkbox.checked = false;
                }
            },
            confirmDelete(column) {
                if (column === 'buys') {
                    this.$root.$emit('deleteBuys');
                    if (this.selectedBuys.length === 1) {
                        this.$root.$emit('openConfirm', {
                            closed: false,
                            text: 'Are you sure you want to delete the selected product?',
                            type: 'warning',
                            dimScreen: true
                        });
                    }

                    else if (this.selectedBuys.length > 1) {
                        this.$root.$emit('openConfirm', {
                            closed: false,
                            text: 'Are you sure you want to delete the selected products?',
                            type: 'warning',
                            dimScreen: true
                        });
                    }
                }
                else if (column === 'sales') {
                    this.$root.$emit('deleteSales');

                    if (this.selectedSales.length === 1) {
                        this.$root.$emit('openConfirm', {
                            closed: false,
                            text: 'Are you sure you want to delete the selected product?',
                            type: 'warning',
                            dimScreen: true
                        });
                    }

                    else if (this.selectedSales.length > 1) {
                        this.$root.$emit('openConfirm', {
                            closed: false,
                            text: 'Are you sure you want to delete the selected products?',
                            type: 'warning',
                            dimScreen: true
                        });
                    }
                }
            },
            deleteSelected(column) {
                let batch = database.batch();
                let index;
                let products = [];
                let self = this;

                if (column === 'buys') {
                    for (let buy in this.selectedBuys) {

                        // Get the index of the buy with matching SKU in the buys array
                        index = this.buys.map((device) => { return device.id }).indexOf(this.selectedBuys[buy]);
                        // Set the buy to a variable
                        products.push(this.buys[index]);

                        batch.delete(database.collection("buysale").doc(this.buys[index].id));
                    }

                    batch.commit()
                        .then(() => {
                            let size = products.length;

                            for (let product of products) {
                                // Remove buy from the array of buys, which also removes it from the page.
                                this.buys = this.buys.filter(e => e !== product);
                                // Remove buy from the array of selected buys
                                this.selectedBuys = this.selectedBuys.filter(e => e !== product.id);
                            }

                            if (size > 1) {
                                self.$root.$emit('openModal', {
                                    closed: false,
                                    text: 'The devices were successfully deleted!',
                                    type: 'success'
                                });
                            }

                            else if (size === 1){
                                self.$root.$emit('openModal', {
                                    closed: false,
                                    text: 'The device was successfully deleted!',
                                    type: 'success'
                                });
                            }

                            this.resetColumn('buys');
                        }).catch((error) => {
                        console.error("An error occurred: " + error);
                    });
                }
                else if (column === 'sales') {

                    for (let sale in this.selectedSales) {

                        // Get the index of the sale with matching SKU in the sales array
                        index = this.sales.map((device) => { return device.id }).indexOf(this.selectedSales[sale]);
                        // Set the sale to a variable
                        products.push(this.sales[index]);

                        batch.delete(database.collection("buysale").doc(this.sales[index].id));
                    }

                    batch.commit()
                        .then(() => {
                            let size = products.length;

                            for (let product of products) {
                                // Remove sale from the array of sales, which also removes it from the page.
                                this.sales = this.sales.filter(e => e !== product);
                                // Remove sale from the array of selected sales
                                this.selectedSales = this.selectedSales.filter(e => e !== product.id);

                            }

                            if (size > 1) {
                                self.$root.$emit('openModal', {
                                    closed: false,
                                    text: 'The devices were successfully deleted!',
                                    type: 'success'
                                });
                            }

                            else if (size === 1){
                                self.$root.$emit('openModal', {
                                    closed: false,
                                    text: 'The device was successfully deleted!',
                                    type: 'success'
                                });
                            }

                            this.resetColumn('sales');
                        }).catch((error) => {
                        console.error("An error occurred: " + error);
                    });
                }
            },
            capitalize(string) {
                return string[0].toUpperCase() + string.slice(1);
            },
            getQuery() {
                let query = this.$route.query;
                let parsedQuery = [];

                // Create objects out of query string
                for (let key in query) {
                    switch (key) {
                        case 'fneq':
                            parsedQuery.push({
                                primary: 'First Name',
                                quantifier: '==',
                                queryText: query[key]
                            });
                            break;
                        case 'lneq':
                            parsedQuery.push({
                                primary: 'Last Name',
                                quantifier: '==',
                                queryText: query[key]
                            });
                            break;
                        case 'dlt':
                            parsedQuery.push({
                                primary: 'Date',
                                quantifier: '<',
                                queryText: query[key].replace(/-/g, '/')
                            });
                            break;
                        case 'dle':
                            parsedQuery.push({
                                primary: 'Date',
                                quantifier: '<=',
                                queryText: query[key].replace(/-/g, '/')
                            });
                            break;
                        case 'deq':
                            parsedQuery.push({
                                primary: 'Date',
                                quantifier: '==',
                                queryText: query[key].replace(/-/g, '/')
                            });
                            break;
                        case 'dge':
                            parsedQuery.push({
                                primary: 'Date',
                                quantifier: '>=',
                                queryText: query[key].replace(/-/g, '/')
                            });
                            break;
                        case 'dgt':
                            parsedQuery.push({
                                primary: 'Date',
                                quantifier: '>',
                                queryText: query[key].replace(/-/g, '/')
                            });
                            break;
                        case 'buy':
                            parsedQuery.push({
                                primary: 'Buy',
                                quantifier: '==',
                                queryText: true
                            });
                            break;
                        case 'sale':
                            parsedQuery.push({
                                primary: 'Sale',
                                quantifier: '==',
                                queryText: true
                            });
                            break;
                    }
                }
                return parsedQuery;
            },
            camelCase(val) {
                // Converts string to camelCase.
                return val.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
                    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
                }).replace(/\s+/g, '');
            },
            showModal(message, type) {
                this.$root.$emit('openModal', {
                    closed: false,
                    text: message,
                    type: type
                })
            }
        },
        computed: {
            today() {
                return this.getFullDate();
            }
        },
        created() {
            let query = this.getQuery();

            if (query) {
                setTimeout(() => {
                    switch (query.length) {
                        case 1:
                            // Modify 'Results for ___' text
                            this.search = query[0].primary + " " + query[0].quantifier + " " + query[0].queryText;

                            database.collection('buysale')
                                .where(this.camelCase(query[0].primary), query[0].quantifier, query[0].queryText)
                                .onSnapshot(snapshot => {
                                    snapshot.docChanges().forEach(change => {
                                        if (change.type === 'added') {
                                            let doc = change.doc.data();
                                            doc.id = change.doc.id;

                                            if (doc.buy) {
                                                this.buys.push(doc);
                                            }
                                            else if (doc.sale) {
                                                this.sales.push(doc);
                                            }
                                        }
                                    })
                                });
                            break;
                        case 2:
                            // Modify 'Results for ___' text
                            this.search = query[0].primary + " " + query[0].quantifier + " " + query[0].queryText + ", "
                                + query[1].primary + " " + query[1].quantifier + " " + query[1].queryText;

                            database.collection('buysale')
                                .where(this.camelCase(query[0].primary), query[0].quantifier, query[0].queryText)
                                .where(this.camelCase(query[1].primary), query[1].quantifier, query[1].queryText)
                                .onSnapshot(snapshot => {
                                    snapshot.docChanges().forEach(change => {
                                        if (change.type === 'added') {
                                            let doc = change.doc.data();
                                            doc.id = change.doc.id;

                                            if (doc.buy) {
                                                this.buys.push(doc);
                                            }
                                            else if (doc.sale) {
                                                this.sales.push(doc);
                                            }
                                        }
                                    })
                                });
                            break;
                        case 3:
                            // Modify 'Results for ___' text
                            this.search = query[0].primary + " " + query[0].quantifier + " " + query[0].queryText + ", "
                                + query[1].primary + " " + query[1].quantifier + " " + query[1].queryText + ", "
                                + query[2].primary + " " + query[2].quantifier + " " + query[2].queryText;

                            database.collection('buysale')
                                .where(this.camelCase(query[0].primary), query[0].quantifier, query[0].queryText)
                                .where(this.camelCase(query[1].primary), query[1].quantifier, query[1].queryText)
                                .where(this.camelCase(query[2].primary), query[2].quantifier, query[2].queryText)
                                .onSnapshot(snapshot => {
                                    snapshot.docChanges().forEach(change => {
                                        if (change.type === 'added') {
                                            let doc = change.doc.data();
                                            doc.id = change.doc.id;

                                            if (doc.buy) {
                                                this.buys.push(doc);
                                            }
                                            else if (doc.sale) {
                                                this.sales.push(doc);
                                            }
                                        }
                                    })
                                });
                            break;
                        default:
                            this.showModal('An error has occurred. Please refresh the page', 'error');
                            break;
                    }
                }, 10);
            }
        },
        mounted() {
            let deleteBuys = false;
            let deleteSales = false;

            this.$root.$on('deleteBuys', data => {
                deleteBuys = true;
            });

            this.$root.$on('deleteSales', data => {
                deleteSales = true;
            });

            this.$root.$on('confirm', data => {
                if (deleteBuys) {
                    this.deleteSelected('buys');
                    deleteBuys = false;
                }

                else if (deleteSales) {
                    this.deleteSelected('sales');
                    deleteSales = false;
                }

            });
        }
    }
</script>

<style scoped>
    #column {
        top: 3.1rem;
        left: 12.4rem;
        position: absolute;
        z-index: 0;
    }

    #column-header {
        width: 85%;
    }

    .wide {
        width: 96.295% !important;
    }

    #action-row {
        padding: 16px 10px 15px 18px;
    }

    .btn-toolbar-right {
        float: right;
    }

    .transaction-column {
        position: relative;
        display: inline-table;
        height: auto;
        min-height: 89vh;
        width: 360px;
        margin-left: 30px;
        border: none;
        background: #fafafa;
        margin-bottom: 30px;
    }

    #sales-column {
        margin-left: 34px;
    }

    .transaction-header {
        position: relative;
        padding: 18px 10px 15px 28px;
    }

    .off-blue {
        background: #4caee6;
        border-left-color: #4caee6;
    }

    .off-red {
        background: #e46f5c;
        border-left-color: #e46f5c;
    }

    #title-buys, #title-sales {
        user-select: none;
    }

    .arrow-right::after {
        right: -38px;
        border-left: 11px solid;
        border-top: 29px solid transparent;
        border-bottom: 29px solid transparent;
        border-right: 27px solid transparent;
        position: absolute;
        border-left-color: inherit;
        top: 0px;
        content: '';
    }

    .transaction-column-content {
        padding: 0 12px 12px;
    }

    .transaction-list-item-empty {
        margin-top: 12px;
        border: 1px solid #F2F2F2;
        padding: 45px 0;
        background-color: #fff;
    }

    .text-normal {
        color: #222 !important;
    }

    .font-md {
        font-size: 18px;
    }

    .font-regular {
        font-family: "Metropolis Regular" !important;
    }

    .transaction-list-item {
        border: 1px solid #EFEFEF;
        padding: 18px 18px 10px;
        line-height: 1.7;
        background: white;
        display: flex;
        margin-top: 12px;
    }

    .font-medium {
        font-family: "Metropolis Medium" !important;
    }

    .block {
        display: block;
    }

    a {
        text-decoration: none;
        cursor: pointer;
        color: #267CB9;
    }

    .text-muted {
        color: #777 !important;
    }

    .font-light {
        font-family: "Metropolis Light" !important;
    }

    .transaction-list-item:hover .edit-icon {
        opacity: 1;
        -webkit-transition: opacity 0.15s;
    }

    .edit-icon {
        background-color: #F4F4F4;
        padding: 6px 5px 2px;
        border-radius: 33%;
        border: none;
        fill: #9B9B9B;
        opacity: 0;
        -webkit-transition: opacity 0.15s;
        cursor: pointer;
    }

    svg {
        margin-left: 3px;
        margin-right: 3px;
        height: 15px;
        width: 15px;
    }

    .svg-18 {
        width: 18px;
        height: 18px;
    }

    .no-padding {
        padding: 0!important;
    }

    .btn-small {
        padding: 5px 10px;
        font-size: 13px;
        line-height: 1.5;
        border-radius: 3px;
    }

    .btn-transparent {
        background-color: transparent;
    }

    .fill-normal {
        fill: #222 !important;
    }

    .actions {
        margin-bottom: -1px;
    }

    .width-90 {
        width: 90%;
    }

</style>