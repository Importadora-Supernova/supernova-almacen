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
                                                <th class="text-center">
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
                                                    <v-text-field type="number" v-model="productosCodigo[index].cantidad" placeholder="0"></v-text-field>
                                                </td>
                                                <td class="text-center">
                                                    <v-btn class="primary" @click="addProductAlmacen(item,index)">Agregar <v-icon class="ml-1">mdi-plus-circle</v-icon> </v-btn>
                                                    <v-chip class="success ml-2"  label v-if="item.inventario === '0'"><v-icon color="white">mdi-check</v-icon> Inventariado</v-chip>
                                                    <v-chip class="error ml-2" label v-else><v-icon color="white">mdi-close</v-icon> No Inventariado</v-chip>
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

        <v-row>
            <v-col cols="12" md="6" lg="6">
                <v-card>
                    <v-card-title>
                        <v-icon class="mr-2" color="primary" large>mdi-warehouse</v-icon>
                        {{datosAlmacen.nombre_almacen}} Historial
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                         <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <a :href="`https://programacion.importadorasupernova.com/api/reportes/reporteHistorial?id=${$route.params.id}`" target="_blank" style="text-decoration:none"
                                v-bind="attrs"
                                v-on="on"
                                ><v-icon color="error" large>mdi-file-pdf-box</v-icon>
                                </a>
                            </template>
                            <span>Imprimir reporte del historial</span>
                        </v-tooltip>
                    </v-card-title>
                        <v-data-table
                        :headers="headers"
                        :items="productosHistorial"
                        :search="search"
                        :page.sync="page"
                        :items-per-page="itemsPerPage"
                        mobile-breakpoint="0"
                        >
                        <template v-slot:[`item.cod`]="{item}">
                            <v-chip color="amber darken-2" dark><v-icon class="mr-1" color="white">mdi-barcode</v-icon>{{item.codigo}} </v-chip>
                        </template>
                        <template v-slot:[`item.producto`]="{item}">
                            <v-icon color="success">mdi-package-variant</v-icon>{{item.nombre}}  
                        </template>
                        <template v-slot:[`item.almacen`]="{item}">
                            <v-icon color="deep-purple darken-4">mdi-warehouse</v-icon>{{item.nombre_almacen}}  
                        </template>
                        <template v-slot:[`item.cant`]="{item}">
                            <v-chip color="success">{{item.cantidad}} </v-chip>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
            <v-col cols="12" md="6" lg="6">
                 <v-card>
                    <v-card-title>
                        <v-icon class="mr-2" color="primary" large>mdi-warehouse</v-icon>
                        {{datosAlmacen.nombre_almacen}} Productos General
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <a :href="`https://programacion.importadorasupernova.com/api/reportes/reporteHistorial?total=${$route.params.id}`" target="_blank" style="text-decoration:none"
                                v-bind="attrs"
                                v-on="on"
                                ><v-icon color="error" large>mdi-file-pdf-box</v-icon>
                                </a>
                            </template>
                            <span>Imprimir reporte de todos los productos</span>
                        </v-tooltip>
                    </v-card-title>
                        <v-data-table
                        :headers="headerAlmacen"
                        :items="productosAlmacen"
                        :search="search"
                        :page.sync="page"
                        :items-per-page="itemsPerPage"
                        mobile-breakpoint="0"
                        >
                        <template v-slot:[`item.cod`]="{item}">
                            <v-chip color="amber darken-2" dark><v-icon class="mr-1" color="white">mdi-barcode</v-icon>{{item.codigo_producto}} </v-chip>
                        </template>
                        <template v-slot:[`item.nombre`]="{item}">
                            <v-icon color="success">mdi-package-variant</v-icon>{{item.nombre_producto}}  
                        </template>
                        <template v-slot:[`item.cant`]="{item}">
                            <v-chip color="success">{{item.cantidad_producto}} </v-chip>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>

       
   </v-container>
</template>

<script>
import axios from 'axios'
import {mapMutations} from 'vuex'
export default {
    data(){
        return{
            productosAlmacen:[],
            productosHistorial:[],
            page: 1,
            pageCount: 0,
            itemsPerPage: 5,

            search: '',
            datosAlmacen:{},
            id_producto:null,
            producto:{},
            headers: [
            { text: 'Codigo', value: 'cod' ,align: 'center', class: "primary white--text px-0 mx-0",},
            { text: 'Nombre producto', value: 'producto',align: 'left', class: "primary white--text px-0 mx-0",},
            { text: 'Almacen', value: 'almacen',align: 'center', class: "primary white--text px-0 mx-0",},
            { text: 'Cantidad', value: 'cant',align: 'center', class: "primary white--text px-0 mx-0", },
            { text: 'Fecha registro', value: 'fecha_created',align: 'center', class: "primary white--text px-0 mx-0",},
            // { text: 'Acciones', value: 'actions', align: 'center',class: "primary white--text px-0 mx-0", },
            ],
            productosCodigo:[],
            products:[],
            headerAlmacen:[
                { text: 'Codigo', value: 'cod' ,align: 'center', class: "primary white--text px-0 mx-0",},
                { text: 'Nombre producto', value: 'nombre',align: 'left', class: "primary white--text px-0 mx-0",},
                { text: 'Cantidad', value: 'cant',align: 'center', class: "primary white--text px-0 mx-0", },
            ],

            warning:{"status":"warning","icon":"mdi-alert-circle","text":'Debes revisar bien'},
            success:{"status":"success","icon":"mdi-check-circle","text":'Ejecutado exitosamente'},
            error:{"status":"error","icon":"mdi-close","text":'Ocurrio un error'},
        }
    },
    mounted(){
        this.generalData();
    },

    methods:{

        ...mapMutations('modalAlert',['setActiveModal','setDesactiveModal']),

        ...mapMutations('overlay',['setActiveOverlay','setDesactiveOverlay']),

        ...mapMutations('notification',['setActiveNotification']),


        async generalData(){
            const content = await Promise.all([
                this.getAllPorductsAlmacen(),this.getDataAlmacen(),this.getAllPorductosHistorial(),this.getAllProducts()
            ])
            return content;
        },

        async getAllProducts(){
            try{
                const response = await axios.get('/api/productos/',{
                    //    headers:
                    //      {
                    //         'Bearer': sessionStorage.getItem('token')
                    //      } 
                });
                this.products = response.data;
            }catch(e){
                console.log(e);
            }
        },

        async getDataAlmacen(){
            let id = this.$route.params.id;
            try{
                const response = await axios.get(`/api/?id=${id}`,{
                    //    headers:
                    //      {
                    //         'Bearer': sessionStorage.getItem('token')
                    //      } 
                });
                this.datosAlmacen = response.data;
            }catch(e){
                console.log(e)
            }
        },

        async getAllPorductsAlmacen(){
            let id = this.$route.params.id;
            try{
                const response = await axios.get(`/api/productosAlmacen?id=${id}`,{
                    // headers:
                    //      {
                    //         'Bearer': sessionStorage.getItem('token')
                    //      } 
                });
                this.productosAlmacen = response.data
                console.log(response)
            }catch(e){
                console.log(e);
            }
        },

         async getAllPorductosHistorial(){
               let id = this.$route.params.id;
            try{
                const response = await axios.get(`/api/historialProductos?id=${id}`,{
                    // headers:
                    //      {
                    //         'Bearer': sessionStorage.getItem('token')
                    //      } 
                });
                this.productosHistorial = response.data
                console.log(response)
            }catch(e){
                console.log(e);
            }
        },

        async getProductId(producto){
            let codigo = producto.codigo
            try{
                const response = await axios.get(`/api/productos/?codigo=${codigo}`,{
                    //    headers:
                    //      {
                    //         'Bearer': sessionStorage.getItem('token')
                    //      } 
                });
                console.log(response.data)
                this.productosCodigo = response.data
            }catch(e){
                console.log(e)
            }
        },

        async addProductAlmacen(data,index){
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
                        "cantidad":cantidad,
                        "inventario":data.inventario
                    }
                    const response = await axios.post('/api/productosAlmacen',datos,{
                        // headers:
                        //     {
                        //         'Bearer': sessionStorage.getItem('token')
                        //     } 
                    });
                    this.getAllPorductsAlmacen(this.$route.params.id)
                    this.getAllPorductosHistorial(this.$route.params.id)
                    if(response.status == 200){
                        this.productosCodigo.splice(index,1);
                        this.setDesactiveOverlay()
                        this.success.text = 'Producto agregado exitosamente'
                        this.setActiveNotification(this.success)
                    }
                }catch(e){
                    console.log(e);
                }
                

            }
        },

        // async printReportProducts(){
        //     console.log('entrando')
        //     try{
        //         const response = await axios.get(`/api/reportes/reporteHistorial?total=${this.$route.params.id}`);
        //         console.log(response)
        //     }catch(e){
        //         console.log(e);
        //     }
        // }
    }
}
</script>

<style>

</style>