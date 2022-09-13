
<template>
  <v-app>
       <component :is="layout">
             <router-view :layout.sync="layout"/>
        </component>
  </v-app>
</template>

<script>

const defaultLayout = 'dashboard-layout'
export default {
  name: 'App',
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



</style>
