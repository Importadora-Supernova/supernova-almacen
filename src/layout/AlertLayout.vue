<template>
    <v-app id="inspire" class="alert-container">
        <slot/>
    </v-app>
</template>

<script>
export default {

}
</script>

<style lang="scss">

    .alert-container{
        background-image: url('../assets/background-alert.png') !important;
        background-repeat: no-repeat !important;
        background-position: center !important;
        background-size: cover !important;
        background-color: #e0e3e2 !important;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;    
    }

</style>