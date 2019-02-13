<template>
    <div id="advanced-search" v-title="title">
        <modal></modal>
        <confirm-dialog></confirm-dialog>
        <div class="column width-884">
            <div class="sign-maker-column">
                <h3 class="font-xl">Advanced Search</h3>
                <p class="text-muted">Get results for the following...</p>
                <search-component text="where" :options="fields" v-for="query in queryQuantity"></search-component>
                <search-component text="in" :options="collections" omit ></search-component>
                <div class="btn-container">
                    <btn primary content="Search" @click.native="search()" large></btn>
                    <btn content="Add Another Term" @click.native="addTerm" large></btn>
                </div>
                <br>
                <h4 class="btn-link"><a @click="removeTerm">Remove a Term</a></h4>
            </div>
        </div>
    </div>
</template>

<script>
    import Btn from '@/components/Btn.vue'
    import database from '@/components/firebaseInit.js'
    import ConfirmDialog from '@/components/ConfirmDialog.vue';
    import Modal from '@/components/Modal.vue';
    import SearchComponent from '@/components/SearchComponent.vue'

    export default {
        name: "AdvancedSearch",
        components: {
            ConfirmDialog,
            Btn,
            Modal,
            SearchComponent
        },
        data() {
            return {
                title: 'Advanced Search | Device Pitstop - Maple Grove',
                signIds: [],
                fields: ['First Name', 'Last Name', 'Date'],
                collections: ['Store Stock', 'Big Buys/Sales', 'Returns'],
                queryQuantity: 1
            }
        },
        methods: {
            parseOption(option, quantifier, queryText) {
                // This function parses the input to a usable term for a query string.
                // First Name becomes 'fn' and == becomes 'eq', so you can get fneq as output.
                // This allows you to put ?fneq=John&lneq=Doe into the URL for further parsing once the page has loaded.

                switch (option) {
                    case 'First Name':
                        option = 'fn';
                        break;
                    case 'Last Name':
                        option = 'ln';
                        break;
                    case 'Date':
                        option = 'd';
                        break;
                }

                switch (quantifier) {
                    case '<':
                        quantifier = 'lt';
                        break;
                    case '<=':
                        quantifier = 'le';
                        break;
                    case '==':
                        quantifier = 'eq';
                        break;
                    case '>=':
                        quantifier = 'ge';
                        break;
                    case '>':
                        quantifier = 'gt';
                        break;
                }

                if (queryText.includes("/")) {
                    // Convert 1/3/2019 to 1-3-2019
                    queryText = queryText.replace(/\//g, '-');
                }

                return option + quantifier + "=" + queryText;
            },
            advancedRouteTo(route, search) {
                let advRoute = '?';

                // Iterates through the search content and builds an appropriate query string for later parsing
                for (let i = 0; i < search.length; i++) {
                    advRoute += this.parseOption(search[i].primary, search[i].quantifier, search[i].queryText);

                    // Separates query terms with &
                    if (i !== search.length-1) {
                        advRoute += "&";
                    }
                }

                switch (route) {
                    case 'Store Stock':
                        this.$router.push('/advanced-search/storestock/' + advRoute);
                        break;

                    case 'Big Buys/Sales':
                        this.$router.push('/advanced-search/buysale/' + advRoute);
                        break;

                    case 'Returns':
                        this.$router.push('/advanced-search/returns/' + advRoute);
                        break;

                    default:
                        this.showModal('An error has occurred. Please refresh the page.', 'error');
                        break;
                }
            },
            search() {
                let content = [];
                let dropdowns = document.querySelectorAll(".dropdown");

                for (let i = 0; i < this.queryQuantity * 2; i+=2) {
                    let query = {};
                    query.primary = dropdowns[i].childNodes[0].children[0].innerText;
                    query.quantifier = dropdowns[i+1].childNodes[0].children[0].innerText;
                    query.queryText = i > 2 ? document.querySelectorAll(".form-group")[i - 2].childNodes[1].children[0].value.trim()
                                            : query.queryText = i > 1 ? document.querySelectorAll(".form-group")[i - 1].childNodes[1].children[0].value.trim()
                                                                      : document.querySelectorAll(".form-group")[i].childNodes[1].children[0].value.trim();
                    content.push(query);
                }

                let collection = dropdowns[dropdowns.length - 1].childNodes[0].children[0].innerText;

                this.advancedRouteTo(collection, content);
            },
            addTerm() {
                if (this.queryQuantity < 3) {
                    this.queryQuantity++;
                }
                else {
                    this.$root.$root.$emit('openModal', {
                        closed: false,
                        text: 'Only 3 search terms can be added!',
                        type: 'error'
                    });
                }
            },
            removeTerm() {
                if (this.queryQuantity > 1) {
                    this.queryQuantity--;
                }
                else {
                    this.$root.$root.$emit('openModal', {
                        closed: false,
                        text: 'You must have at least one search term!',
                        type: 'error'
                    });
                }
            },
            camelCase(val) {
                return val.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
                    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
                }).replace(/\s+/g, '');
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

    .search-component {
        display: block;
    }

</style>