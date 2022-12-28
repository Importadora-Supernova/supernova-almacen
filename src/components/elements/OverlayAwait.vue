<template>
   <v-container>
       <v-overlay :value="estado" class="text-center" :absolute="true">
          <div class="container-gif">
            <img src="../../assets/supernova.gif" width="130" alt="" v-if="estado">
            <p class="white--text">Cargando por favor espere...</p>
          </div>
          
       </v-overlay>
       
   </v-container>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState('overlay',['estado'])
    }
}
</script>

<style lang="scss">
    .container-gif{
        position: fixed;
        top: 45%;
    }
</style>