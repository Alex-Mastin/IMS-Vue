<template>
    <div id="support" v-title="title">
        <div class="column width-884">
            <div class="support-column">
                <h3 class="font-xl">Let's Get Those Problems Resolved!</h3>
                <p class="text-muted">Request support for any problems you may be having.</p>
                <div class="btn-container">
                    <btn primary content="Request New Feature" @click.native="routeTo('/support/feature-request')" large code></btn>
                    <btn content="Report a Bug" @click.native="routeTo('/support/report-a-bug')" large bug></btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Btn from '@/components/Btn.vue'

    export default {
        name: "Support",
        components: {
            Btn
        },
        data() {
            return {
                title: 'Support | Device Pitstop - Maple Grove',
            }
        },
        methods: {
            routeTo(route) {
                this.$router.push(route);
            }
        }
    }
</script>

<style scoped>
    .support-column {
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
</style>