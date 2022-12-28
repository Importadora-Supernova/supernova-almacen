<template>
   <v-container  class="px-5 py-3">
        <v-row class="mt-0">
            <v-col cols="12" sm="7" md="7">
                <v-card class="elevation-8 pt-5" >
                    <v-card-title ><h3 class="primary--text text-center">Productos por Almacen <v-icon color="primary">mdi-warehouse</v-icon> </h3></v-card-title>
                    <v-card-text>
                        <pie-chart :data="informacion"></pie-chart>
                        <v-row class="mt-2">
                            <v-col cols="6" sm="4" md="4" v-for="item in datos" :key="item.id">
                                 <div class="chip-info text-center pb-1 primary">
                                    <span class="white--text">{{item.nombre_almacen}} :</span><br> 
                                    <span class="white--text"> {{item.cantidades}} Productos</span>
                                 </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="5" md="5">
                <v-card elevation="8" class="card-info text-center pt-3">
                         <h3 class="primary--text" >Estadisticas</h3>
                        <div class="informacion">
                            <div class="item-info primary">
                                 <v-row class="pt-3">
                                    <v-col cols="12" class="d-flex justify-space-around" style="align-items:center;">
                                        <h3>
                                            Almacenes Registrados
                                        </h3>
                                        <h3>{{almacenes.length}} </h3>
                                        <v-icon color="white">mdi-warehouse</v-icon>
                                    </v-col>
                                 </v-row>
                            </div>
                            <div class="item-info primary">
                                 <v-row class="pt-3">
                                    <v-col cols="12" class="d-flex justify-space-around" style="align-items:center;">
                                        <h3>
                                            Total productos en Almacen
                                        </h3>
                                        <h3>{{products.length}} </h3>
                                        <v-icon color="white">mdi-cart</v-icon>
                                    </v-col>
                                 </v-row>
                            </div>
                            <div class="item-info primary">
                                 <v-row class="pt-3">
                                    <v-col cols="12" class="d-flex justify-space-around" style="align-items:center;">
                                        <h3>
                                            Total traslados realizados
                                        </h3>
                                        <h3>{{Traslados.length}} </h3>
                                        <v-icon color="white">mdi-compare-horizontal</v-icon>
                                    </v-col>
                                 </v-row>
                            </div>
                        </div>
                </v-card>
            </v-col>
            <v-col cols="12" >
                 <table-data-traslados></table-data-traslados>
            </v-col>
        </v-row>
   </v-container>
</template>

<script>
import axios from 'axios'
import {mapState,mapActions} from 'vuex'
import TableDataTraslados from '@/components/tableDataTraslados.vue'
export default {
    components:{TableDataTraslados},
    data(){
        return{
            informacion:[],
            datos:[],
            products:[],
            almacenes:[]
        }
    },
    computed:{
        ...mapState('traslados',['Traslados'])
    },
    mounted(){
        this.generalData();
    },
    methods:{

        ...mapActions('traslados',['getDataTraslados']),


        async generalData(){
            const content = await Promise.all([
                this.getAllCantidades(),this.getAllProducts(),this.getAllAlmacenes(),this.getDataTraslados()
            ])
            return content;
        },

        async getAllCantidades(){

            try{
                const response = await axios.get('/api/cantidadProductosAlmacen',{
                    // headers:
                        // {
                        //     'Bearer': sessionStorage.getItem('token')
                        // } 
                });
                this.datos = response.data
                this.renderData(response.data);
                 return this.datos;
            }catch(e){

                console.log(e)

            }
        },

        renderData(data){

            let datos = [];

            data.forEach(element => {
                let info = [];

                info.push(element.nombre_almacen);
                info.push(parseInt(element.cantidades));
                
                datos.push(info);
            });

            this.informacion = datos;

        },

        async getAllProducts(){
            try{
                const response = await axios.get('/api/productos?total=total',{
                    // headers:
                    //     {
                    //         'Bearer': sessionStorage.getItem('token')
                    //     } 
                });
                this.products = response.data;
                return this.products;
            }catch(e){
                console.log(e);
            }
        },

          async getAllAlmacenes(){
            try{
                const response = await axios.get('/api/',{
                    // headers:
                    //     {
                    //         'Bearer': sessionStorage.getItem('token')
                    //     } 
                })
                this.almacenes = response.data
            }catch(e){
                console.log(e)
            }
        },

        
    }
}
</script>

<style lang="scss">
    .chip-info{
        width: 100%;
        padding: 5px;
        box-sizing: border-box;
        padding-bottom: 0px;
        border-radius: 5px;
        // background: rgb(8,34,138);
        // background: linear-gradient(90deg, rgba(8,34,138,1) 33%, rgb(3, 82, 111) 72%);
    }
    .card-info{
        height: 460px !important;
    }
    .informacion{
        width: 90%;
        height: 50px;
        margin: auto;
        padding-top: 30px;
        padding-bottom: 20px;
        box-sizing: border-box;
        .item-info{
            width: 100%;
            height: 80px;
            color: #fff;
            margin-bottom: 40px;
            border-radius: 5px;
            // &:nth-child(1){
            //     background: rgb(8,34,138);
            //     background: linear-gradient(90deg, rgba(8,34,138,1) 33%, rgb(3, 77, 104) 72%);
            // }
            // &:nth-child(2){
            //     background: rgb(8,126,138);
            //     background: linear-gradient(90deg, rgba(8,126,138,1) 33%, rgba(114,2,225,1) 72%);
            // }
            // &:nth-child(3){
            //     background: rgb(8,11,138);
            //     background: linear-gradient(90deg, rgba(8,11,138,1) 36%, rgb(6, 63, 89) 72%);
            // }
        }
        
    }
</style>
