<template>
  <v-container class="px-5 py-3">


   <v-dialog v-model="modalTransfer" max-width="500">
      <v-card>
         <div class="active-transfer" v-if="transferOn" >
            <div class="text-center">
               <img src="@/assets/almacenes-transfert.gif" width="200" alt="">
               <p class="white--text">Transfiriendo espere...</p>
            </div>
         </div>
         <v-card-title class="primary">
            <h3 class="white--text">{{titleModal}} </h3>
         </v-card-title>
         <v-card-text>
            <v-row class="mt-3">
               <v-col cols="12" class="d-flex justify-space-around">
                        <v-card outlined class="text-center px-2 py-1" style="width:120px">
                           <v-icon large color="primary">mdi-package-variant</v-icon>
                           <h3>Numero de Orden:</h3>
                           <h5>{{NumOrden}}</h5>
                        </v-card>
                        <v-card outlined class="text-center px-2 py-1" style="width:120px">
                           <v-icon large color="primary">mdi-package-variant</v-icon>
                           <h3>Producto:</h3>
                           <h5>{{nombre}} </h5>
                        </v-card>
                         <v-card outlined class="text-center px-2 py-1" style="width:120px">
                           <v-icon large color="primary">mdi-barcode</v-icon>
                           <h3>Codigo:</h3>
                           <h5>{{codigo}} </h5>
                        </v-card>
               </v-col>
               <v-col cols="12" class="d-flex">
                  <v-text-field type="number" label="Cantidad" v-model="cantidadTransferir"></v-text-field>
               </v-col>
            </v-row>
         </v-card-text>
         <v-card-actions>
            <v-col cols="12" class="text-right">
                <v-btn text color="error" @click="closeModalTransfer()">cancelar</v-btn>
                <v-btn class="primary ml-2" @click="sendProductAlmacenGarantia('garantia')" v-if="type === 1">Transferir <v-icon class="ml-2">mdi-swap-horizontal</v-icon> </v-btn>
                <v-btn class="primary ml-2"  @click="sendProductAlmacenGarantia('reintegro')" v-if="type === 2"> Reintegrar  <v-icon>mdi-cart-arrow-down</v-icon> </v-btn>
            </v-col>
         </v-card-actions>
      </v-card>
   </v-dialog>

    <v-row class="mt-5">
      <v-col cols="12">
        <v-card elevation="3" class="px-5 py-5">
          <v-row>
            <v-col cols="12">
              <v-alert type="info" outlined>
                Para añadir productos al almacen de garantia debes buscar los
                productos por numero de orden de compra
              </v-alert>
            </v-col>
            <v-col cols="5" class="d-flex">
              <v-text-field
                type="search"
                label="Numero de Orden"
                v-model="orden"
                @keyup.enter="getAllProductsOrden"
                 :disabled="!permisos.almacen_garantia"
              ></v-text-field>
              <v-btn class="mt-3 ml-1 primary" @click="getAllProductsOrden" :disabled="!permisos.almacen_garantia">
                Buscar 
                <v-icon class="ml-2">mdi-clipboard-text-search</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" v-if="productosOrdenes.length > 0">
               <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                      <a :href="`https://programacion.importadorasupernova.com/api/reportes/reporteProductosOrden?orden=${orden}`" target="_blank" style="text-decoration:none"
                      v-bind="attrs"
                       v-on="on"
                      >Reporte <v-icon color="error" large>mdi-file-pdf-box</v-icon>
                      </a>
                  </template>
                  <span>Imprimir reporte de orden</span>
              </v-tooltip>
              <v-simple-table>
                <template v-slot:default>
                  <thead class="primary">
                    <tr class="">
                      <th class="text-center white--text">Id</th>
                      <th class="text-center white--text">Nombre</th>
                      <th class="text-center white--text">Codigo</th>
                      <th class="text-center white--text">Precio</th>
                      <th class="text-center white--text">Cantidad</th>
                      <th class="text-center white--text">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,index) in productosOrdenes" :key="index">
                      <td class="text-center">{{item.id}}</td>
                      <td class="text-center">{{item.nombre}}</td>
                      <td class="text-center">{{item.codigo}} </td>
                      <td class="text-center">{{item.precio}} </td>
                      <td class="text-center">{{item.cantidad}} </td>
                      <td class="text-center">
                         <v-tooltip bottom>
                           <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                 icon
                                 color="success"
                                 v-bind="attrs"
                                 v-on="on"
                                  @click="reeintegro(item)"
                              >
                                 <v-icon>mdi-swap-horizontal</v-icon>
                              </v-btn>
                           </template>
                           <span>Reintegro de mercancia</span>
                        </v-tooltip>
                         <v-tooltip bottom>
                           <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                 icon
                                 color="primary"
                                 v-bind="attrs"
                                 v-on="on"
                                 @click="transferAlmacenGarantia(item)"
                              >
                                 <v-icon>mdi-warehouse</v-icon>
                              </v-btn>
                           </template>
                           <span>Enviar a almacen de garantia</span>
                        </v-tooltip>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapMutations} from 'vuex'
import axios from 'axios'
export default {
  data() {
    return {
       orden:'',
       productosOrdenes:[],
       permisos:[],
       modalTransfer:false,
       titleModal:'',
       cantidadTransferir:0,

       type:0,

       nombre:'',
       NumOrden:'',
       codigo:'',
       idProducto:null,
       transferOn:false,
       cant:0
    };
  },

  mounted(){
    this.getPermisos()
  },

  methods:{

       ...mapMutations('modalAlert',['setActiveModal','setDesactiveModal']),

      ...mapMutations('overlay',['setActiveOverlay','setDesactiveOverlay']),

      async  getPermisos(){
            let ID = sessionStorage.getItem('id');
            let id = parseInt(ID);
            try{
               const res = await axios.get(`/api/admin/permisos?id=${id}`);
               this.permisos = res.data;
            }catch(e){
               console.log(e)
            }
           
      }, 

   // buscar todos los productos relacionados a una orden
    async getAllProductsOrden(){
      this.setActiveOverlay();
       try{ 
         const response = await axios.get(`/api/productosOrdenes?orden=${this.orden}`);
         this.productosOrdenes = response.data;
         if(response.status === 200){
            this.setDesactiveOverlay();
         }
       }catch(e){
         console.log(e)
         this.setDesactiveOverlay();
          let data = {"status":"error","icon":"mdi-alert-circle","title":"Ocurrio un error","text":e,"textButton":"Cerrar" }
         this.setActiveModal(data)
       }
    },

    transferAlmacenGarantia(item){
      this.titleModal = 'Transferir a almacen de garantia';
      this.idProducto = item.id
      this.nombre = item.nombre
      this.codigo = item.codigo
      this.NumOrden = item.orden
      this.cantidadTransferir = item.cantidad
      this.cant = parseInt(item.cantidad)
      this.type = 1
      this.modalTransfer = true
    },

    reeintegro(item){
      this.titleModal = 'Reintegrar mercancia almacen';
      this.idProducto = item.id
      this.nombre = item.nombre
      this.codigo = item.codigo
      this.NumOrden = item.orden
      this.cantidadTransferir = item.cantidad
      this.cant = parseInt(item.cantidad)
      this.type = 2
      this.modalTransfer = true
    },


    async sendProductAlmacenGarantia(metodo){
      if(this.cantidadTransferir > this.cant){
         let text = `La cantidad a transferir excede a la disponible, disponible: ${this.cant} piezas `;
         let data = {"status":"warning","icon":"mdi-alert-circle","title":"Alerta","text":text,"textButton":"Cerrar" }
         this.setActiveModal(data);
         setTimeout(()=>{
            this.setDesactiveModal()
         },3500);
      }else{
           this.transferOn = true
            try{
               let data = {
                  "metodo":metodo,
                  "id_producto":parseInt(this.idProducto),
                  "codigo":this.codigo,
                  "nombre":this.nombre,
                  "orden":this.NumOrden,
                  "cantidad":parseInt(this.cantidadTransferir)
               }
               const response = await axios.post('/api/productosOrdenes',data);
               console.log(response.data)
               this.closeModalTransfer()
               setTimeout(() => {
                  this.transferOn = false
                  let data = {"status":"success","icon":"mdi-check-circle","title":"Exitoso","text":response.data.mensaje,"textButton":"Cerrar" }
                  this.setActiveModal(data);
               }, 1000);
               
            }catch(e){
               console.log(e);
               setTimeout(() => {
                     this.transferOn = false
                     let data = {"status":"error","icon":"mdi-alert-circle","title":"Ocurrio un error","text":e,"textButton":"Cerrar" }
                     this.setActiveModal(data)
               }, 2000);
            }
      }
    

    },

    closeModalTransfer(){
         this.idProducto = ''
         this.codigo     = ''
         this.nombre     = ''
         this.NumOrden   = ''
         this.cantidadTransferir = 0
         this.type = 0
         this.modalTransfer = false
    }

       
  }
};
</script>

<style lang="scss">
     .active-transfer{
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.632);
        position: absolute;
        z-index: 5;
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
     }
</style>