<template>
    <div id="datepicker">
        <form-input elementId="date" label="Current Date" labelWidth="15" inputWidth="50" type="text" :required="isRequired" @click.native="openDateTimePicker" v-model="date"></form-input>
        <div id="datetimepicker" :class="{ 'open': isOpen }">
            <date-time-picker v-model="date" inline></date-time-picker>
        </div>

    </div>
</template>

<script>
    import Arrow from '@/components/Arrow.vue';
    import FormInput from '@/components/FormInput.vue';
    import DateTimePicker from 'vue-vanilla-datetime-picker';

    export default {
        name: "datepicker",
        props: {
            isRequired: {
                type: Boolean,
                required: false,
                default: true
            }
        },
        components: {
            Arrow,
            FormInput,
            DateTimePicker,
        },
        data() {
            return {
                currentMonth: this.getMonth(),
                currentYear: new Date().getFullYear(),
                shortDays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                date: '',
                isOpen: false,
            }
        },
        methods: {
            getMonth() {
                let index = new Date().getMonth();
                let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

                return months[index];
            },
            openDateTimePicker() {
                this.isOpen = !this.isOpen;
                this.adjustArrows();
            },
            adjustArrows() {
                if (this.isOpen) {
                    setTimeout(() => {
                        let prevArrow = document.querySelector(".date-picker__prev_month");
                        let nextArrow = document.querySelector(".date-picker__next_month");
                        let leftArrow = "<div>\n" +
                            "            <svg class=\"arrow flipLeft\" x=\"0px\" y=\"0px\" viewBox=\"0 0 60 60\">\n" +
                            "                <path d=\"M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M45.563,30.826l-22,15  C23.394,45.941,23.197,46,23,46c-0.16,0-0.321-0.038-0.467-0.116C22.205,45.711,22,45.371,22,45V15c0-0.371,0.205-0.711,0.533-0.884  c0.328-0.174,0.724-0.15,1.031,0.058l22,15C45.836,29.36,46,29.669,46,30S45.836,30.64,45.563,30.826z\"></path>\n" +
                            "            </svg>\n" +
                            "            <div class=\"dot\"></div>\n" +
                            "        </div>";

                        let rightArrow = "<div>\n" +
                            "            <svg class=\"arrow\" x=\"0px\" y=\"0px\" viewBox=\"0 0 60 60\">\n" +
                            "                <path d=\"M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M45.563,30.826l-22,15  C23.394,45.941,23.197,46,23,46c-0.16,0-0.321-0.038-0.467-0.116C22.205,45.711,22,45.371,22,45V15c0-0.371,0.205-0.711,0.533-0.884  c0.328-0.174,0.724-0.15,1.031,0.058l22,15C45.836,29.36,46,29.669,46,30S45.836,30.64,45.563,30.826z\"></path>\n" +
                            "            </svg>\n" +
                            "            <div class=\"dot\"></div>\n" +
                            "        </div>";

                        prevArrow.classList.add("left");
                        nextArrow.classList.add("right");

                        prevArrow.innerHTML = leftArrow;
                        nextArrow.innerHTML = rightArrow;
                    }, 0);
                }
            },
            positionDateTimePicker() {
                let dtp = document.getElementById("datetimepicker");
                let date = document.getElementById("date").getBoundingClientRect();
                let tb = document.getElementById("topbar").getBoundingClientRect();
                let top = date.bottom - tb.bottom + "px";
                let left = date.left - tb.left + 1 + "px";

                dtp.style.top = top;
                dtp.style.left = left;
            },
            handleClickOutside(e) {
                if (!this.$el.contains(e.target)) {
                    this.isOpen = false;
                }
                else {
                    if (this.date) {
                        document.getElementById("date").value = this.formatDate();
                    }
                }
            },
            formatDate() {
                let date = this.date.split("-");

                let month = parseInt(date[1], 10);
                let day = parseInt(date[2], 10);
                let year = date[0];

                return month + "/" + day + "/" + year;
            }
        },
        mounted() {
            document.addEventListener('click', this.handleClickOutside);
            this.adjustArrows();
            this.positionDateTimePicker();
        },
        destroyed() {
            document.removeEventListener('click', this.handleClickOutside)
        },
    }
</script>

<style>
    #datetimepicker.open {
        position: absolute;
        transition: opacity 0.3s;
        opacity: 1;
        z-index: 1;
    }

    #datetimepicker:not(.open) {
        position: absolute;
        transition: opacity 0.3s;
        opacity: 0;
        z-index: -1;
    }

    .date-picker {
        -ms-flex-direction: column;
        -webkit-box-orient: vertical;
        flex-direction: column;
        background: #fff;
    }

    .date-picker, .date-picker__row, .weekday__row {
        -webkit-box-direction: normal;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex
    }

    .date-picker__row, .weekday__row {
        -ms-flex-direction: row;
        -webkit-box-orient: horizontal;
        flex-direction: row
    }

    .weekday__row {
        background: #f7f7f7;
    }

    .date-picker__cell, .weekday__cell {
        -ms-flex: 1;
        -ms-flex-align: center;
        -ms-flex-direction: row;
        -ms-flex-pack: center;
        -webkit-box-align: center;
        -webkit-box-direction: normal;
        -webkit-box-flex: 1;
        -webkit-box-orient: horizontal;
        -webkit-box-pack: center;
        align-items: center;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        flex: 1;
        flex-direction: row;
        justify-content: center
    }

    .date-picker__header {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        position: relative;
        padding: 0.2em 0;
        background: #f8f8f8;
        border-bottom: 1px solid #c5c5c5;
        color: #212020;
        margin: 0 auto;
    }

    .date-picker__month-header, .date-picker__year-header {
        -ms-flex: 1;
        -webkit-box-flex: 1;
        flex: 1;
        border: none;
        background: none;
        line-height: 1.8em;
        text-align: center;
        font-size: 15px;
        font-family: 'Metropolis Bold', sans-serif;
        padding: 2.5px;
    }

    .date-picker__day {
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        cursor: default;
        user-select: none;
        padding: 5px 10px;
        background: #f6f6f6;
        border: 1px solid #ccc;
        border-radius: 3px;
        margin: 1px;
    }

    .date-picker__day:not(.date-picker__day--next):hover {
        box-shadow: 0 1px 1px rgba(0,0,0,0.2);
        color: #fff;
        background: #30a8ee;
        border-color: #1e95da;
    }

    .date-picker__day--next, .date-picker__day--previous {
        opacity: 0.25;
    }

    .date-picker__day--disabled {
        opacity: .1
    }

    .date-picker__cell--selected {
        box-shadow: 0 1px 1px rgba(0,0,0,0.2);
        color: #222;
        background: #ffff00;
        border-color: rgb(237, 236, 0);
    }

    .date-picker__days, .date-picker__months, .date-picker__years {
        margin-bottom: 0.4em;
    }

    .date-picker__months, .date-picker__years {
        padding: 10px 0;
        margin-bottom: 0.4em;
        max-height: 144px;
        overflow-y: scroll;
    }

    .date-picker__month-button, .date-picker__year-button {
        margin-bottom: 3px;
        width: 100%;
        background: #fff;
        border: none;
        color: #999;
        font-size: 1.1em;
        padding: 3px 0;
    }

    .date-picker__month-button:hover, .date-picker__year-button:hover {
        background-color: #206ec5;
        color: white;
    }

    .text-slider__value {
        text-align: center
    }

    .time-picker {
        -ms-flex-direction: row;
        -ms-flex-pack: center;
        -webkit-box-direction: normal;
        -webkit-box-orient: horizontal;
        -webkit-box-pack: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        flex-direction: row;
        justify-content: center
    }

    .datetime-picker {
        position: relative
    }

    .datetime-picker-main {
        position: absolute;
        z-index: 1
    }

    .datetime-picker-inline, .datetime-picker-main {
        -webkit-box-sizing: border-box;
        background: #fff;
        box-sizing: border-box;
        width: 320px;
        border: 1px solid #ddd;
        position: absolute;
        z-index: 10;
        box-shadow: inset 0 1px 1px rgba(0,0,0,0.075), 0 0 8px rgba(0,0,0,0.1);
    }

    .date-picker__month-header, .date-picker__year-header {
        align-items: center;
        justify-items: center;
        margin: 0 auto;
        padding: 0;
    }

    .date-picker__month-header {
        margin-left: 5em;
        margin-right: 0.25em;
    }

    .date-picker__year-header {
        margin-right: 5.25em;
    }

    .date-picker__prev_month, .date-picker__next_month, .date-picker__prev_year, .date-picker__next_year, .date-picker__prev_decade, .date-picker__next_decade {
        border: none;
        background: none;
        padding: 0;
        position: relative;
        bottom: 2px;
    }

    .datetime-picker-inline {
        position: relative
    }

    .datetime-picker-inline--disabled {
        opacity: .7
    }

    .datetime-picker-inline--disabled:before {
        bottom: 0;
        content: "";
        display: block;
        left: 0;
        position: absolute;
        right: 0;
        top: 0
    }

    .time-picker__button {
        display: none;
    }

    .date-picker__button {
        margin-bottom: 10px;
        width: 100%
    }

    .clear__button, .close__button, .today__button {
        margin-top: 10px;
        width: 100%
    }

    .weekday__cell {
        padding: .7em .3em;
        text-align: center;
        border: 0;
        border: none;
        font-family: 'Metropolis SemiBold', sans-serif;
    }

    .title {
        margin: 0 auto;
        line-height: 1.8em;
        text-align: center;
        font-size: 15px;
        font-family: 'Metropolis Bold', sans-serif;
    }

    .header {
        position: relative;
        padding: 0.2em 0;
        background: #f8f8f8;
        display: flex;
        border-bottom: 1px solid #c5c5c5;
        color: #212020;
    }

    .arrow {
        position: relative;
        margin: 5px 6px 3px 6px;
    }

    .arrow:hover {
        box-shadow: 0 1px 1px rgba(0,0,0,0.2);
    }

    table {
        width: 100%;
        font-size: 15px;
        border-collapse: collapse;
        margin: 0 0 .4em;
    }

    thead {
        background: #f7f7f7;

    }

    th {
        padding: .7em .3em;
        text-align: center;
        border: 0;
        border: none;
    }

    .arrow {
        padding: 1px;
        height: 12px;
        width: 12px;
        fill: #444;
        position: relative;
        z-index: 1;
    }

    .dot {
        height: 9px;
        width: 9px;
        border-radius: 50%;
        background: #fff;
        position: relative;
        margin-top: -16.5px;
        margin-left: 5px;
        z-index: 0;
    }

    .flipLeft {
        -moz-transform: scaleX(-1);
        -o-transform: scaleX(-1);
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
        filter: FlipH;
        -ms-filter: "FlipH";
    }

</style>