<template>
    <body v-title="title">
        <div class="error">
            <div class="text-center">
                <h1>404 Error</h1>
                <h3 class="text-grey">Whoops! Looks like this page doesn't exist.</h3>
                <btn large content="To Dashboard" @click.native="toDashboard(false)" @click.middle="toDashboard(true)" primary></btn>
                <btn large content="Go Back" @click.native="goBack" style="margin-left: 0.75rem"></btn>
            </div>
        </div>
    </body>
</template>

<script>
    import Btn from '@/components/Btn.vue'

    export default {
        name: "page-not-found",
        components: {
            Btn,
        },
        data() {
            return {
                title: 'Page Not Found | Device Pitstop - Maple Grove'
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            toDashboard(newTab) {
                if (!newTab) {
                    this.$router.push({
                        path: '/dashboard',
                    })
                }

                // middle click support
                else {
                    let routeData = this.$router.resolve({name: 'Dashboard'});
                    window.open(routeData.href, '_blank');
                }

            }
        }
    }
</script>

<style scoped>
    body {
        background-color: #f1f1f1;
        height: 40vh;
        border-bottom: 1px solid #e0e0e0;
    }

    h1 {
        font-family: 'Metropolis Black';
        color: #555;
    }

    h3 {
        font-family: 'Metropolis Thin'
    }

    .error {
        font-size: 150%;
    }

    .text-center {
        text-align: center;
        margin-top: 6%;
    }

    .text-grey {
        color: #9f9f9f;
    }

</style>