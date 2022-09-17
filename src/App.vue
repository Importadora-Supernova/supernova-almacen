
<template>
  <v-app>

      <overlay-await></overlay-await>

      <modal-alert></modal-alert>

       <component :is="layout">
             <router-view :layout.sync="layout"/>
        </component>
  </v-app>
</template>

<script>

const defaultLayout = 'dashboard-layout'
import OverlayAwait from '@/components/elements/OverlayAwait.vue'
import modalAlert from '@/components/elements/ModalAlert.vue'
export default {
  name: 'App',
  components:{OverlayAwait,modalAlert},
  data: () => ({
    
  }),

    computed: {
            layout (){
              return (this.$route.meta.layout || defaultLayout)
               
            }
  },
};
</script>
<style lang="scss">
  .container{
    padding: 0 !important;
    box-sizing: border-box !important;
  }
  @media (min-width: 1264px){ 
    .container {
        max-width: 100% !important;
    }
  }

</style>
