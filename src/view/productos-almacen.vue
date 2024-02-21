<template>
    <v-container class="px-5 py-3">
        <modalTrasladarProductos 
        :modal="modal_trasladar" 
        :Almacenes="destinos" 
        :dataTraslado="traslado"
        @moveProducts="tranferProducts" 
        @close="closeModalTrasladar"
        ></modalTrasladarProductos>

        <modalAddProductAlmacen  
        :modal="modal_add" 
        :dataTraslado="traslado" 
        @add="sendProductAlmacen" 
        @close="closeModalAdd"
        ></modalAddProductAlmacen>

        <v-row>
            <v-col cols="12">
                <v-card elevation="3" class="px-4 py-2 mt-3">
                    <v-row class="pt-5">
                        <v-col cols="12" sm="4" md="4">
                            <v-autocomplete :items="products" item-text="fullname" item-value="id"
                                label="Filtrar producto por Codigo o Nombre" return-object v-model="producto"
                                :disabled="!permisos.productos_almacenes" @change="getProductId(producto)"></v-autocomplete>
                        </v-col>
                    </v-row>

                    <v-row v-if="registerNew">
                        <v-col cols="12">
                            <v-alert type="info">
                                El producto no esta registrado en los almacenes, desea registrarlo ? seleccione almacen y
                                cantidad
                            </v-alert>
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
                                                <th>
                                                    Almacen
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
                                            <tr>
                                                <td>{{ producto.codigo }} </td>
                                                <td>{{ producto.fullname }} </td>
                                                <td>
                                                    <v-autocomplete label="Almacen" :items="almacenes"
                                                        item-text="nombre_almacen" item-value="id"
                                                        append-icon="mdi-warehouse" v-model="almacen"></v-autocomplete>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" v-model="cantidad"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-btn class="primary" @click="addProductAlmacen(producto)">Agregar
                                                        <v-icon class="ml-1">mdi-plus-circle</v-icon> </v-btn>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-data-table :headers="cabecera" :items="productoAlmacenes" class="py-7">
                        <template v-slot:top>
                            <v-toolbar flat class="pb-5">
                                <v-toolbar-title><v-icon class="mr-5" color="primary">mdi-cart </v-icon> Productos por
                                    Almacen </v-toolbar-title>
                                <v-divider class="mx-4" inset vertical></v-divider>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                        </template>
                        <template v-slot:[`item.almacen`]="{ item }">
                            <span><v-icon color="indigo">mdi-warehouse</v-icon> {{ item.nombre_almacen }} </span>
                        </template>
                        <template v-slot:[`item.cod`]="{ item }">
                            <v-chip color="warning"><v-icon color="white">mdi-barcode</v-icon> {{ item.codigo }} </v-chip>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon color="indigo" v-bind="attrs" v-on="on" :disabled="item.cantidad <= 0"
                                        @click="trasladarProductos(item)">
                                        <v-icon>mdi-swap-horizontal-bold</v-icon>
                                    </v-btn>
                                </template>
                                <span>Trasladar Productos</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon color="success" v-bind="attrs" v-on="on" :disabled="item.cantidad <= 0" @click="addProduct(item)">
                                        <v-icon>mdi-tag-plus</v-icon>
                                    </v-btn>
                                </template>
                                <span>Agregar Productos</span>
                            </v-tooltip>
                        </template>
                    </v-data-table>
                    <v-chip label class="success">total productos:{{ total_productos }}</v-chip>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
//import components
import modalTrasladarProductos from '@/components/modalTrasladarProductos.vue'
import modalAddProductAlmacen from '@/components/modalAddProductAlmacen.vue'


export default {
    components: {
        modalTrasladarProductos,
        modalAddProductAlmacen
    },
    data() {
        return {
            productoAlmacenes: [],
            products: [],
            permisos: [],
            producto: {},
            almacenes: [],
            almacen: '',


            registerNew: false,
            total_productos: 0,
            cantidad: 0,
            cabecera: [
                {
                    text: "ID del almacen",
                    value: "id_almacen",
                    align: "center",
                    class: "primary white--text px-0 mx-0",
                },
                {
                    text: "Nombre de Almacen",
                    value: "almacen",
                    align: "left",
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
                    value: "cod",
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
                    text: "Acciones",
                    value: "actions",
                    align: "center",
                    class: "primary white--text px-0 mx-0",
                },
            ],
            modal_trasladar: false,
            traslado: {},
            destinos: [],

            modal_add:false
        }
    },

    computed: {
        fechaActual() {
            const f = new Date()
            let day = f.getDate();
            let month = f.getMonth();
            let year = f.getFullYear();

            month = month + 1

            day = ('0' + day).slice(-2);
            month = ('0' + month).slice(-2);
            return `${day}/${month}/${year}`
        },
    },

    mounted() {
        this.getAllProducts();
        this.getAllAlmacenes();
        this.getPermisos();
    },

    methods: {

        ...mapMutations('modalAlert', ['setActiveModal', 'setDesactiveModal']),

        ...mapMutations('overlay', ['setActiveOverlay', 'setDesactiveOverlay']),

        async getPermisos() {
            let ID = sessionStorage.getItem('id');
            let id = parseInt(ID);
            try {
                const res = await axios.get(`/api/admin/permisos?id=${id}`);
                this.permisos = res.data;
            } catch (e) {
                console.log(e)
            }

        },

        async getAllProducts() {
            try {
                const response = await axios.get('/api/productos/?total=total', {
                    // headers:
                    //     {
                    //         'Bearer': sessionStorage.getItem('token')
                    //     } 
                });
                this.products = response.data;
            } catch (e) {
                console.log(e);
            }
        },

        async getAllAlmacenes() {
            try {
                const response = await axios.get('/api/')
                this.almacenes = response.data
            } catch (e) {
                console.log(e)
            }
        },

        calculo() {
            const acumular = (acumulador, producto) => acumulador + parseInt(producto.cantidad)
            this.total_productos = this.productoAlmacenes.reduce(acumular, 0)

        },

        async getProductId(producto) {
            this.setActiveOverlay()
            let id = parseInt(producto.id);
            try {
                const response = await axios.get(`/api/cantidadProductosAlmacen?id=${id}`, {
                    // headers:
                    //     {
                    //         'Bearer': sessionStorage.getItem('token')
                    //     } 
                });
                this.productoAlmacenes = response.data
                if (this.productoAlmacenes.length === 0) {
                    this.registerNew = true
                    this.setDesactiveOverlay()
                    let data = { "status": "warning", "icon": "mdi-alert-circle", "title": "Alerta", "text": 'Este producto no esta asignado en almacenes', "textButton": "Cerrar" }
                    this.setActiveModal(data)
                    setTimeout(() => {
                        this.setDesactiveModal()
                    }, 3500);
                } else {
                    this.setDesactiveOverlay()
                    this.registerNew = false
                }
                this.calculo()

            } catch (e) {
                console.log(e);
                let data = { "status": "error", "icon": "mdi-alert-circle", "title": "Ocurrio un error", "text": e, "textButton": "Cerrar" }
                this.setActiveModal(data)
            }
        },

        async addProductAlmacen(product) {

            this.setActiveOverlay()
            let cantidad = parseInt(this.cantidad);

            if (cantidad == 0) {
                this.setDesactiveOverlay()
                let data = { "status": "warning", "icon": "mdi-alert-circle", "title": "Pendiente", "text": 'Debes agregar una cantidad mayor a 0', "textButton": "Cerrar" }
                this.setActiveModal(data)
                setTimeout(() => {
                    this.setDesactiveModal()
                }, 2500);
            } else if (this.almacen === '') {
                this.setDesactiveOverlay()
                let data = { "status": "warning", "icon": "mdi-alert-circle", "title": "Pendiente", "text": 'Debes agregar un almacen', "textButton": "Cerrar" }
                this.setActiveModal(data)
                setTimeout(() => {
                    this.setDesactiveModal()
                }, 2500);
            } else {
                try {
                    let datos = {
                        "id_almacen": parseInt(this.almacen),
                        "id_producto": parseInt(product.id),
                        "cantidad": cantidad
                    }
                    const response = await axios.post('/api/productosAlmacen', datos, {
                        // headers:
                        //    {
                        //       'Bearer': sessionStorage.getItem('token')
                        //    } 
                    });
                    console.log(response.data);
                    if (response.status == 200) {
                        await this.getProductId(product);
                        this.setDesactiveOverlay()
                        let data = { "status": "success", "icon": "mdi-check", "title": "Agregado", "text": 'Producto agregado exitosamente', "textButton": "Cerrar" }
                        this.setActiveModal(data)
                        setTimeout(() => {
                            this.setDesactiveModal()
                        }, 2500);
                    }
                } catch (e) {
                    console.log(e);
                }


            }
        },

        modifiCantidad(item) {
            this.nombreAlmacen = item.nombre_almacen
            this.nombreProducto = item.nombre
            this.codigoProducto = item.codigo
            this.cantidadModificar = parseInt(item.cantidad)
            this.modalModificar = true
        },

        closeModalModificar() {
            this.modalModificar = false
        },

        //abrir modal para trasladar productos
        trasladarProductos(item) {
            this.traslado = Object.assign({}, item)
            this.verificarAlmacenOrigen(item.id_almacen)
            this.modal_trasladar = true
        },

        //verificar el almacen origen para filtrar solo los disponibles
        verificarAlmacenOrigen(id) {
            const filtro = this.almacenes.filter(item => item.id != id);
            this.destinos = [...filtro];
        },

        //validacion de envio de producto
        tranferProducts(id_almacen, cantidad) {
            let validate = true;
            if (id_almacen == null) {
                let data = { "status": "warning", "icon": "mdi-alert-circle", "title": "Pendiente", "text": 'Selecciona un almacen Destino', "textButton": "Cerrar" }
                this.setActiveModal(data)
                setTimeout(() => {
                    this.setDesactiveModal()
                }, 2500);
                validate = false;
            }

            if (parseInt(cantidad) <= 0) {
                let data = { "status": "warning", "icon": "mdi-alert-circle", "title": "Pendiente", "text": 'Introduce una cantidad correcta', "textButton": "Cerrar" }
                this.setActiveModal(data)
                setTimeout(() => {
                    this.setDesactiveModal()
                }, 2500);
                validate = false;
            }

            if (parseInt(cantidad) > parseInt(this.traslado.cantidad)) {
                console.log(id_almacen)
                let data = { "status": "warning", "icon": "mdi-alert-circle", "title": "Pendiente", "text": 'Cantidad excede a la disponible', "textButton": "Cerrar" }
                this.setActiveModal(data)
                setTimeout(() => {
                    this.setDesactiveModal()
                }, 2500);
                validate = false;
            }

            if (validate) {
                let data = {
                    "id_almacen":parseInt(this.traslado.id_almacen),
                    "id_almacen_destino":parseInt(id_almacen),
                    "id_producto":parseInt(this.traslado.id_producto),
                    "cantidad":parseInt(cantidad),
                    "fecha_created":this.fechaActual 
                }
                this.saveTrasladoProducto(data)
            } else {
                return;
            }

        },

        //enviar traslado de producto
        async saveTrasladoProducto(data){
            try{
                const response = await axios.post(`/api/traslados`,data,{
                });
                if(response.status == 200){
                    let datos = {"status":"success","icon":"mdi-compare-horizontal","title":"Exitoso","text":response.data.mensaje,"textButton":"Cerrar" }
                    this.setActiveModal(datos)
                    this.refreshProduct(data.id_producto)
                    this.closeModalTrasladar()
                    setTimeout(()=>{
                        this.setDesactiveModal()
                    },3000);
                }
            }catch(e){
                console.log(e);
            }
        },

        //actualizar la lista de productos por almacen
        async refreshProduct(id_product) {
            let id = parseInt(id_product);
            try {
                const response = await axios.get(`/api/cantidadProductosAlmacen?id=${id}`);
                this.productoAlmacenes = response.data
                this.calculo()
            } catch(e){
                console.log(e);
                let data = { "status": "error", "icon": "mdi-alert-circle", "title": "Ocurrio un error", "text": e, "textButton": "Cerrar" }
                this.setActiveModal(data)
            }
        },
        //cerrar modal de traslado
        closeModalTrasladar() {
            this.traslado = {}
            this.modal_trasladar = false
        },

        addProduct(item){
            this.traslado = Object.assign({}, item)
            this.modal_add = true
        },

        //validacion y envio de producto
        async sendProductAlmacen(cantidad) {
            if (parseInt(cantidad) == 0) {
                let data = { "status": "warning", "icon": "mdi-alert-circle", "title": "Pendiente", "text": 'Introduce una cantidad correcta', "textButton": "Cerrar" }
                this.setActiveModal(data)
                setTimeout(() => {
                    this.setDesactiveModal()
                }, 2500);
            }else{
                try{
                    let datos = {
                        "id_almacen":parseInt(this.traslado.id_almacen), 
                        "id_producto":parseInt(this.traslado.id_producto),
                        "cantidad":parseInt(cantidad),
                        "inventario":"0"
                    }
                    const response = await axios.post('/api/productosAlmacen',datos);
                    if(response.status == 200){
                        let dataModal = { "status": "success", "icon": "mdi-check-circle", "title": "Exitoso!!!", "text": 'Producto Agregado satisfactoriamente', "textButton": "Cerrar" }
                        this.setActiveModal(dataModal)
                        this.refreshProduct(this.traslado.id_producto)
                        this.closeModalAdd()
                        setTimeout(() => {
                            this.setDesactiveModal()
                        }, 2500);
                    }
                }catch(e){
                    console.log(e)
                    let dataModal = { "status": "error", "icon": "mdi-alert", "title": "Error!!!", "text": 'Ocurrio un error', "textButton": "Cerrar" }
                    this.setActiveNotification(dataModal)
                }
            }
        },

        closeModalAdd(){
            this.traslado = {}
            this.modal_add = false
        }
    }
}
</script>

<style></style>