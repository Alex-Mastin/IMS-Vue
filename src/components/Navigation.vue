<template>
    <div class="navigation">
        <topbar></topbar>
        <main>
            <sidenav></sidenav>
        </main>
    </div>
</template>

<script>
    import Topbar from '@/components/Topbar'
    import Sidenav from '@/components/Sidenav'


    export default {
        name: "navigation",
        components: {
            Topbar,
            Sidenav
        }
    }
</script>

<style scoped>


</style>