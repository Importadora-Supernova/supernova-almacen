<template>
     <div class="container-login">
        <div class="container-text">
             <img src="@/assets/logo-login.png" alt="" width="300">
        </div>
        <div class="login-section">
             <div class="login-session">
                 <v-row>
                    <v-col cols="12" class="text-center">
                        <img src="@/assets/icon-supernova.png" width="80">
                        <h2>Almacen</h2>
                        <v-text-field label="Usuario"    type="text"  v-model="dataLogin.username" append-icon="mdi-account"></v-text-field>
                         <v-text-field label="Contraseña" type="password" v-model="dataLogin.password"  append-icon="mdi-lock"></v-text-field>
                         <v-btn class="primary" @click="LoginSession()">Entrar</v-btn> 
                         <p class="mt-2">--- O ---</p>
                         <v-btn text color="info">Olvidaste tu contraseña</v-btn>
                    </v-col>
                 </v-row>
             </div>
        </div>
       
   </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data(){
        return{
              dataLogin:{
                username:'',
                password:'',
            },
        }
    },

    methods:{

        ...mapActions('login',['Login'] ),
        
          LoginSession(){
                this.Login(this.dataLogin)

        },
    }
}
</script>

<style lang="scss">
    .container-login{
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: space-around;
        align-items: center;
        @media(max-width:620px){
            justify-content: center;
            flex-direction: column;
        }
        .container-text{
            width: 40%;
            height: 400px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
             @media(max-width:620px){
               display: none;
            }
        }
        .login-section{
            width: 40%;
            height: 430px;
            display: flex;
            justify-content: center;
            @media(max-width:620px){
                width: 100%;
                height: 100vh;
                align-items: center;
            }
            .login-session{
                width: 400px;
                height: auto;
                background: rgba($color: #fff, $alpha: 0.8);
                padding: 30px;
                position: relative;
                border-radius: 10px;
                @media(max-width:425px){
                    width: 92%;
                    height: 450px;
                }
          }
        }
        
    }

    .fade-enter-from,
    .fade-leave-to{
        opacity: 0;
    }

    .fade-enter-active,
    .fade-leave-active{
        transition: opacity 0.1s ease-out;
    }
    
</style>