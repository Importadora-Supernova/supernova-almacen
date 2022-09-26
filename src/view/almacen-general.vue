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
                     <!-- <template v-slot:[`item.actions`]="{ item }">
                        <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                           <v-btn
                              icon
                              color="primary"
                              v-bind="attrs"
                              v-on="on"
                              @click="viewReport(item)"
                           >
                              <v-icon>mdi-account</v-icon>
                           </v-btn>
                        </template>
                        <span>más informacion</span>
                        </v-tooltip>
                     </template> -->
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
               //  {
               //      text: "Acciones",
               //      value: "actions",
               //      align: "center",
               //      class: "primary white--text px-0 mx-0",
               //  },
            ]
      }
   },

   mounted(){
      this.getAllProducts();
      this.getAllProductsCodigo();
   },

   methods:{

         ...mapMutations('modalAlert',['setActiveModal','setDesactiveModal']),

         ...mapMutations('overlay',['setActiveOverlay','setDesactiveOverlay']),

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

         
      
      },
}
</script>

<style>

</style>