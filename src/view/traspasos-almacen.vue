<template>
   <v-container class="px-5 py-3">
      <v-row>
        <v-col cols="12">
            <v-card>
                <v-card-title class="primary">
                    <h3 class="white--text">Traspaso de productos entre almacenes</h3>
                </v-card-title>
                <v-card-text>
                    <v-row class="mt-2">
                           <v-col cols="12" sm="4" md="4">
                                <v-autocomplete
                                label="Almacen de Origen"
                                :items="origenes"
                                item-text="nombre_almacen"
                                item-value="id"
                                append-icon="mdi-warehouse"
                                v-model="almacen_origen"
                                @change="verificarAlmacenOrigen(almacen_origen)"
                                ></v-autocomplete>
                            </v-col> 
                             <v-col cols="12" sm="4" md="4">
                                <v-autocomplete
                                label="Almacen de Destino"
                                :items="destinos"
                                item-text="nombre_almacen"
                                item-value="id"
                                append-icon="mdi-warehouse"
                                v-model="almacen_destino"
                                ></v-autocomplete>
                            </v-col> 
                             <v-col cols="12" sm="4" md="4">
                                <v-autocomplete
                                label="Producto"
                                :items="products"
                                item-text="fullname"
                                item-value="id_producto"
                                append-icon="mdi-cart-outline"
                                return-object
                                v-model="producto"
                                @change="searchproductsCodigo(producto)"
                                ></v-autocomplete>
                            </v-col> 
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                              <v-card outlined v-if="transfer">
                                    <v-simple-table >
                                        <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th class="text-center">
                                                    Almacen
                                                </th>
                                                <th class="text-center">
                                                    Nombre Producto
                                                </th>
                                                 <th class="text-center">
                                                    Codigo Producto
                                                </th>
                                                 <th class="text-center">
                                                    Cantidad Disponible
                                                </th>
                                                 <th class="text-center">
                                                   Cantidad a transferir
                                                </th>
                                                <th class="text-center">
                                                    Transferir
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr
                                            >
                                                <td class="text-center">{{ producto.nombre_almacen}}</td>
                                                <td class="text-center">{{ producto.nombre_producto  }}</td>
                                                <td class="text-center">{{ producto.codigo_producto }}</td>
                                                <td class="text-center">{{ producto.cantidad_producto }}</td>
                                                <td class="text-center">
                                                    <v-text-field type="number" v-model="producto.cantidad"></v-text-field>
                                                </td>
                                                <td class="text-center">
                                                    <v-btn class="primary" @click="verificarTransfer(producto)" >Trasladar <v-icon class="ml-1">mdi-compare-horizontal</v-icon> </v-btn>
                                                </td>
                                            </tr>
                                        </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
       </v-row>
        <v-row>
            <v-col cols="12">

                <table-data-traslados></table-data-traslados>

            </v-col>
        </v-row>
   </v-container>
</template>

<script>
import axios from 'axios';
import {mapMutations,mapActions} from 'vuex';
import tableDataTraslados from '@/components/tableDataTraslados.vue'
export default {
    components:{tableDataTraslados},
    data(){
        return{
            almacenes:[],
            products:[],
            producto:{},
            productosCodigo:[],
            almacen_origen:'',
            almacen_destino:'',

            destinos:[],
            origenes:[],
            transfer:false,
        }
    },
      computed:{
          fechaActual(){
                    const f = new Date()
                    let day = f.getDate();
                    let month = f.getMonth();
                    let year = f.getFullYear();

                    month = month+1

                    day   = ('0' + day).slice(-2);
                    month = ('0' + month).slice(-2);
                    return `${day}/${month}/${year}`
                },
    },
    mounted(){
        this.getAllAlmacenes();
    },

    methods:{

        ...mapMutations('modalAlert',['setActiveModal','setDesactiveModal']),

        ...mapMutations('overlay',['setActiveOverlay','setDesactiveOverlay']),

         ...mapActions('traslados',['getDataTraslados']),

         async getAllAlmacenes(){
            try{
                const response = await axios.get('/api/',{
                    //  headers:
                    //     {
                    //         'Bearer': sessionStorage.getItem('token')
                    //     } 
                })
                this.almacenes = response.data

               this.origenes =  [...this.almacenes];
               this.destinos =  [...this.almacenes];
                
            }catch(e){
                console.log(e)
            }
        },


        async verificarAlmacenOrigen(id){
            const filtro = this.almacenes.filter(item => item.id != id);
            this.destinos = [...filtro];
            try{
                const response = await axios.get(`/api/productosAlmacen?id=${id}`,{
                    //  headers:
                    //     {
                    //         'Bearer': sessionStorage.getItem('token')
                    //     } 
                });
                this.products = response.data
                console.log(response.data)
            }catch(e){
                console.log(e);
            }

        },

        async searchproductsCodigo(producto){
            console.log(producto)
            if(this.almacen_origen === '' || this.almacen_destino === ''){
                let data = {"status":"warning","icon":"mdi-warehouse","title":"Alerta","text":'Debes agregar los almacenes de origen y destino',"textButton":"Cerrar" }
                this.setActiveModal(data)
                setTimeout(()=>{
                    this.setDesactiveModal()
                },3000);
                this.transfer = true
            }else{
                this.transfer = true
            }
            
        },

        verificarTransfer(item){
            console.log(item)
            let cantidad = parseInt(item.cantidad);
            let almacen = parseInt(item.cantidad_producto);
            if(this.almacen_destino === ''){
                 let data = {"status":"warning","icon":"mdi-warehouse","title":"Alerta","text":'Debes agregar los almacenes de origen y destino',"textButton":"Cerrar" }
                this.setActiveModal(data)
                setTimeout(()=>{
                    this.setDesactiveModal()
                },3000);
            }else{
                 if(cantidad>almacen){
                    let mensaje = `La cantidad excede la disponible en el almacen: solo dispone de ${almacen} unidades `;
                    let data = {"status":"warning","icon":"mdi-alert-circle","title":"Alerta","text":mensaje,"textButton":"Cerrar" }
                    this.setActiveModal(data)
                    setTimeout(()=>{
                        this.setDesactiveModal()
                    },3000);
                }else{
                    if(cantidad === 0){
                        let data = {"status":"warning","icon":"mdi-alert-circle","title":"Alerta","text":'Debe introducir una cantidad mayor a 0',"textButton":"Cerrar" }
                        this.setActiveModal(data)
                        setTimeout(()=>{
                            this.setDesactiveModal()
                        },3000);
                    }else{
                        let data = {
                                "id_almacen":parseInt(this.almacen_origen),
                                "id_almacen_destino":parseInt(this.almacen_destino),
                                "id_producto":parseInt(item.id_producto),
                                "cantidad":cantidad,
                                "fecha_created":this.fechaActual 
                            }
                        this.transferProducto(data);
                    }
                }
            }
           
        },

        async transferProducto(data){
            try{
                const response = await axios.post(`/api/traslados`,data,{
                    //  headers:
                    //     {
                    //         'Bearer': sessionStorage.getItem('token')
                    //     } 
                });
                if(response.status == 200){
                    let data = {"status":"success","icon":"mdi-compare-horizontal","title":"Exitoso","text":response.data.mensaje,"textButton":"Cerrar" }
                    this.setActiveModal(data)
                    setTimeout(()=>{
                        this.setDesactiveModal()
                    },3000);
                    this.getDataTraslados()
                    this.transfer = false
                    this.producto = {}
                }
            }catch(e){
                console.log(e);
            }
        }

    }
}
</script>

<style>

</style>