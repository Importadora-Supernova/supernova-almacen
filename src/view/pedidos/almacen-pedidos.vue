<template>
  <v-container class="px-5 py-3">
    <v-row class="mt-5">
      <v-col cols="12">
        <v-card class="px-5 py-5">
          <v-row>
            <v-col cols="4" class="d-flex">
                <v-text-field outlined placeholder="Buscar folio" v-model="folio" @keypress.enter="getPedido()"></v-text-field>
                <button class="btn-search" @click="getPedido()"><v-icon color="white">mdi-book-search</v-icon></button>
            </v-col>
            <v-col cols="12">
                <transition 
                    enter-active-class="animate__animated animate__fadeInRight"
                    leave-active-class="animate__animated animate__fadeOutRight"
                    mode="out-in">
                    <v-alert type="warning" v-if="alerta" >
                        No se encontro pedido con este numero de folio
                    </v-alert>
                </transition>
              
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left primary white--text">Cliente</th>
                      <th class="text-left primary white--text">Orden</th>
                      <th class="text-left primary white--text">Estatus</th>
                      <th class="text-left primary white--text">Cajas/Bolsas</th>
                      <th class="text-left primary white--text">Paqueteria</th>
                      <th class="text-left primary white--text">Fecha pedido</th>
                      <th class="text-left primary white--text">Fecha procesado</th>
                      <th class="text-left primary white--text">Fecha almacen</th>
                      <th class="text-left primary white--text">Fecha salida</th>
                      <th class="text-left primary white--text">Entregado por:</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{datos.cliente}} </td>
                      <td>{{datos.orden}} </td>
                      <td>{{datos.estatus}} </td>
                      <td>{{datos.cajas}} </td>
                      <td>{{datos.paqueteria}} </td>
                      <td>{{datos.fecha}} </td>
                      <td>{{datos.fecha_procesado}} </td>
                      <td>{{datos.fecha_almacen}} </td>
                      <td>{{datos.fecha_salida}} </td>
                      <td> </td>
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
export default {
  data: () => ({
    datos: {},
    folio:'',
    alerta:false
  }),

  methods: {
    async getPedido() {
      await fetch(
        `http://localhost/supernova-almacen-api/almacen/searchPedido?orden=${this.folio}`
      )
        .then((response) => response.json())
        .then((data) => (this.datos = data));
        if(this.datos.length === 0){
            this.alerta = true
            setTimeout(()=>{
                this.alerta = false
            },3000);
        }
    },
  },
};
</script>

<style lang="scss">
    .btn-search{
        width: 56px;
        height: 56px;
        background-color: #1976d2;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        &:hover{
            background-color: #0858a8;
        }
        //border: 1px solid rgb(133, 133, 133);
    }
</style>