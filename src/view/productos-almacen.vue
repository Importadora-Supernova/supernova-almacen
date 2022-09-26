<template>
   <v-container class="px-5 py-3">
      <v-row>


         <v-dialog v-model="modalModificar" max-width="450">
            <v-card>
               <v-card-title class="warning">
                     <v-col cols="12" class="white--text">Modificar Producto</v-col>
               </v-card-title>
               <v-card-text>
                  <v-row class="mt-4">
                     <v-col cols="12" class="d-flex justify-space-around">
                        <v-card outlined class="text-center px-2 py-1" style="width:120px">
                           <v-icon large color="primary">mdi-warehouse</v-icon>
                           <h2>Almacen:</h2>
                           <h5>{{nombreAlmacen}} </h5>
                        </v-card>
                         <v-card outlined class="text-center px-2 py-1" style="width:120px">
                           <v-icon large color="primary">mdi-barcode</v-icon>
                           <h2>Codigo:</h2>
                           <h5>{{codigoProducto}} </h5>
                        </v-card>
                         <v-card outlined class="text-center px-2 py-1" style="width:120px">
                           <v-icon large color="primary">mdi-package-variant</v-icon>
                           <h2>Producto :</h2>
                           <h5>{{nombreProducto}}</h5>
                        </v-card>
                     </v-col>
                     <v-col cols="12" class="d-flex">
                        <v-text-field label="Cantidad" v-model="cantidadModificar" type="number"></v-text-field>
                        <v-btn class="mt-3 success">+</v-btn>
                        <v-btn class="mt-3 ml-1 error">-</v-btn>
                     </v-col>
                  </v-row>
               </v-card-text>
               <v-card-actions>
                  <v-col cols="12" class="text-right">
                     <v-btn text color="error" @click="closeModalModificar">Cancelar</v-btn>
                  </v-col>
               </v-card-actions>
            </v-card>
         </v-dialog>

        <v-col cols="12">
            <v-card elevation="3"  class="px-4 py-2 mt-3"> 
                  <v-row class="pt-5">
                     <v-col cols="12" sm="4" md="4">
                          <v-autocomplete
                                :items="products"
                                item-text="fullname"
                                item-value="id"
                                label="Filtrar producto por Codigo o Nombre"
                                return-object
                                v-model="producto"
                                @change="getProductId(producto)"
                                ></v-autocomplete>
                     </v-col>
                  </v-row>
                  <v-row v-if="registerNew">
                     <v-col cols="12">
                        <v-alert type="info">
                           El producto no esta registrado en los almacenes, desea registrarlo ? seleccione almacen y cantidad
                        </v-alert>
                                <v-card outlined>
                                    <v-simple-table>
                                        <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th class="text-left">
                                                    Codigo
                                                </th>
                                                <th class="text-left">
                                                    Nombre
                                                </th>
                                                <th>
                                                   Almacen
                                                </th>
                                                 <th class="text-left">
                                                   Cantidad
                                                </th>
                                                <th class="text-left">
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr
                                            >
                                                <td>{{producto.codigo}} </td>
                                                <td>{{producto.fullname}} </td>
                                                <td>
                                                   <v-autocomplete
                                                   label="Almacen"
                                                   :items="almacenes"
                                                   item-text="nombre_almacen"
                                                   item-value="id"
                                                   append-icon="mdi-warehouse"
                                                   v-model="almacen"
                                                   ></v-autocomplete>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" v-model="cantidad"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-btn class="primary" @click="addProductAlmacen(producto)">Agregar <v-icon class="ml-1">mdi-plus-circle</v-icon> </v-btn>
                                                </td>
                                            </tr>
                                        </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-card>
                            </v-col>
                  </v-row>
                  <v-data-table
                     :headers="cabecera"
                     :items="productoAlmacenes"
                     class="py-7"
                  >
                     <template v-slot:top>
                        <v-toolbar flat class="pb-5">
                        <v-toolbar-title
                           ><v-icon class="mr-5" color="primary">mdi-cart </v-icon> Productos por Almacen </v-toolbar-title
                        >
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        </v-toolbar>
                     </template>
                     <!-- <template v-slot:[`item.actions`]="{item}">
                        <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                           <v-btn
                              icon
                              color="warning"
                              v-bind="attrs"
                              v-on="on"
                              @click="modifiCantidad(item)"
                           >
                              <v-icon>mdi-pencil</v-icon>
                           </v-btn>
                        </template>
                        <span>editar cantidad</span>
                        </v-tooltip>
                     </template> -->
                  </v-data-table>
                  <v-chip label class="success">total productos:{{total_productos}}</v-chip>
                  
            </v-card>
        </v-col>
      </v-row>
   </v-container>
</template>

<script>
import {mapMutations} from 'vuex'
import axios from 'axios'
export default {
   data(){
      return{
         productoAlmacenes:[],
         products:[],
         producto:{},
         almacenes:[],
         almacen:'',

         modalModificar:false,
         cantidadModificar:0,
         nombreAlmacen:'',
         nombreProducto:'',
         codigoProducto:'',

         registerNew:false,
         total_productos:0,
         cantidad:0,
           cabecera:[
                 {
                text: "ID del almacen",
                value: "id_almacen",
                align: "center",
                class: "primary white--text px-0 mx-0",
                },
                 {
                text: "Nombre de Almacen",
                value: "nombre_almacen",
                align: "center",
                class: "primary white--text px-0 mx-0",
                },
                 {
                    text: "Nombre del Producto",
                    value: "nombre",
                    align: "center",
                    class: "primary white--text px-0 mx-0",
                },
                 {
                    text: "Codigo",
                    value: "codigo",
                    align: "center",
                    class: "primary white--text px-0 mx-0",
                },
                 {
                    text: "Cantidad(unidades)",
                    value: "cantidad",
                    align: "center",
                    class: "primary white--text px-0 mx-0",
                },
                    // {
                    //     text: "Acciones",
                    //     value: "actions",
                    //     align: "center",
                    //     class: "primary white--text px-0 mx-0",
                    // },
            ]
      }
   },

   mounted(){
      this.getAllProducts();
      this.getAllAlmacenes();
   },

   methods:{

      ...mapMutations('modalAlert',['setActiveModal','setDesactiveModal']),

      ...mapMutations('overlay',['setActiveOverlay','setDesactiveOverlay']),

      async getAllProducts(){
            try{
                const response = await axios.get('/api/productos?total=total',{
                    // headers:
                    //     {
                    //         'Bearer': sessionStorage.getItem('token')
                    //     } 
                });
                this.products = response.data;
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

       calculo(){
            const acumular = (acumulador,producto) => acumulador +  parseInt(producto.cantidad)
            this.total_productos  = this.productoAlmacenes.reduce(acumular,0)
            
      },

      async getProductId(producto){
            this.setActiveOverlay()
            let id = parseInt(producto.id);
            try{
                const response = await axios.get(`/api/cantidadProductosAlmacen?id=${id}`, {
                    // headers:
                    //     {
                    //         'Bearer': sessionStorage.getItem('token')
                    //     } 
                });
                this.productoAlmacenes = response.data
                if(this.productoAlmacenes.length === 0){
                  this.registerNew = true
                  this.setDesactiveOverlay()
                  let data = {"status":"warning","icon":"mdi-alert-circle","title":"Alerta","text":'Este producto no esta asignado en almacenes',"textButton":"Cerrar" }
                  this.setActiveModal(data)
                  setTimeout(()=>{
                     this.setDesactiveModal()
                  },3500);
                }else{
                   this.setDesactiveOverlay()
                   this.registerNew = false
                }
               this.calculo()
                
            }catch(e){
                console.log(e);
                  let data = {"status":"error","icon":"mdi-alert-circle","title":"Ocurrio un error","text":e,"textButton":"Cerrar" }
                  this.setActiveModal(data)
            }
        },

         async addProductAlmacen(product){
            
            this.setActiveOverlay()
            let cantidad = parseInt(this.cantidad);

            if(cantidad == 0){
                this.setDesactiveOverlay()
                let data = {"status":"warning","icon":"mdi-alert-circle","title":"Pendiente","text":'Debes agregar una cantidad mayor a 0',"textButton":"Cerrar" }
                this.setActiveModal(data)
                setTimeout(()=>{
                    this.setDesactiveModal()
                },2500);
            }else if(this.almacen === ''){
                 this.setDesactiveOverlay()
                let data = {"status":"warning","icon":"mdi-alert-circle","title":"Pendiente","text":'Debes agregar un almacen',"textButton":"Cerrar" }
                this.setActiveModal(data)
                setTimeout(()=>{
                    this.setDesactiveModal()
                },2500);
            }else{
                try{
                    let datos = {
                        "id_almacen":parseInt(this.almacen), 
                        "id_producto":parseInt(product.id),
                        "cantidad":cantidad
                    }
                    const response = await axios.post('/api/productosAlmacen',datos,{
                        // headers:
                        //    {
                        //       'Bearer': sessionStorage.getItem('token')
                        //    } 
                    });
                    console.log(response.data);
                    if(response.status == 200){
                           await this.getProductId(product);
                        this.setDesactiveOverlay()
                        let data = {"status":"success","icon":"mdi-check","title":"Agregado","text":'Producto agregado exitosamente',"textButton":"Cerrar" }
                        this.setActiveModal(data)
                        setTimeout(()=>{
                            this.setDesactiveModal()
                        },2500);
                    }
                }catch(e){
                    console.log(e);
                }
                

            }
        },

        modifiCantidad(item){
          this.nombreAlmacen  = item.nombre_almacen
          this.nombreProducto = item.nombre
          this.codigoProducto = item.codigo
          this.cantidadModificar = parseInt(item.cantidad)
          this.modalModificar = true
        },

        closeModalModificar(){
          this.modalModificar = false
        }
   }
}
</script>

<style>

</style>