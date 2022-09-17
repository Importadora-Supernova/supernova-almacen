<template>
    <v-app id="inspire">
           
          <v-navigation-drawer v-model="on_drawer" app color="primary" dark> 

            <v-row>
                <v-col cols="12" class="text-center mt-5 mb-3">
                    <img src="@/assets/logo-supernova.png" alt="">
                </v-col>   
            </v-row>
          
                

                <v-divider ></v-divider>  

                 <v-list dense>
                    <v-list-item to="/home" color="white" >
                        <v-list-item-icon>
                        </v-list-item-icon>
                        <v-list-item-title ><v-icon class="mr-5">mdi-home</v-icon>Inicio</v-list-item-title>
                    </v-list-item>
                    <v-list-item to="/almacenGeneral" color="white" >
                        <v-list-item-icon>
                        </v-list-item-icon>
                        <v-list-item-title ><v-icon class="mr-5">mdi-warehouse</v-icon>Almacen General</v-list-item-title>
                    </v-list-item>
                    <v-list-item to="/almacen" color="white" >
                        <v-list-item-icon>
                        </v-list-item-icon>
                        <v-list-item-title ><v-icon class="mr-5">mdi-warehouse</v-icon>Almacenes</v-list-item-title>
                    </v-list-item>
                     <v-list-item to="/traspasos" color="white" >
                        <v-list-item-icon>
                        </v-list-item-icon>
                        <v-list-item-title ><v-icon class="mr-5">mdi-transfer</v-icon>Traspasos</v-list-item-title>
                    </v-list-item>

                   
                 </v-list>

            </v-navigation-drawer>
        
            <v-app-bar app color="white" >
              <v-app-bar-nav-icon @click="on_drawer = !on_drawer" color="primary"><v-icon>mdi-menu</v-icon></v-app-bar-nav-icon>
        
              <v-toolbar-title></v-toolbar-title>
            
            <div class="text-center logout-session">
                    <v-menu>
                    <template v-slot:activator="{ on: menu, attrs }">
                        <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                            <span>{{user}}</span>
                            <v-btn
                                class="mx-2"
                                fab
                                dark
                                small
                                color="primary"
                                v-bind="attrs"
                                 v-on="{ ...tooltip, ...menu }"
                                >
                                <v-icon dark>
                                    mdi-account
                                </v-icon>
                                </v-btn>
                        </template>
                        <span>Cerrar sesion</span>
                        </v-tooltip>
                    </template>
                    <v-card>
                        <v-list>
                            <v-list-item>
                                <v-list-item-avatar>
                                    <v-btn icon color="primary" @click="Logout()">
                                        <v-icon>mdi-logout</v-icon>
                                    </v-btn>
                                    
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title>
                                          <v-btn text color="primary" @click="Logout()"> Cerrar Sessión</v-btn> 
                                        </v-list-item-title>
                                    </v-list-item-content>

                                    <v-list-item-action>
                                    <v-btn
                                        color="error"
                                        text
                                        @click="fav = !fav"
                                    >
                                        Cancelar
                                    </v-btn>
                                    </v-list-item-action>
                                </v-list-item>
                        </v-list>
                    </v-card> 
                    </v-menu>
                </div>
              


          </v-app-bar>
            <v-main>
              <v-container>
                  <slot/>
              </v-container>
            </v-main>
        </v-app> 
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data(){
        return{
            on_drawer:true,
            user:sessionStorage.getItem('user'),
        }
    },

    methods:{
        ...mapActions('login',['Logout']),
    }
}
</script>

<style>
    .logout-session{
            position: absolute;
            right: 5px;
    }
</style>