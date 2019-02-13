<template>
    <div id="storestock" v-title="title">
        <confirm-dialog></confirm-dialog>
        <modal></modal>
        <div id="column">
            <div id="column-header" class="wide">
                <div id="action-row">
                    <div class="btn-toolbar-right">
                        <span v-if="selected.length === 0">
                            <btn id="new" primary add small content="New" @click.native="routeTo('/storestock/new')"></btn>
                        </span>
                        <span v-else>
                            <return-btn @click.native="deselectAll"></return-btn>
                        </span>
                    </div>
                    <div class="font-xl" v-if="selected.length === 0">
                        Store Stock Tracker
                    </div>
                    <dropdown
                            v-else
                            text="More Actions"
                            :options="options"
                            @changed="parseOption($event.selected)"
                    ></dropdown>
                </div>
            </div>
            <div id="column-content">
                <div id="column-container">
                    <table id="store-stock-tracker">
                        <thead>
                        <tr>
                            <th class="width-5">
                                <input type="checkbox" class="selectAll" :disabled="devices.length === 0" @click="selectAll">
                            </th>
                            <th v-for="column in columns" :class="column.class" @click="sort(column.sort)">
                                <div class="left overflow">
                                    {{ column.heading }}
                                </div>
                                <span v-if="column.sort === currentSort" class="caret right up" :class="{ 'currentSortDirection': sortDirection === 'asc' }"></span>
                                <span v-if="column.sort === currentSort" class="caret right down" :class="{ 'currentSortDirection': sortDirection === 'desc' }"></span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="device in sortedDevices" :class="{ 'selected': checkSelected(device.id) }">
                            <td>
                                <input type="checkbox" @change="checkboxChecked($event, device.id)">
                            </td>
                            <td class="overflow">
                                <a>{{ device.firstName }} {{ device.lastName }}</a>
                            </td>
                            <td class="overflow">{{ device.manufacturer }}</td>
                            <td class="overflow">{{ device.model }}</td>
                            <td class="overflow">{{ device.actions }}</td>
                            <td class="overflow">{{ device.sku }}</td>
                            <td class="overflow">{{ device.date }}</td>
                            <td class="overflow no-padding">
                                <div class="status">
                                    <ready-icon :class="{ 'right-spacer': true, 'shift-up': device.sold, 'shift-down': !device.sold }" v-if="device.ready"></ready-icon>
                                    <sold-icon v-if="device.sold"></sold-icon>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="devices.length === 0">
                            <td colspan="8" class="no-results">
                                <p class="text-muted">No Records Found</p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Btn from '@/components/Btn.vue'
    import ReadyIcon from '@/components/ReadyIcon.vue'
    import SoldIcon from '@/components/SoldIcon.vue'
    import database from '@/components/firebaseInit.js'
    import ReturnBtn from "@/components/ReturnBtn.vue";
    import Dropdown from '@/components/Dropdown.vue'
    import ConfirmDialog from '@/components/ConfirmDialog.vue'
    import Modal from '@/components/Modal.vue'

    export default {
        name: "store-stock-tracker",
        components: {
            ReturnBtn,
            Btn,
            ReadyIcon,
            SoldIcon,
            Dropdown,
            ConfirmDialog,
            Modal
        },
        data() {
            return {
                title: 'Store Stock | Device Pitstop - Maple Grove',
                currentSort: 'date',
                sortDirection: 'desc',
                columns: [
                    {
                        heading: 'Technician',
                        class: 'width-10',
                        sort: 'firstName',
                    },
                    {
                        heading: 'Manufacturer',
                        class: 'width-10',
                        sort: 'manufacturer',
                    },
                    {
                        heading: 'Product Model',
                        class: 'width-15 overflow',
                        sort: 'model',
                    },
                    {
                        heading: 'Actions Performed',
                        class: 'width-30',
                        sort: 'actions',
                    },
                    {
                        heading: 'SKU',
                        class: 'width-15',
                        sort: 'sku'
                    },
                    {
                        heading: 'Date',
                        class: 'width-10',
                        sort: 'date',
                    },
                    {
                        heading: 'Status',
                        class: 'width-10',
                        sort: 'ready',
                    }
                ],
                devices: [],
                selected: [],
                modifyOption: '',
                options: ['Edit', 'Mark as Sold', 'Mark as Not Sold', 'Mark as Ready for Floor', 'Mark as Not Ready for Floor', 'Delete'],
            }
        },
        computed: {
            sortedDevices() {
                return this.devices.sort((a, b) => {
                    let modifier = 1;
                    if (this.sortDirection === 'desc') modifier = -1;

                    if (this.currentSort === 'date') {
                        if (new Date(a[this.currentSort]) < new Date(b[this.currentSort])) return -1 * modifier;
                        if (new Date(a[this.currentSort]) > new Date(b[this.currentSort])) return 1 * modifier;

                    }

                    else {
                        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                    }

                    return 0;
                });
            }
        },
        methods: {
            selectAll() {
                let selectAll = document.querySelector(".selectAll");
                let checkboxes = document.querySelectorAll("input[type=checkbox]:not(.selectAll)");

                // Check or uncheck all checkboxes
                for (let checkbox of checkboxes) {
                    checkbox.checked = selectAll.checked;
                }

                // If checked, add SKU to selected array
                if (selectAll.checked) {
                    for (let device of this.devices) {
                        this.selected.push(device.sku)
                    }
                }
                else {
                    this.selected = [];
                }

                // Update available options under More Actions
                this.modifyOptions(this.selected.length);
            },
            modifySelectAll() {
                let selectAll = document.querySelector(".selectAll");
                let checkboxes = document.querySelectorAll("input[type=checkbox]:not(.selectAll)");

                selectAll.checked = checkboxes.length === this.selected.length;
            },
            deselectAll() {
                let checkboxes = document.querySelectorAll("input[type=checkbox]");
                let selectedRows = document.querySelectorAll(".selected");
                let sku;

                // Uncheck all checkboxes
                for (let checkbox of checkboxes) {
                    checkbox.checked = false;
                }

                // Remove all SKUs from selected array
                for (let row of selectedRows) {
                    sku = row.childNodes[5].innerText;
                    this.selected = this.selected.filter(e => e !== sku);
                }
            },
            sort(sortKey) {
                if (sortKey === this.currentSort) {
                    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
                }
                this.currentSort = sortKey;
            },
            checkSelected(id) {
                return this.selected.includes(id);
            },
            checkboxChecked(e, id) {
                if (e.srcElement.checked) {
                    this.selected.push(id);
                }

                else {
                    this.selected = this.selected.filter(e => e !== id);
                }

                this.modifyOptions(this.selected.length);
                this.modifySelectAll();
            },
            modifyOptions(count) {
                this.options = count > 1 ? ['Mark as Sold', 'Mark as Not Sold', 'Mark as Ready for Floor', 'Mark as Not Ready for Floor', 'Delete']
                                         : ['Edit', 'Mark as Sold', 'Mark as Not Sold', 'Mark as Ready for Floor', 'Mark as Not Ready for Floor', 'Delete'];
            },
            markSold(isSold) {
                let sku;
                let self = this;
                let batch = database.batch();
                for (let i = 0; i < this.selected.length; i++) {
                    // Index is equal to the index of the object with SKU equal to selected[i] in devices
                    let index = this.devices.map((device) => {
                        sku = device.sku;
                        return device.sku
                    }).indexOf(this.selected[i]);
                    this.devices[index].sold = isSold;
                    sku = this.devices[index].sku;

                    batch.update(database.collection('devices').doc(sku), {"sold": isSold});
                }
                batch.commit()
                    .then(() => {
                        if (this.selected.length === 1) {
                            self.$root.$emit('openModal', {
                                closed: false,
                                text: isSold === true ? 'The product was marked as sold!' : 'The product was marked as not sold!',
                                type: 'success'
                            });
                        }

                        else {
                            self.$root.$emit('openModal', {
                                closed: false,
                                text: isSold === true ? 'The products were marked as sold!' : 'The products were marked as not sold!',
                                type: 'success'
                            });
                        }
                    }).catch((error) => {
                    console.error("An error occurred: " + error);
                });
            },
            markReady(isReady) {
                let sku;
                let self = this;
                let batch = database.batch();
                for (let i = 0; i < this.selected.length; i++) {
                    // Index is equal to the index of the object with SKU equal to selected[i] in devices
                    let index = this.devices.map((device) => {
                        return device.sku
                    }).indexOf(this.selected[i]);
                    this.devices[index].ready = isReady;
                    sku = this.devices[index].sku;

                    batch.update(database.collection('devices').doc(sku), {"ready": isReady});
                }
                batch.commit()
                    .then(() => {
                        if (this.selected.length === 1) {
                            self.$root.$emit('openModal', {
                                closed: false,
                                text: isReady === true ? 'The product was marked as ready for floor!' : 'The product was marked as not ready for floor!',
                                type: 'success'
                            });
                        }

                        else {
                            self.$root.$emit('openModal', {
                                closed: false,
                                text: isReady === true ? 'The products were marked as ready for floor!' : 'The products were marked as not ready for floor!',
                                type: 'success'
                            });
                        }
                    }).catch((error) => {
                    console.error("An error occurred: " + error);
                });
            },
            parseOption(option) {
                if (option === 'Edit') {
                    this.routeTo('/storestock/edit/' + this.selected[0]);
                }

                else if (option === 'Mark as Sold'){
                    this.markSold(true);
                }

                else if (option === 'Mark as Not Sold'){
                    this.markSold(false);
                }

                else if (option === 'Mark as Ready for Floor'){
                    this.markReady(true);
                }

                else if (option === 'Mark as Not Ready for Floor'){
                    this.markReady(false);
                }

                else if (option === 'Delete') {
                    if (this.selected.length === 1) {
                        this.$root.$emit('openConfirm', {
                            closed: false,
                            text: 'Are you sure you want to delete the selected product?',
                            type: 'warning',
                            dimScreen: true
                        });
                    }

                    else if (this.selected.length > 1) {
                        this.$root.$emit('openConfirm', {
                            closed: false,
                            text: 'Are you sure you want to delete the selected products?',
                            type: 'warning',
                            dimScreen: true
                        });
                    }
                }
            },
            routeTo(route) {
                this.$router.push(route);
            },
            deleteSelected() {
                let selectedRows = document.querySelectorAll(".selected");
                let index;
                let sku;
                let self = this;
                let products = [];

                let batch = database.batch();

                for (let row of selectedRows) {
                    // Get SKU from the 5th cell in the row
                    sku = row.childNodes[5].innerText;
                    // Get the index of the device with matching SKU in the devices array
                    index = this.devices.map((device) => { return device.sku }).indexOf(sku);
                    // Set the device to a variable
                    products.push(this.devices[index]);

                    batch.delete(database.collection("devices").doc(sku));
                }

                batch.commit()
                    .then(() => {
                        let size = products.length;

                        for (let product of products) {
                            // Remove device from the array of devices, which also removes it from the page.
                            this.devices = this.devices.filter(e => e !== product);
                            // Remove device from the array of selected rows
                            this.selected = this.selected.filter(e => e !== product.sku);
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

                        this.deselectAll();
                    }).catch((error) => {
                        console.error("An error occurred: " + error);
                });
            }
        },
        created() {
            let date = new Date();
            let month = String(date.getMonth() + 1);
            let year = String(date.getFullYear());
            let self = this;

            database.collection('devices').where("month", "==", month).where("year", "==", year).orderBy("sku", "desc").onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        let doc = change.doc.data();
                        doc.id = change.doc.id;

                        this.devices.push(doc)
                    }
                    else if (change.type === 'removed'){
                        let doc = change.doc.data();
                        doc.id = change.doc.id;

                        self.devices = self.devices.filter(e => e!== doc)
                    }
                })
            });
        },
        mounted() {
            this.$root.$on('confirm', data => {
                this.deleteSelected();
            });
        }
    }
</script>

<style scoped>
    @media  screen and (max-width: 1440px) {
        #column {
            width: 95%!important;
        }
    }

    #column {
        top: 3.1rem;
        left: 12.4rem;
        position: relative;
        /*z-index: 0;*/
    }

    #column-header {
        width: 85%;
    }

    .wide {
        width: 96.3% !important;
    }

    #action-row {
        padding: 16px 10px 15px 18px;
    }

    .btn-toolbar-right {
        float: right;
    }

    #storestock {
        width: 92.24%
    }

    #store-stock-tracker thead:first-child tr:first-child th {
        border-top: 1px solid #e6e6e6;
    }

    #store-stock-tracker thead tr th {
        border-top: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;
        color: #263035;
        background-color: #f7f7f7;
        font-weight: 700;
        -webkit-font-smoothing: antialiased;
        vertical-align: bottom;
        padding: 8px;
    }

    #store-stock-tracker thead {
        font-size: 12px;
        text-transform: uppercase;
    }

    #store-stock-tracker input[type="checkbox"] {
        left: 4px;
        position: relative;
    }

    .no-results {
        text-align: center;
        border-color: white;
    }

    th {
        user-select: none;
    }

    th:hover {
        cursor: pointer;
    }

    th, td {
        text-align: left;
        padding: 12px 8px;
        border-bottom: 1px solid #ededed;
    }

    .no-padding {
        padding: 0;
    }

    .no-results:hover {
        background: #fff;
    }

    .status {
        position: relative;
        left: 8px;
    }

    .right-spacer {
        margin-right: 15px!important;
    }

    #modifyOptions {
        margin-bottom: 4px;
    }

    .form-control {
        font-size: 15px;
        line-height: 1.42857143;
        color: #555;
        display: block;
        height: 33px;
        padding: 5px 12px;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 2px;
        box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
        transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    }

    select {
        border: 1px solid #cccccc;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        box-shadow: 0px 5px 5px -5px rgba(204,204,204,0.6);
    }

    .shift-down {
        position: relative;
        top: 2px;
    }

    .shift-up {
        position: relative;
        top: 0px;
    }

    .caret.up {
        display: inline-block;
        position: relative;
        width: 0;
        height: 0;
        top: -2px;
        left: -8px;
        vertical-align: middle;
        border: 4px solid #333;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
        border-top: 4px solid transparent;
    }

    .caret.down {
        display: inline-block;
        position: relative;
        width: 0;
        height: 0;
        top: 8px;
        vertical-align: middle;
        border: 4px solid #333;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
        border-bottom: 4px solid transparent;
    }

    .caret:not(.currentSortDirection) {
        opacity: 0.3;
    }

</style>