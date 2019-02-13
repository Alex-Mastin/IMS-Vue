<template>
    <div id="floating-menu"  :class="{ 'hidden': this.closed, '': this.closed === false }">
        <ul class="dropdown-menu dropdown-menu-right">
            <li v-for="(option, i) in options" :key="i" :class="{ 'is-active': i === hovered,  }" v-on:mouseover="hovered = i" v-on:mouseleave="hovered = -1" @click="closed = true">
                <a :class="{ 'selected-option': selected === options[i] }" @click="[selected = options[i], closed = true]">
                    <svg v-if="selected === options[i]" id="selected-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="icon icon-xs tick-mark"><path d="M497.8 51.5l-.4-.4c-9.2-9.2-21.4-14.2-34.4-14.2s-25.2 5.1-34.4 14.2L154.3 325.5 83 254.2C73.8 245 61.6 240 48.6 240s-25.2 5.1-34.4 14.2C5 263.4 0 275.6 0 288.6s5 25.2 14.2 34.4l106 106c9.2 9.2 21.4 14.2 34.4 14.2s25.2-5.1 34.4-14.2l308.8-308.8c18.9-18.9 18.9-49.8 0-68.7z"></path></svg>
                    {{ option }}
                </a>
            </li>
            <li>
                <div class="search-divider"></div>
                <a id="adv-search" @click="routeTo('/advanced-search')">
                    <div class="advanced-search width-100">
                        <svg class="svg-link" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M511.256 466.306L371.179 326.229a2.542 2.542 0 0 0-3.595 0l-11.513 11.512c31.591-35.855 50.786-82.878 50.786-134.312C406.856 91.26 315.6.001 203.428.001 91.257.001 0 91.26 0 203.43s91.257 203.426 203.428 203.426c51.432 0 98.457-19.196 134.314-50.783l-11.513 11.512a2.543 2.543 0 0 0 0 3.595l140.076 140.074a2.545 2.545 0 0 0 3.596 0l41.353-41.352a2.541 2.541 0 0 0 .002-3.596zm-307.828-92.508c-93.942 0-170.371-76.428-170.371-170.369s76.428-170.37 170.371-170.37c93.942 0 170.371 76.428 170.371 170.37S297.37 373.798 203.428 373.798z"></path></svg>
                        Advanced Search
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "search-options",
        data() {
            return {
                options: ['Store Stock', 'Big Buys/Sales', 'Returns'],
                closed: true,
                selected: 'Store Stock',
                hovered: -1
            }
        },
        methods: {
            routeTo(route) {
                this.$router.push(route);
            },
            handleClickOutside(e) {
                let searchIcon = document.querySelector("#search-icon");

                // If the user clicks on the search icon, open the menu
                if (searchIcon.contains(e.target)) {
                    this.closed = !this.closed;
                }
                // Otherwise, it should be closed, unless it's already closed.
                else {
                    if (!this.$el.contains(e.target) && this.closed !== true) {
                        this.closed = true;
                    }
                }
            }
        },
        mounted() {
            document.addEventListener('click', this.handleClickOutside);
        },
        destroyed() {
            document.removeEventListener('click', this.handleClickOutside)
        },
    }
</script>

<style scoped>

    /*#floating-menu {*/
        /*max-width: 126px;*/
        /*padding-bottom: 4px;*/
    /*}*/

    .dropdown-menu {
        position: absolute;
        top: 39px;
        z-index: 1000;
        min-width: 260px;
        padding: 5px 0;
        margin: 2px 0 0;
        list-style: none;
        font-size: 15px;
        text-align: left;
        background-color: #fff;
        border: 1px solid #ccc;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 2px;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
        background-clip: padding-box;
    }

    a {
        color: #333;
    }

    li>a {
        display: block;
        padding: 3px 20px 3px 28px;
        user-select: none;
    }

    #adv-search {
        padding: 3px 0 0 0;
        margin-top: -1px;
        margin-bottom: -1px;
        color: #267CB9;
        position: relative;
        top: -2px;
    }

    #adv-search:focus, #adv-search:hover {
        background-color: #fff!important;
    }

    .dropdown-menu>li>a:focus, .dropdown-menu>li>a:hover, .is-active>a {
        text-decoration: none;
        color: #fff;
        background-color: #2e8fda;
    }

    li:hover a>svg {
        fill: #fff;
    }

    .hidden {
        display: none;
    }

    .open {
        display: block;
    }

    .search-divider {
        margin: 9.5px 0;
        border-top: 1px solid #e5e5e5;
    }

    .advanced-search {
        vertical-align: middle;
        text-align: center;
    }

    .advanced-search svg {
        position: relative;
        top: 2px;
        left: 4px;
    }

    .svg-link {
        fill: #206ec5;
    }

    svg {
        margin-left: 3px;
        margin-right: 3px;
        height: 15px;
        width: 15px;
    }

    #selected-icon {
        position: relative;
        /*left: -5px;*/
    }

    .icon-xs {
        width: 12px;
        height: 12px;
        fill: #333;
    }

    .selected-option {
        padding-left: 6px !important;
    }
</style>