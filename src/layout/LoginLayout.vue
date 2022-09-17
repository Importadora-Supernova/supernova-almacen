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
        // background-color: #139789 !important;
        background-image: url('../assets/background-supernova.png') !important;
        background-repeat: no-repeat !important;
        background-position: center !important;
        background-size: cover !important;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        @media(max-width:620px){
             background-image: url('../assets/background-supernova-mob.png') !important;
        }
        
    }

</style>