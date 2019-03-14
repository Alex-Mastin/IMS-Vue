<template>
    <div id="reports" v-title="title">
        <div id="column" class="width-884">
            <div id="reports-header" class="width-73">
                <div class="row height-inherit">
                    <div class="width-50 height-inherit">
                        <div class="font-xl width-15 header-text">
                            Reports
                        </div>
                    </div>
                </div>
            </div>
            <div id="reports-content">
                <div class="row">
                    <div class="content-column width-33">
                        <p class="row-content-text font-lg font-light">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="icon fill-normal"><path class="st0" d="M448 0H64C28.8 0 0 28.8 0 64v384c0 35.2 28.8 64 64 64h384c35.2 0 64-28.8 64-64V64c0-35.2-28.8-64-64-64zM208 32h96v128l-48-32-48 32V32zm272 416c0 17.6-14.4 32-32 32H64c-17.6 0-32-14.4-32-32V64c0-17.6 14.4-32 32-32h112v176l80-48 80 48V32h112c17.6 0 32 14.4 32 32v384zM352 268.8c6.4 6.4 4.8 16-1.6 22.4L224 404.8c-3.2 3.2-6.4 4.8-11.2 4.8h-1.6c-4.8 0-8-3.2-11.2-6.4l-41.6-56c-4.8-6.4-3.2-17.6 3.2-22.4s17.6-3.2 22.4 3.2l32 43.2 113.6-100.8c6.4-8 17.6-8 22.4-1.6z"></path></svg>
                            Inventory
                        </p>
                        <ul id="reports-inv" class="reports-nav">
                            <li class="reports-nav-item" v-for="item in inventory">
                                <a :href="item.url">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" class="icon icon-xs svg-link"><path d="M195.316.5h-62.448l258.82 256.01-258.82 255.99h62.448l258.812-255.99z"></path></svg>
                                    {{ item.title }}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="content-column width-33">
                        <p class="row-content-text font-lg font-light">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="icon fill-normal"><path d="M255.8 512c-7.8 0-15.6-.4-23.3-1.1-8.8-.8-15.1-7.4-15.1-15.7 0-8.4 7-15.7 15-15.7.4 0 .8 0 1.2.1 7.1.7 14.3 1 21.5 1 43.8 0 86.1-12.3 122.3-35.5 33.6-21.5 60.9-51.7 78.9-87.3 19.1-37.5 27.1-80 23.2-122.9-3.9-43.2-19.7-83.4-45.6-116.4C391 63.9 324.3 31.3 255.4 31.3c-14.9 0-29.7 1.5-44.1 4.6C167.8 45 128.8 65.8 98.4 96c-29.8 29.6-50.7 66.4-60.5 106.7-10.1 41.6-8.3 84.9 5.4 125.2 13.1 38.6 37.6 74.4 68.9 100.6l1.6 1.3.5-62.6c.1-8.7 6.9-15.3 15.8-15.3 4.4 0 8.5 1.7 11.4 4.6 2.8 2.8 4.3 6.6 4.2 10.9l-.8 95.1c-.1 8.6-7.1 15.6-15.6 15.6l-93.3-.8c-8.8-.1-15.4-6.9-15.3-15.8 0-8.9 6.6-15.5 15.3-15.5l48.9.4-1.9-1.7c-3.6-3.2-7-6.6-10.2-9.9-33.8-34.9-56.9-78.9-67-127.2-10.1-48.7-6.2-98.2 11.5-143.2C34.4 120.8 61.8 83.3 96.6 56c38-29.8 83-48.6 130.2-54.1 9.6-1.1 19.3-1.7 29-1.7 40.2 0 80.6 9.8 117 28.4 36.5 18.7 68.2 45.9 91.7 78.7 26.9 37.5 43 82.1 46.6 129 3.6 46.8-5.4 93.4-26 134.6-20.6 41.1-51.8 75.9-90.1 100.5-41.8 26.5-89.8 40.6-139.2 40.6zm98-191.5c-2.5 0-4.9-.6-7.2-1.8L248 269.6c-5.2-2.4-8.5-7.3-8.5-13.1V108.4c0-8.4 7.1-14.7 16-14.7s16 6.3 16 14.7v137.7l90.4 45.2c6.3 3.2 9.3 9.6 7.8 16.3-1.8 7.5-8.5 12.9-15.9 12.9z"></path></svg>
                            Activity
                        </p>
                        <ul id="reports-activity" class="reports-nav">
                            <li class="reports-nav-item" v-for="item in activity">
                                <a :href="item.url">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" class="icon icon-xs svg-link"><path d="M195.316.5h-62.448l258.82 256.01-258.82 255.99h62.448l258.812-255.99z"></path></svg>
                                    {{ item.title }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Reports",
        data() {
            return {
                title: 'Reports | Device Pitstop - Maple Grove',
                inventory: [
                    {
                        title: 'iPad Buy/Sale Prices',
                        url: 'https://docs.google.com/spreadsheets/d/1CaA-UuLyufe_1yAVZWqN0CphAsvL8Rspxo9LaN-z_lU/edit#gid=0'
                    },
                    {
                        title: 'Phone Buy-in Prices',
                        url: 'https://docs.google.com/spreadsheets/d/1bSqmdCgQtfvKq9_CBDETy3vcrrYaJ4OnbxsVODHjcTU/edit#gid=0'
                    },
                    {
                        title: 'Retail Part Cost Calculator',
                        url: 'https://docs.google.com/spreadsheets/d/1xrrvPgxzDjSlqvmz8oCXwQ7xNt-9TMmoS0_dCxJ0ZQY/edit#gid=1195361612'
                    },
                    {
                        title: 'Test to Buy Offer Calculator',
                        url: 'https://docs.google.com/spreadsheets/d/1lc2mDrlp9v8-6-31gvYkhQ4cwI4PnZAN3tt7NbVIdrc/edit#gid=0'
                    },
                    {
                        title: 'Cycle Count Worksheet',
                        url: 'https://tinyurl.com/y5arcgha'
                    },

                ],
                activity: [
                    {
                        title: 'Closing Report',
                        url: 'https://docs.google.com/forms/d/e/1FAIpQLSdF4yTZE8xzRQIkjQKH9biHIoX_pVxvEWnC-BjcBi4HC6XZGQ/viewform'
                    },
                    {
                        title: 'BIOS Keys for Laptops',
                        url: 'https://docs.google.com/spreadsheets/d/1tFiuPaRotCPaHEPccHr2sqjVy6OSwSpoHAFxu2-kfhA/edit#gid=0'
                    }
                ]
            }
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

    #reports-header {
        border-bottom: 1px solid #ededed;
        height: 65px;
        padding: 0 20px;
    }

    #reports-content {
        padding: 30px 20px 50px 20px;
    }

    .content-column {
        float: left;
        margin-bottom: 40px;
        margin-right: 100px;
    }

    .row-content-text {
        margin: 0 0 20px !important;
    }

    .reports-nav {
        margin-bottom: 0;
        padding-left: 0;
        list-style: none;
    }

    .reports-nav .reports-nav-item a {
        border-bottom: 1px dashed #E9E9E9;
        width: 100%;
        padding: 10px 0;
        float: left;
    }

    .width-15 {
        width: 15%;
    }

    .width-33 {
        width: 33%;
    }

    .width-50 {
        width: 50%;
    }

    .width-73 {
        width: 73%;
    }

    .width-884 {
        width: 88.4%;
    }

    .height-inherit {
        height: inherit;
    }

    .header-text {
        position: relative;
        top: 25%;
        margin-left: 15px;
    }

    .font-xl {
        font-size: 26px;
    }

    .row-content-text svg {
        margin-right: 0;
    }

    .fill-normal {
        fill: #222 !important;
    }

    svg {
        margin-left: 3px;
        margin-right: 3px;
        height: 15px;
        width: 15px;
    }

    .icon-xs {
        width: 12px;
        height: 12px;
        fill: #333;
    }

    .svg-link {
        fill: #206ec5;
    }


</style>