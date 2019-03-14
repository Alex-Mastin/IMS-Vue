<template>
    <div class="changelog-modal" v-if="closed === false">
        <div class="changelog">
            <div class="changelog-banner">
                <span class="font-black">IMS</span>
                <span class="font-light"> | </span>
                <!--<span class="font-thin">Version 1.1.1.5</span>-->
                <span class="font-thin">Version 1.{{ majorUpdates }}.{{ (changelog.length - 1) / 10 % 10 }}</span>
                <a class="exit" @click="closeModal()">
                    ×
                </a>
            </div>
            <div class="changelog-content">
                <span class="changelog-header-text font-sb">What's New?</span>
                <div class="content">
                    <img src="https://i.imgur.com/p53LVcY.png">
                    <ul class="changes">
                        <li v-for="update in changelog">
                            {{ update.text }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ReturnBtn from '@/components/ReturnBtn.vue'

    export default {
        name: "Changelog",
        components: {
            ReturnBtn
        },
        data() {
            return {
                changelog: [
                    {
                        text: 'Active navigation tab text color is now blue!'
                    },
                    {
                        text: "Added 'Quick Add' buttons to some navigation tabs."
                    },
                    {
                        text: "Added a check for devices marked as 'Ready for Floor.' If there are 100 or more devices marked as ready, the status of each device will be cleared."
                    },
                    {
                        text: "Added a mouse-over text tooltip to the Changelog and Support icons on the banner."
                    },
                    {
                        text: "Added a new form to the Reports page."
                    },
                    {
                        text: 'Added additional storage/memory capacity options to the database.'
                    },
                    {
                        text: 'Added functionality for creation of large signs.'
                    },
                    {
                        text: 'Added functionality to create signs when adding new Store Stock entries.'
                    },
                    {
                        text: "Added user accounts! You can now view the number of units you've completed and other info!"
                    },
                    {
                        text: 'Adjusted behavior of Store Stock, Big Buys/Sales, and Returns when getting results and modifying entries to function with numerical dates.'
                    },
                    {
                        text: 'Adjusted behavior of Activity / Inventory Summary panels to function with numerical dates.'
                    },
                    {
                        text: 'Adjusted behavior of search results to display time correctly.'
                    },
                    {
                        text: 'Adjusted behavior of searches to display the number of results next to the search criteria.'
                    },
                    {
                        text: "Adjusted styling for various elements across different viewport sizes."
                    },
                    {
                        text: 'Corrected dropdown styling on New/Edit Store Stock pages.'
                    },
                    {
                        text: 'Corrected hover behavior of Inventory Summary panel text.'
                    },
                    {
                        text: 'Fixed a bug where certain Store Stock entries would not redirect back to the Store Stock Tracker.'
                    },
                    {
                        text: 'Fixed a bug where hard drive size and memory were incorrectly displayed on large signs.'
                    },
                    {
                        text: 'Fixed a bug where new Buy/Sale entries would errantly be entered using strings for dates instead of numbers.'
                    },
                    {
                        text: 'Fixed a bug where searches for Buys/Sales would not be sorted properly.'
                    },
                    {
                        text: 'Fixed a bug where side navigation dropdown items would overlap other navigation tabs.'
                    },
                    {
                        text: 'Fixed a bug where text in the side navigation would overlap another tab.'
                    },
                    {
                        text: 'Fixed a bug where the carrier field on signs would not be highlighted if they contained Unlocked unless manually updated.'
                    },
                    {
                        text: 'Fixed a bug where the Print Queue would incorrectly display an error message after clearing signs.'
                    },
                    {
                        text: 'Fixed a bug where the Reports page could not be accessed.'
                    },
                    {
                        text: 'Fixed a major bug where database entries would not appear in Advanced Searches due to lexicographical order.'
                    },
                    {
                        text: 'Fixed incorrect phrasing on a modal dialog on the Feature Request/Bug Report pages.'
                    },
                    {
                        text: 'Modified New Store Stock dropdown options and added functionality to adjust dropdown options based on the product information that was entered.'
                    },
                    {
                        text: 'Modified Sign Maker accessibility to allow room for Large Sign Maker.'
                    },
                    {
                        text: 'Modified user account functionality to display most recent store stock entries instead of only entries that were created on the current day.'
                    },
                    {
                        text: 'Updated MSRP table with original pricing for all iPhone models.'
                    },
                    {
                        text: '3/12/2019'
                    }
                ],
                closed: true,
                majorUpdates: 1,
            }
        },
        methods: {
            closeModal() {
                this.closed = true;
            }
        },
        mounted() {
            this.$root.$on('openChangelog', data => {
                this.closed = data.closed;
            });

            this.$root.$on('closeChangelog', data => {
                this.closeModal();
            });
        },
    }
</script>

<style scoped>
    .changelog-modal {
        width: -webkit-fill-available;
        height: -webkit-fill-available;
        background: rgba(255, 255, 255, 0.5);
        z-index: 100;
        position: absolute;
    }

    .changelog {
        width: 27.5%;
        height: 35%;
        background: #fff;
        border-radius: 3px;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 6px 12px -3px rgba(0,0,0,0.35)

    }

    .changelog-banner {
        font-size: 28px;
        background-color: #f5f5f5;
        padding: 15px 20px 5px 20px;
        border-bottom: 1px solid #eee;
    }

    .changelog-content {
        padding: 15px 20px 20px 20px;

    }

    .changelog-header-text {
        font-size: 18px;
        margin-bottom: 5px;
    }

    .content {
        max-height: 343px;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .content img {
        max-width: 100%;
        margin: 0 10px 10px 10px;
    }

    .changes {
        overflow-y: scroll;
    }

    li:last-child {
        list-style-type: none;
        padding-top: 15px;
        color: rgba(0,0,0,0.5);
        font-size: 14px;
        font-family: 'Metropolis Light'
    }

    .return {
        display: inline-block;
        float: right;
    }

    .exit {
        display: inline-block;
        float: right;
        position: relative;
        top: -3px;
        color: rgba(0,0,0,0.2)
    }

    .exit:hover {
        color: rgba(0,0,0,0.5);
    }

</style>