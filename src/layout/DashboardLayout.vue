<template>
    <v-app id="inspire">
           
          <v-navigation-drawer v-model="on_drawer" app color="blue lighten-1" dark> 

            <v-row>
                <v-col cols="12" class="text-center mt-5 mb-3">
                    <img src="@/assets/logo-supernova.png" alt="">
                </v-col>   
            </v-row>
          
                

                <v-divider ></v-divider>  

                 <v-list dense>
                    <v-list-item to="/" color="white" >
                        <v-list-item-icon>
                        </v-list-item-icon>
                        <v-list-item-title ><v-icon class="mr-5">mdi-warehouse</v-icon>Almacenes</v-list-item-title>
                    </v-list-item>
                     <v-list-item to="/traspasos" color="white" >
                        <v-list-item-icon>
                        </v-list-item-icon>
                        <v-list-item-title ><v-icon class="mr-5">mdi-swap-horizontal</v-icon>Traspasos</v-list-item-title>
                    </v-list-item>

                   
                 </v-list>

            </v-navigation-drawer>
        
            <v-app-bar app color="white" >
              <v-app-bar-nav-icon @click="on_drawer = !on_drawer" color="primary"><v-icon>mdi-menu</v-icon></v-app-bar-nav-icon>
        
              <v-toolbar-title></v-toolbar-title>


          </v-app-bar>
            <v-main>
              <v-container>
                  <slot/>
              </v-container>
            </v-main>
        </v-app> 
</template>

<script>
export default {
    data(){
        return{
            on_drawer:true
        }
    }
}
</script>

<style>

</style>