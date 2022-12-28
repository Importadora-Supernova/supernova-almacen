<template>
    <v-data-table
    :headers="cabecera"
    :items="traslados"
    class="elevation-6 py-7"
  >
    <template v-slot:top>
      <v-toolbar flat class="pb-5">
        <v-toolbar-title
          ><v-icon class="mr-5" large color="primary">mdi-compare-horizontal </v-icon> Traslados </v-toolbar-title
        >
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
         <v-autocomplete
          :items="products"
          item-text="fullname"
          item-value="id"
          label="Filtrar producto por Codigo o Nombre"
           return-object
          v-model="producto"
          @change="getProductId(producto)"
           ></v-autocomplete>
      </v-toolbar>
    </template>
    <template v-slot:[`item.almacen_o`]="{ item }">
      <v-chip label outlined color="error" dark> <v-icon class="mr-1"> mdi-warehouse</v-icon> {{item.almacen_origen}}  </v-chip>
    </template>
     <template v-slot:[`item.arrow`]="{  }">
       <v-icon color="error">mdi-arrow-right-bold</v-icon>
    </template>
    <template v-slot:[`item.almacen_d`]="{ item }">
      <v-chip label outlined color="success" dark> <v-icon class="mr-1"> mdi-warehouse</v-icon> {{item.almacen_destino}}  </v-chip>
    </template>
     <template v-slot:[`item.cod`]="{ item }">
      <v-chip  color="warning" dark> <v-icon class="mr-1"> mdi-barcode</v-icon> {{item.codigo}}  </v-chip>
    </template>
     <template v-slot:[`item.cant`]="{ item }">
      <v-chip  color="primary" dark> {{item.cantidad}}  </v-chip>
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
import axios from 'axios'
export default {
    data(){
        return{
          products:[],
          traslados:[],
          producto:{},
            cabecera:[
                 {
                text: "ID",
                value: "id",
                align: "center",
                class: "primary white--text px-0 mx-0",
                },
                 {
                text: "Almacen Origen",
                value: "almacen_o",
                align: "center",
                class: "primary white--text px-0 mx-0",
                },
                 {
                  text: "",
                  value: "arrow",
                  align: "center",
                  class: "primary white--text px-0 mx-0",
                },
                 {
                    text: "Almacen Destino",
                    value: "almacen_d",
                    align: "center",
                    class: "primary white--text px-0 mx-0",
                },
                 {
                    text: "Codigo",
                    value: "cod",
                    align: "center",
                    class: "primary white--text px-0 mx-0",
                },
                  {
                    text: "Producto",
                    value: "nombre",
                    align: "center",
                    class: "primary white--text px-0 mx-0",
                },
                 {
                    text: "Cantidad(unidades)",
                    value: "cant",
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
        this.getAllProducts();
    },

    computed:{
        
    },

    methods:{
        

         async getAllProducts(){
            try{
                const response = await axios.get('/api/productos?total=total',{

                });
                this.products = response.data;
            }catch(e){
                console.log(e);
            }
      },

        async getDataTraslados(){

            try {
                const response = await axios.get('api/traslados', {
                });

                if (response.status == 200) {
                    this.traslados =  response.data
                }

            } catch (e) {
                console.log(e)
            }
        },

        async getProductId(item){
            try
            {
                const response = await axios.get(`/api/traslados?producto=${item.id}`);
                this.traslados = response.data
            }catch(e)
            {
                console.log(e);
            }
        }
    }
}
</script>

<style>

</style>