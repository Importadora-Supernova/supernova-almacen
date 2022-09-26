
<template>
  <v-app>

      <notification-message></notification-message>

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
import notificationMessage from '@/components/elements/NotificationMessage.vue'
export default {
  name: 'App',
  components:{OverlayAwait,modalAlert,notificationMessage} ,
  data: () => ({
      alert:false,
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
