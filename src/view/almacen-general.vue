<template>
   <v-container class="px-5 py-3">
      <v-row>
        <v-col cols="12">
            <v-card elevation="3"  class="px-4 mt-3"> 
                  <v-row class="pt-5">
                     <v-col cols="12" sm="4" md="4">
                          <v-autocomplete
                                :items="productsCodigo"
                                item-text="fullname"
                                item-value="id"
                                label="Filtrar producto por Codigo o Nombre"
                                return-object
                                v-model="producto"
                                :disabled="!permisos.almacen_general"
                                @change="getProductCodigo(producto)"
                                ></v-autocomplete>
                     </v-col>
                  </v-row>
                  <v-data-table
                     :headers="cabecera"
                     :items="products"
                     class="py-7"
                  >
                     <template v-slot:top>
                        <v-toolbar flat class="pb-5">
                        <v-toolbar-title
                           ><v-icon class="mr-5" color="primary">mdi-cart </v-icon> Productos</v-toolbar-title
                        >
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        </v-toolbar>
                     </template>
                     <template v-slot:[`item.actions`]="{item}">
                        <v-row>
                           <v-col cols="12" class="text-center" v-if="permisos.almacen_general">
                              <v-switch
                                 inset
                                 v-model="item.estatus"
                                 @change="changeEstatus(item)"
                              ></v-switch>
                           </v-col>
                           <v-col cols="12" class="text-center d-flex justify-center" v-else>
                                 <p> {{item.estatus}}</p>
                           </v-col>
                        </v-row>
                        
                     </template> 
                  </v-data-table>
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
         productsCodigo:[],
         switch:false,
         permisos:{},
         success:{"status":"success","icon":"mdi-check-circle","text":'Ejecutado exitosamente'},
         error:{"status":"error","icon":"mdi-close","text":'Ocurrio un error'},
         producto:{},
           cabecera:[
                 {
                text: "ID producto",
                value: "id",
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
                    value: "almacen",
                    align: "center",
                    class: "primary white--text px-0 mx-0",
                },
                {
                    text: "Estatus",
                    value: "actions",
                    align: "left",
                    class: "primary white--text px-0 mx-0",
                },
            ]
      }
   },

   mounted(){
      this.getAllProducts();
      this.getAllProductsCodigo();
      this.getPermisos()
   },

   methods:{

         ...mapMutations('modalAlert',['setActiveModal','setDesactiveModal']),

         ...mapMutations('overlay',['setActiveOverlay','setDesactiveOverlay']),

         ...mapMutations('notification',['setActiveNotification']),

         async getAllProducts(){
               try{
                  const response = await axios.get('/api/productos?total=total',{
                     // headers:
                     //    {
                     //        'Bearer': sessionStorage.getItem('token')
                     //    } 
                  });
                  this.products = response.data;
               }catch(e){
                  console.log(e);
               }
         },

         async getAllProductsCodigo(){
               try{
                  const response = await axios.get('/api/productos',{
                     // headers:
                     //    {
                     //        'Bearer': sessionStorage.getItem('token')
                     //    } 
                  });
                  this.productsCodigo = response.data;
               }catch(e){
                  console.log(e);
               }
         },

         async getProductCodigo(product){
               try{
                  const response = await axios.get(`/api/productos?codigo=${product.codigo}`,{
                     // headers:
                     //    {
                     //        'Bearer': sessionStorage.getItem('token')
                     //    } 
                  });
                  this.products = response.data;
               }catch(e){
                  console.log(e);
               }
         },

         async changeEstatus(item){
             try{
               
               let data = {"id_producto":item.id,"estatus":item.estatus === true ? "1" : "0"}
               const response = await axios.post(`/api/productos`,data);

               if(response.status === 200){
                  this.getAllProducts()
                  this.success.text = response.data.mensaje
                  this.setActiveNotification(this.success)
               }

             }catch(e){
               console.log(e)
               this.error.text = e
               this.setActiveNotification(this.error)
             }
         },

        async  getPermisos(){
            let ID = sessionStorage.getItem('id');
            let id = parseInt(ID);
            try{
               const res = await axios.get(`/api/admin/permisos?id=${id}`);
               this.permisos = res.data;
            }catch(e){
               console.log(e)
            }
           
         }

         
      
      },
}
</script>

<style>

</style>