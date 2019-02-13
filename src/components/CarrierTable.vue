<template>
    <div>
        <div class="item-title">
            <label class="item-title-text font-sb">Carriers</label>
            <div id="actions" class="right">
                <button class="action-btn" @click="addLine">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 491.86 491.86" style="enable-background:new 0 0 491.86 491.86;" xml:space="preserve"> <g> <path d="M465.167,211.614H280.245V26.691c0-8.424-11.439-26.69-34.316-26.69s-34.316,18.267-34.316,26.69v184.924H26.69 C18.267,211.614,0,223.053,0,245.929s18.267,34.316,26.69,34.316h184.924v184.924c0,8.422,11.438,26.69,34.316,26.69 s34.316-18.268,34.316-26.69V280.245H465.17c8.422,0,26.69-11.438,26.69-34.316S473.59,211.614,465.167,211.614z"></path></g></svg>
                </button>
                <button class="action-btn" @click="editLines">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="528.899px" height="528.899px" viewBox="0 0 528.899 528.899" style="enable-background:new 0 0 528.899 528.899;" xml:space="preserve"> <g> <path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981 c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611 C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069 L27.473,390.597L0.3,512.69z"></path></g></svg>
                </button>
            </div>
        </div>
        <div class="details">
            <table id="carrier-table">
                <thead>
                <tr v-if="lines.length > 0" class="uppercase font-s">
                    <th>Name</th>
                </tr>
                <tr class="noRecords" v-if="lines.length === 0">
                    <td class="text-muted text-center" colspan="4">No Records Found</td>
                </tr>
                </thead>
                <tbody id="table">
                <tr v-for="(line, index) in lines" :key="index">
                    <td>
                        <input type="text" v-if="line.edit === true" v-model="lines[index].carrier" @input="line.changed = true">
                        <span v-else>{{ line.carrier }}</span>
                        <button v-if="line.edit === true" class="action-btn right" @click="deleteLine($event)">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 774.266 774.266" xml:space="preserve"> <g> <g> <path d="M640.35,91.169H536.971V23.991C536.971,10.469,526.064,0,512.543,0c-1.312,0-2.187,0.438-2.614,0.875 C509.491,0.438,508.616,0,508.179,0H265.212h-1.74h-1.75c-13.521,0-23.99,10.469-23.99,23.991v67.179H133.916 c-29.667,0-52.783,23.116-52.783,52.783v38.387v47.981h45.803v491.6c0,29.668,22.679,52.346,52.346,52.346h415.703 c29.667,0,52.782-22.678,52.782-52.346v-491.6h45.366v-47.981v-38.387C693.133,114.286,670.008,91.169,640.35,91.169z M285.713,47.981h202.84v43.188h-202.84V47.981z M599.349,721.922c0,3.061-1.312,4.363-4.364,4.363H179.282 c-3.052,0-4.364-1.303-4.364-4.363V230.32h424.431V721.922z M644.715,182.339H129.551v-38.387c0-3.053,1.312-4.802,4.364-4.802 H640.35c3.053,0,4.365,1.749,4.365,4.802V182.339z"></path> <rect x="475.031" y="286.593" width="48.418" height="396.942"></rect> <rect x="363.361" y="286.593" width="48.418" height="396.942"></rect><rect x="251.69" y="286.593" width="48.418" height="396.942"></rect></g></g></svg>
                        </button>

                        <button v-if="line.edit === true" class="action-btn right" @click="valid(line.carrier, line.changed, line.original) ? (line.edit = false, line.changed = false, line.original = line.carrier) : line.edit = true">
                            <svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 488.878 488.878' xml:space='preserve'> <g> <g> <polygon points='143.294,340.058 50.837,247.602 0,298.439 122.009,420.447 122.149,420.306 144.423,442.58 488.878,98.123 437.055,46.298 '></polygon></g></g></svg>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import database from '@/components/firebaseInit.js'

    export default {
        name: "carrier-table",
        data() {
            return {
                lines: []
            }
        },
        methods: {
            addLine() {
                let emptyLines = this.lines.filter(line => line.carrier === null);

                if (emptyLines.length >= 1 && this.lines.length > 0) {
                    return;
                }

                this.lines.unshift({
                    carrier: null,
                    edit: true,
                    changed: false
                });
            },
            editLines() {
                let editCount = 0;

                for (let i = 0; i < this.lines.length; i++) {
                    if (this.lines[i].edit === true) {
                        editCount++;
                    }
                    this.lines[i].edit = true;
                }

                if (editCount === this.lines.length) {
                    for (let i = 0; i < this.lines.length; i++) {
                        if (this.lines[i].carrier) {
                            this.lines[i].edit = false;
                        }
                    }
                }
            },
            deleteLine(e, id) {
                let el = e.target;
                let row = el.closest('tr');
                let carrier = row.children[0].firstChild.value;
                let docID = this.normalize(carrier);

                // Model and capacity are defined
                if (carrier) {
                    if (confirm("Do you want to delete " + carrier + "?")) {
                        database.collection('carrier').doc(docID).delete()
                            .then(() => {
                                this.lines = this.lines.filter(line => {
                                    return line.carrier !== carrier;
                                })
                            })
                    }
                }

                else {
                    // Remove row from table
                    this.lines.shift();
                }
            },
            valid(carrier, changed, original) {

                // If not null or empty...
                if (changed && carrier){

                    // Normalize input
                    carrier = this.capitalize(carrier);
                    let docID = this.normalize(carrier);

                    if (original) {
                        let originalDoc = this.normalize(original);

                        database.collection('carrier').doc(originalDoc).delete()
                            .then(function () {
                                console.log("Original document successfully deleted!");
                            }).catch(function (error) {
                            console.error("Error removing document: ", error);
                        });
                    }

                    database.collection('carrier').doc(docID).set({
                        carrier: carrier,
                        edit: false,
                        changed: false,
                        original: carrier
                    }).then(function() {
                        console.log("Document written with ID: ", docID);
                    })
                        .catch(function(error) {
                            console.error("Error adding document: ", error);
                        });

                    return true;
                }
                else if (!changed && carrier) {
                    return true;
                }
                else {
                    return false;
                }

            },
            capitalize(string) {
                if (string) {
                    return string.charAt(0).toUpperCase() + string.slice(1);
                }
            },
            normalize(string) {
                string = string.toLowerCase();
                string = this.replaceAll(string, " ", "");
                string = this.replaceAll(string, "-", "");
                string = this.replaceAll(string, "&", "");

                return string;
            },
            replaceAll(string, find, replace) {
                return string.replace(new RegExp(find, 'g'), replace);
            }
        },
        created() {
            database.collection('carrier').orderBy('carrier').get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        let line = doc.data();
                        this.lines.push(line);
                    })
                });
        }
    }
</script>

<style scoped>
    #carrier-table {
        /*border-left: 1px solid #ededed;*/
        /*border-right: 1px solid #ededed;*/
        width: 100%;
    }

    table {
        display: flex;
        flex-flow: column;
        height: 100%;
        width: 99.8%!important;
    }

    tr:last-child {
        border-bottom: none;
    }

    tbody{
        flex: 1 1 auto;
        display: block;
        overflow-y: auto;
        max-height: 138px; /* Adjusts the size of the visible part of the table. Each row is 46px tall, so 138 = 3 rows tall. */
    }

    thead {
        background: #f7f7f7;
        flex: 0 0 auto;
        width: 100%
    }

    thead, tr {
        display: table;
        table-layout: fixed;
    }

    tr {
        border-bottom: 1px solid #ededed;
        width: 100%;
    }

    th, td {
        text-align: left;
        padding: 12px 8px;
        /*border: 1px solid #ededed;*/
    }

    .noRecords {
        background: #fff;
    }

    .noRecords td {
        border: none;
    }

    svg {
        position: relative;
        top: 2px;
        margin-top: -5px;
    }

    [contenteditable=true]:empty:not(:focus):before {
        color: #777 !important;
        content:attr(data-text);
    }

</style>