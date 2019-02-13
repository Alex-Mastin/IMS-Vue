<template>
  <div id="app">
    <navigation v-if="this.showNavigation()"></navigation>
    <router-view/>
  </div>
</template>

<script>
    import Navigation from '@/components/Navigation'
    export default {
        name: 'App',
        components: {
            Navigation
        },
        data() {
            return {

            }
        },
        methods: {
            showNavigation() {
              return this.$route.name !== "Print Queue" && this.$route.name !== "Page Not Found"
            }
        }
    }
</script>

<style>
    @font-face {
        font-family: 'Metropolis Thin';
        src: url(./assets/fonts/Metropolis-Thin.ttf)
    }

    @font-face {
        font-family: 'Metropolis Light';
        src: url(./assets/fonts/Metropolis-Light.ttf)
    }

    @font-face {
        font-family: 'Metropolis Regular';
        src: url(./assets/fonts/Metropolis-Regular.ttf)

    }

    @font-face {
        font-family: 'Metropolis Medium';
        src: url(./assets/fonts/Metropolis-Medium.ttf)
    }

    @font-face {
        font-family: 'Metropolis SemiBold';
        src: url(./assets/fonts/Metropolis-SemiBold.ttf)
    }

    @font-face {
        font-family: 'Metropolis Bold';
        src: url(./assets/fonts/Metropolis-Bold.ttf)
    }

    @font-face {
        font-family: 'Metropolis Black';
        src: url(./assets/fonts/Metropolis-Black.ttf)
    }

    /* ===== MEDIA QUERIES =====
     * https://gist.github.com/Mikodes/be9b9ce42e46c3d4ccb6
     */
    @media  screen and (max-width: 1600px) {
      /* Dashboard */
      #dashboard .dashboard-section {
        width: 120%!important;
      }

      /* Store Stock / Returns Tracker */
      #storestock #column, #returns #column {
        width: 95%!important;
      }

      /* Sign Maker */
      #new-sign .form-column {
        width: 50.5%;
      }

      /* Sign Maker */
      #new-sign .preview {
        width: 40%;
      }
    }

    @media  screen and (max-width: 1920px) {
      /* Dashboard */
      #dashboard .dashboard-section {
        width: 100%!important;
      }

      /* Store Stock / Returns Tracker */
      #storestock #column {
        width: 98%!important;
      }

      #returns #column {
        width: 97.25%!important;
      }

      /* Sign Maker */
      #new-sign .form-column {
        width: 60.5%;
      }

      /* Sign Maker */
      #new-sign .preview {
        width: 35%;
      }
    }



    html, body {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
    }

    body {
        line-height: 1.42857143;
        color: #222;
    }

    body, button, select, input {
      font-family: 'Metropolis Regular', 'Helvetica', 'Arial', sans-serif;
      font-size: 15px;
      letter-spacing: -0.045rem;
    }

    a {
      color: #267CB9;
      text-decoration: none;
      cursor: pointer;
    }

    a:hover, a:focus {
      color: #069;
      font-weight: normal;
      outline: 0;
    }

    *:focus {
        outline: 0;
    }

    .font-sm, .font-md, .font-lg, .font-xl {
      font-family: 'Metropolis Thin', sans-serif;
    }

    .font-xs {
      font-size: 11px;
    }

    .font-s {
      font-size: 12px;
    }

    .font-sm {
      font-size: 13px;
    }

    .font-lg {
      font-size: 20px;
    }

    .font-xl {
      font-size: 26px;
    }

    .font-light {
      font-family: "Metropolis Light" !important;
    }

    .font-regular {
      font-family: "Metropolis Regular" !important;
    }

    .font-sb {
      font-family: "Metropolis SemiBold" !important;
    }

    .legend {
      margin: -10px 0 0;
      font-size: 36px;
    }

    .uppercase {
      text-transform: uppercase;
    }

    .left {
      float: left !important;
    }

    .right {
      float: right !important;
    }

    .text-void {
      color: #666 !important;
    }

    .text-muted {
      color: #777 !important;
    }

    .text-center {
      text-align: center!important;
    }

    .overflow {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .bottom-space {
      display: inline-block;
      padding-bottom: 14px !important;
    }

    .blue {
      color: #1093de;
    }

    .red {
      color: #db3f26;
    }

    .green {
      color: #388a10;
    }

    .yellow {
      color: #f4a204;
    }

    .width-5 {
      width: 5%;
    }

    .width-10 {
      width: 10%;
    }

    .width-15 {
      width: 15%;
    }

    .width-20 {
      width: 20%;
    }

    .width-884 {
      width: 88.4%
    }

    .width-100 {
      width: 100%;
    }

    .svg-18 {
      width: 18px;
      height: 18px;
    }

    .column {
      top: 0.6rem;
      left: 12.4rem;
      position: absolute;
      z-index: 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #ededed;
    }

    table :not(thead) tr:hover {
      background-color: #fafafa;
    }

    th {
      color: #444;
    }

    p, ul, ol, table, pre, dl {
      margin: 0 0 20px;
    }

    p {
      margin: 0 0 10.5px;
    }

    .btn {
      border-radius: 3px;
      display: inline-block;
      margin-bottom: 0;
      font-weight: 400;
      text-align: center;
      vertical-align: middle;
      cursor: pointer;
      border: 1px solid transparent;
      padding: 5px 12px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      font-size: 15px;
    }

    .btn-large {
      padding: 10px 24px;
    }

    .btn-small {
      padding: 5px 10px;
      font-size: 13px;
      line-height: 1.5;
      border-radius: 3px;
    }

    .btn-primary {
      color: #fff;
      background-color: #2FA3E6;
      border-color: #1E95DA;
    }

    .btn-primary:hover {
      border-color: #1E95DA;
      background-color: #30A8EE;
      box-shadow: 0 1px 1px rgba(0,0,0,0.2);
    }

    .btn-default {
      color: #333;
      background-color: #fff;
      border-color: #ddd;
    }

    .btn-default:hover, .btn-default:focus {
      background-color: #fff;
      border-color: #bfbfbf;
      box-shadow: 0 1px 1px rgba(0,0,0,0.1);
    }

    .btn-33 {
      height: 33px;
    }

    .no-select {
      user-select: none;
    }

    .no-results {
      text-align: center;
      border-color: white;
    }

    .column-header {
      width: 85%;
    }

    .header-btm-border {
      border-bottom: 1px solid #ededed;
      height: 65px;
      overflow: visible;
    }

    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      position: absolute;
      right: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #E0E0E0;
    }

    .input-15, .input-25, .input-346, .input-50 {
      padding-left: 15px;
      padding-right: 15px;
    }

    h1, h2, h3, h4, h5, h6 {
      font-weight: normal;
      line-height: 1.1;
    }

    .dropdown {
      max-width: inherit!important;
    }


</style>
