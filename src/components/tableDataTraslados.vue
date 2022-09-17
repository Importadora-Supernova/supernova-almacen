<template>
    <v-data-table
    :headers="cabecera"
    :items="Traslados"
    class="elevation-6 py-7"
  >
    <template v-slot:top>
      <v-toolbar flat class="pb-5">
        <v-toolbar-title
          ><v-icon class="mr-5" large color="primary">mdi-compare-horizontal </v-icon> Traslados </v-toolbar-title
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
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    data(){
        return{
            cabecera:[
                 {
                text: "ID",
                value: "id",
                align: "center",
                class: "primary white--text px-0 mx-0",
                },
                 {
                text: "Almacen Origen",
                value: "almacen_origen",
                align: "center",
                class: "primary white--text px-0 mx-0",
                },
                 {
                    text: "Almacen Destino",
                    value: "almacen_destino",
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
                {
                    text: "Fecha de Creacion",
                    value: "fecha_created",
                    align: "center",
                    class: "primary white--text px-0 mx-0",
                },
            ]
        }
    },
    mounted(){
        this.getDataTraslados();
    },

    computed:{
        ...mapState('traslados',['Traslados'])
    },

    methods:{
        ...mapActions('traslados',['getDataTraslados'])
    }
}
</script>

<style>

</style>