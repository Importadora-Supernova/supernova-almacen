<template>
   <v-container class="px-5 py-3">

        <v-row>
            <v-col cols="12">
                <v-card class="mb-5">
                    <v-card-title class="primary">
                       <h3 class="white--text">Agregar productos a {{datosAlmacen.nombre_almacen}} </h3>  
                    </v-card-title>
                    <v-card-text>
                        <v-row class="mt-3">
                            <v-col cols="12" sm="5" md="5">
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
                        <v-row>
                            <v-col cols="12">
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
                                            v-for="(item,index) in productosCodigo"
                                            :key="index"
                                            >
                                                <td>{{ item.codigo }}</td>
                                                <td>{{ item.nombre }}</td>
                                                <td>
                                                    <v-text-field type="number" v-model="productosCodigo[index].cantidad"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-btn class="primary" @click="addProductAlmacen(item)">Agregar <v-icon class="ml-1">mdi-plus-circle</v-icon> </v-btn>
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

       <v-card>
            <v-card-title>
                <v-icon class="mr-2" color="primary" large>mdi-warehouse</v-icon>
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
                <!-- <v-btn class="primary ml-2">+ ADD NEW PRODUCTO</v-btn> -->
            </v-card-title>
            <v-data-table
            :headers="headers"
            :items="productosAlmacen"
            :search="search"
            >
            <!-- <template v-slot:[`item.actions`]="{}"> -->
                <!-- <v-tooltip bottom>
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
                </v-tooltip> -->
                <!-- <v-tooltip bottom>
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
                 </template> -->
            </v-data-table>
        </v-card>
   </v-container>
</template>

<script>
import axios from 'axios'
import {mapMutations} from 'vuex'
export default {
    data(){
        return{
            productosAlmacen:[],
            search: '',
            datosAlmacen:{},
            id_producto:null,
            producto:{},
            headers: [
            {
                text: 'Id producto',
                align: 'center',
                sortable: false,
                value: 'id_producto',
                class: "primary white--text px-0 mx-0",
            },
            { text: 'Codigo', value: 'codigo_producto' ,align: 'center', class: "primary white--text px-0 mx-0",},
            { text: 'Nombre producto', value: 'nombre_producto',align: 'center', class: "primary white--text px-0 mx-0",},
            { text: 'Cantidad', value: 'cantidad_producto',align: 'center', class: "primary white--text px-0 mx-0", },
            // { text: 'Acciones', value: 'actions', align: 'center',class: "primary white--text px-0 mx-0", },
            ],
            productosCodigo:[],
            products:[]
        }
    },
    mounted(){
        this.getAllPorductsAlmacen(this.$route.params.id)
        this.getDataAlmacen(this.$route.params.id)
        this.getAllProducts();
    },

    methods:{

        ...mapMutations('modalAlert',['setActiveModal','setDesactiveModal']),

        ...mapMutations('overlay',['setActiveOverlay','setDesactiveOverlay']),

        async getAllProducts(){
            try{
                const response = await axios.get('/api/productos');
                this.products = response.data;
            }catch(e){
                console.log(e);
            }
        },

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
        },

        async getProductId(producto){
            let codigo = producto.codigo
            try{
                const response = await axios.get(`/api/productos?codigo=${codigo}`);
                console.log(response.data)
                this.productosCodigo = response.data
            }catch(e){
                console.log(e)
            }
        },

        async addProductAlmacen(data){
            this.setActiveOverlay()
            let cantidad = parseInt(data.cantidad);

            if(cantidad == 0){
                this.setDesactiveOverlay()
                let data = {"status":"warning","icon":"mdi-alert-circle","title":"Pendiente","text":'Debes agregar una cantidad mayor a 0',"textButton":"Cerrar" }
                this.setActiveModal(data)
                setTimeout(()=>{
                    this.setDesactiveModal()
                },2500);
            }else{
                try{
                    let datos = {
                        "id_almacen":parseInt(this.$route.params.id), 
                        "id_producto":parseInt(data.id),
                        "cantidad":cantidad
                    }
                    const response = await axios.post('/api/productosAlmacen',datos);
                    console.log(response.data);
                    this.getAllPorductsAlmacen(this.$route.params.id)
                    if(response.status == 200){
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
        }
    }
}
</script>

<style>

</style>