<template>
    <header role="banner">
        <div id="header">
            <div id="site-logo"></div>
        </div>
        <div id="topbar">
            <div id="search-bar">
                <form id="search" autocomplete="off">
                    <div id="search-left-half">
                            <span id="search-icon" onclick="showSearch()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
                                    <path d="M511.256 466.306L371.179 326.229a2.542 2.542 0 0 0-3.595 0l-11.513 11.512c31.591-35.855 50.786-82.878 50.786-134.312C406.856 91.26 315.6.001 203.428.001 91.257.001 0 91.26 0 203.43s91.257 203.426 203.428 203.426c51.432 0 98.457-19.196 134.314-50.783l-11.513 11.512a2.543 2.543 0 0 0 0 3.595l140.076 140.074a2.545 2.545 0 0 0 3.596 0l41.353-41.352a2.541 2.541 0 0 0 .002-3.596zm-307.828-92.508c-93.942 0-170.371-76.428-170.371-170.369s76.428-170.37 170.371-170.37c93.942 0 170.371 76.428 170.371 170.37S297.37 373.798 203.428 373.798z"></path>
                                </svg>
                                <span class="caret"></span>
                            </span>
                    </div>
                    <div>
                        <input id="search-right-half" placeholder="Search" maxlength="100" type="text" class="">
                        <input class="no-display" type="submit">
                    </div>
                </form>
                <div id="search-options" class="no-display width-109" style="display: none;">
                    <div class="search-option width-100 selected-option">
                        <svg id="selected-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                             class="icon icon-xs tick-mark">
                            <path d="M497.8 51.5l-.4-.4c-9.2-9.2-21.4-14.2-34.4-14.2s-25.2 5.1-34.4 14.2L154.3 325.5 83 254.2C73.8 245 61.6 240 48.6 240s-25.2 5.1-34.4 14.2C5 263.4 0 275.6 0 288.6s5 25.2 14.2 34.4l106 106c9.2 9.2 21.4 14.2 34.4 14.2s25.2-5.1 34.4-14.2l308.8-308.8c18.9-18.9 18.9-49.8 0-68.7z"></path>
                        </svg>
                        Store Stock
                    </div>
                    <div class="search-option width-100">Big Buys/Sales</div>
                    <div class="search-option width-100">Returns</div>
                    <div class="search-option width-100">Technician</div>
                    <a id="adv-search" onclick="alert('This feature has not been implemented yet.')">
                        <div class="search-divider"></div>
                        <div class="advanced-search width-100">
                            <svg class="svg-link" xmlns="http://www.w3.org/2000/svg" width="512" height="512"
                                 viewBox="0 0 512 512">
                                <path d="M511.256 466.306L371.179 326.229a2.542 2.542 0 0 0-3.595 0l-11.513 11.512c31.591-35.855 50.786-82.878 50.786-134.312C406.856 91.26 315.6.001 203.428.001 91.257.001 0 91.26 0 203.43s91.257 203.426 203.428 203.426c51.432 0 98.457-19.196 134.314-50.783l-11.513 11.512a2.543 2.543 0 0 0 0 3.595l140.076 140.074a2.545 2.545 0 0 0 3.596 0l41.353-41.352a2.541 2.541 0 0 0 .002-3.596zm-307.828-92.508c-93.942 0-170.371-76.428-170.371-170.369s76.428-170.37 170.371-170.37c93.942 0 170.371 76.428 170.371 170.37S297.37 373.798 203.428 373.798z"></path>
                            </svg>
                            Advanced Search
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: "topbar"
    }
</script>

<style scoped>
    header {
        width: 100%;
        position: unset;
        background-color: #f7f7f7;
    }

    #header {
        top: 0;
        height: 3.1rem;
        width: 12.5rem;
        background-color: #ededed;
        z-index: 2;
        position: fixed;
    }

    #site-logo {
        background: url(https://www.devicepitstop.com/wp-content/themes/devicepitstop/images/site-logo.png) no-repeat 0 0;
        width: inherit;
        height: inherit;
        display: block;
        background-size: 70%;
        background-color: #ededed;
        background-position: center;
    }

    #topbar {
        top: 0;
        left: 12.5rem;
        height: 3.05rem;
        width: 100%;
        background-color: #f8f7f7;
        position: fixed;
        z-index: 1;
    }

    #topbar, .ui {
        border-bottom: 1px solid #e0e0e0;
    }

    #search-bar {
        padding: 0.54rem;
        left: 2rem;
        height: 31px;
        position: relative;
        display: table;
    }

    #search-left-half {
        user-select: none;
        border-radius: 20px 0 0 20px;
        height: 29px;
        position: relative;
        background-color: #fff;
        border: 1px solid #ccc !important;
    }

    #search-icon {
        padding: 8px;
        position: absolute;
        color: #555;
        fill: #555;
        left: 0;
    }

    svg {
        margin-left: 3px;
        margin-right: 3px;
        height: 15px;
        width: 15px;
    }

    .caret {
        display: inline-block;
        position: relative;
        z-index: 3;
        width: 0;
        height: 0;
        left: -3px;
        vertical-align: middle;
        border: 4px solid;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
        border-bottom: 4px solid transparent;
    }

    #search-right-half {
        height: 29px;
        border-radius: 0 20px 20px 0;
        border: 1px solid #ccc !important;
        border-left: 0 !important;
        padding: 0 2px;
        font-size: 15px;
        position: relative;
        bottom: 31px;
        left: 2.35rem;
        width: 218px;
        padding-left: 4px;
        font-family: 'Metropolis Regular';
        letter-spacing: -0.045rem;
    }

    .no-display {
        display: none;
    }
</style>