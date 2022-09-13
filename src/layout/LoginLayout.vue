<template>
    <v-app id="inspire" class="login">
          <slot/>
    </v-app>
</template>

<script>
export default {

}
</script>

<style lang="scss">

    .login{
        background-color: #139789 !important;
        // background-image: url('../assets/background-login-realstate.png') !important;
        // background-repeat: no-repeat !important;
        // background-position: center !important;
        // background-size: cover !important;
        @media(max-width:425px){
            // background-image: url('../assets/background-login-real-state-mob.png') !important;
        }
    }

</style>