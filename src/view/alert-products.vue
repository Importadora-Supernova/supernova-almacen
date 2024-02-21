<template>
  <v-container class="px-5 py-3">

    <modal-alert-products
    :modal="modal_alert"
    :traslados="productos"
    @move="asignedMoveProduct"
    @close="closeModalTraslados"
    ></modal-alert-products>

    <modalConfirmTraslado
    :modal="modal_confirm"
    @close="closeModalConfirm"
    ></modalConfirmTraslado>

    <v-row>
        <v-col cols="12" class="pt-5">
            <div class="container-alerts">
                <cardAlertProduct 
                v-for="(item,index) of productos" 
                :key="index" 
                :producto="item"
                @view="viewTraslados()"
                ></cardAlertProduct>
            </div>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

//import components
import modalAlertProducts from '@/components/modalAlertProducts.vue'
import cardAlertProduct from '@/components/cardAlertProduct.vue'
import modalConfirmTraslado from '@/components/modalConfirmTraslado.vue'

export default {
  components: { modalAlertProducts,cardAlertProduct, modalConfirmTraslado },
   data(){
     return{
      modal_alert:false,
      modal_confirm:false,
      productos:[]
     }
   },
   mounted(){
    this.getAllProductsAlert()
   },
   methods:{
      async getAllProductsAlert(){
        try{
          const response = await axios.get(`/api/alertaProductos`)
          if(response.status == 200){
            this.productos = response.data.productos.map((pro)=>{
              pro.cantidad = parseInt(pro.cantidad)  - (parseInt(pro.cantidad)*2)
              return pro;
            })
          }
        }catch(e){
          console.log(e)
        }
      },

      viewTraslados(){
        console.log('traslado')
        this.modal_alert = true
      },

      asignedMoveProduct(){
        this.modal_confirm = true
      },
      closeModalConfirm(){
        this.modal_confirm = false
      },
      closeModalTraslados(){
        this.modal_alert = false
      }
  }
}
</script>

<style lang="scss">
  .container-alerts{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    .alert-product{
      width: 350px;
      height: 190px;
      border: 1px solid #ee2222;
      background-color: #dc5f5f;
      border-radius: 8px;
      padding: 8px;
      position: relative;
      display: flex;
      box-sizing: border-box;
      cursor: pointer;
      transition: all .1s;
      &:hover{
        border: 3px solid #ee2222;;
      }
      .data-product{
        width: 60%;
      }
      .data-almacenes{
        width: 40%;
      }
      .icon-alert{
        position: absolute;
        bottom: 5px;
        right: 5px;
      }
    }
  }
</style>