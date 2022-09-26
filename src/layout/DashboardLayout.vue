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
                    <v-list-item to="/productosAlmacen" color="white" >
                        <v-list-item-icon>
                        </v-list-item-icon>
                        <v-list-item-title ><v-icon class="mr-5">mdi-package-variant</v-icon>Productos Almacen</v-list-item-title>
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
                    <v-list-group color="white" >
                        <template v-slot:activator>
                            <v-list-item-icon class="pl-10">  
                                <v-icon>mdi-cart-arrow-down</v-icon>
                            </v-list-item-icon>
                                <v-list-item-content style="font-size:12px;font-weight:600" >Almacen de Garantia</v-list-item-content>
                        </template>
                                <span >
                                    <v-list-item to="/garantia/almacen" color="white">
                                        <v-list-item-title  class="pl-10">
                                            <v-icon class="mr-2">mdi-warehouse</v-icon>
                                            Almacen
                                        </v-list-item-title>
                                    </v-list-item>
                                </span>
                                <!-- <span>
                                    <v-list-item to="/garantia/tienda" color="white">
                                        <v-list-item-title class="pl-10">
                                            <v-icon class="mr-2">mdi-store</v-icon>
                                            Tienda
                                        </v-list-item-title>
                                    </v-list-item>
                                </span> -->
                    </v-list-group>

                   
                 </v-list>

            </v-navigation-drawer>
        
            <v-app-bar app color="white" >
              <v-app-bar-nav-icon @click="on_drawer = !on_drawer" color="primary"><v-icon>mdi-menu</v-icon></v-app-bar-nav-icon>
        
              <v-toolbar-title></v-toolbar-title>
            
            <div class="temporizador">
                <!-- Tiempo de expiracion de tu sesion: {{hora}}:{{minutos}}:{{segundos}} -->
            </div>
            
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
import {mapActions,mapMutations} from 'vuex'
export default {
    data(){
        return{
            on_drawer:true,
            user:sessionStorage.getItem('user'),
            hora:null,
            minutos:null,
            segundos:null
        }
    },

    mounted(){
       //this.countdown('Sep 20 2022 15:10:05 GMT-0500')
    },

    methods:{
        ...mapActions('login',['Logout']),
        ...mapMutations('modalAlert',['setActiveModal','setDesactiveModal']),

        getRemainTime(deadline){
        
            let now = new Date(),
                remainTime = (new Date(deadline) - now + 1000) / 1000,
                remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2),
                remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2),
                remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2),
                remainDays = Math.floor(remainTime / (3600 * 24));

            return {
                remainTime,
                remainSeconds,
                remainMinutes,
                remainHours,
                remainDays
            }
        },

        countdown(deadline){

                const timerUpdate = setInterval(() => {
                    let time = this.getRemainTime(deadline);
                    this.hora = time.remainHours;
                    this.minutos = time.remainMinutes;
                    this.segundos = time.remainSeconds;
                                    

                    if (time.remainTime <= 1) {
                        clearInterval(timerUpdate)
                        // let data = {"status":"error","icon":"mdi-account-off","title":"Alerta","text":'Tu session ha expirado',"textButton":"Cerrar" }
                        // this.setActiveModal(data)
                        // setTimeout(()=>{
                        //     this.setDesactiveModal()
                        //      this.Logout()
                        // },2500);
                    }
                }, 1000)

            }
    }
}
</script>

<style>
    .logout-session{
            position: absolute;
            right: 5px;
    }
</style>