<template>
   <v-container>

        <v-row>
            <v-col cols="12">
                <v-card class="mb-5">
                    <v-card-title class="primary">
                       <h3 class="white--text">Agrega un nuevo Producto</h3>  
                    </v-card-title>
                    <v-card-text>
                        <v-row class="mt-3">
                             <v-col>
                                <v-autocomplete
                                :items="products"
                                item-text="nombre"
                                item-value="id"
                                label="Producto"
                                ></v-autocomplete>
                            </v-col>
                            <v-col>
                                <v-text-field label="Cantidad" type="number"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-btn class="primary mt-3">Agregar</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

       <v-card>
            <v-card-title>
                {{datosAlmacen.nombre_almacen}}
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Buscar"
                    single-line
                    hide-details
                ></v-text-field>
                <v-btn class="primary ml-2">+ ADD NEW PRODUCTO</v-btn>
            </v-card-title>
            <v-data-table
            :headers="headers"
            :items="productosAlmacen"
            :search="search"
            >
            <template v-slot:[`item.actions`]="{}">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        icon
                        color="warning"
                        v-bind="attrs"
                        v-on="on"
                        >
                        <v-icon>mdi-circle-edit-outline</v-icon>
                        </v-btn>
                    </template>
                    <span>Editar registro</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        icon
                        color="error"
                        v-bind="attrs"
                        v-on="on"
                        >
                        <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </template>
                    <span>Borrar registro</span>
                    </v-tooltip>
                 </template>
            </v-data-table>
        </v-card>
   </v-container>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            productosAlmacen:[],
            search: '',
            datosAlmacen:{},
            headers: [
            {
                text: 'id',
                align: 'center',
                sortable: false,
                value: 'id_producto',
                class: "primary white--text px-0 mx-0",
            },
            { text: 'Codigo', value: 'codigo_producto' ,align: 'center', class: "primary white--text px-0 mx-0",},
            { text: 'Nombre producto', value: 'nombre_producto',align: 'center', class: "primary white--text px-0 mx-0",},
            { text: 'Cantidad', value: 'cantidad_producto',align: 'center', class: "primary white--text px-0 mx-0", },
            { text: 'Acciones', value: 'actions', align: 'center',class: "primary white--text px-0 mx-0", },
            ],
            products:[
                {
                "id": "42",
                "nombre": "Lampara SUN 5 (BLANCA)",
                "codigo": "LA-02"
            },
            {
                "id": "43",
                "nombre": "Lampara SUN 5 Tornasol (PLATA)",
                "codigo": "LA-02T"
            },
            {
                "id": "948",
                "nombre": "Sticker Mariposa",
                "codigo": "UN-63"
            },
            {
                "id": "958",
                "nombre": "Corta Sonrisa (A) Tornasol",
                "codigo": "UN-47T"
            },
            {
                "id": "489",
                "nombre": "Gel Painting - (Gama H)",
                "codigo": "GEL-15"
            }

        ]
        }
    },
    mounted(){
        this.getAllPorductsAlmacen(this.$route.params.id)
        this.getDataAlmacen(this.$route.params.id)
    },

    methods:{

        async getDataAlmacen(id){
            try{
                const response = await axios.get(`/api/?id=${id}`);
                this.datosAlmacen = response.data;
            }catch(e){
                console.log(e)
            }
        },
        async getAllPorductsAlmacen(id){
            try{
                const response = await axios.get(`/api/productosAlmacen?id=${id}`);
                this.productosAlmacen = response.data
            }catch(e){
                console.log(e);
            }
        }
    }
}
</script>

<style>

</style>