<template>
   <v-container>

       <v-dialog max-width="500" v-model="modal_almacen">
          <v-card >
              <v-card-title class="primary d-flex justify-space-between">
                <h4 class="white--text">Agregar un almacen nuevo</h4>
                <v-icon large color="white">mdi-warehouse</v-icon>
              </v-card-title>
              <v-card-text>
                 <v-row class="mt-3">
                    <v-col cols="12">
                        <v-text-field type="text" label="Nombre del almacen" v-model="almacen.nombre_almacen"></v-text-field>
                        <v-text-field type="text" label="Tipo de Almacen" v-model="almacen.tipo"></v-text-field>
                        <v-autocomplete
                        label="Status"
                        :items="status"
                        item-text="nombre_status"
                        item-value="id"
                        v-model="id_status"
                        @change="selectStatus(id_status)"
                        ></v-autocomplete>
                    </v-col>
                 </v-row>
              </v-card-text>
              <v-card-actions>
                <v-col cols="12" class="text-right">
                    <v-btn text color="error" @click="modal_almacen = false">Cancelar</v-btn>
                    <v-btn class="primary ml-2" @click="sendFormData">Guardar</v-btn>
                </v-col>
              </v-card-actions>
          </v-card>
       </v-dialog>

        <v-dialog v-model="modal_delete" max-width="500" >
            <v-card >
                <v-card-title class="error">
                    <h4 class="white--text">Esta seguro que desea eliminmar este registro?</h4>
                </v-card-title>
                <v-card-text>
                    <v-row class="mt-3">
                        <v-col class="text-center">
                            <v-icon large color="error">mdi-delete-empty</v-icon>  
                            <h1>{{almacen_delete}}</h1>
                        </v-col> 
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-col class="text-right">
                        <v-btn text color="error" @click="modal_delete = false">cancelar</v-btn>
                        <v-btn class="primary ml-2" @click="deleteAlmacen()">aceptar</v-btn>
                    </v-col>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-row>
            <v-col cols="12" class="d-flex justify-space-between">
                 <h2>Almacenes</h2>
                 <v-btn class="primary" @click="modal_almacen = true">+ Add new almacen</v-btn>
            </v-col>
           
            <card-almacen 
            v-for="item of almacenes" :key="item.id"
            :data="item"
            @delete="confirmEliminarAlmacen"
            @view="viewInformation"
            ></card-almacen>

        </v-row>
   </v-container>
</template>

<script>
import axios from 'axios'
import cardAlmacen from '../components/card-almacen.vue'
export default {
    components:{cardAlmacen},
    data(){
        return{
            almacenes:[],
            status:[],
            modal_almacen:false,
            modal_delete:false,
            id_status:null,
            id_delete:null,
            almacen_delete:'',
            almacen:{
                nombre_almacen:"",
                tipo:"",
                status:null,
                fecha_create:''
            }
        }
    },

    mounted(){
        this.getAllAlmacenes();
        this.getAllStatus();
    },

    computed:{
          fechaActual(){
                    const f = new Date()
                    let day = f.getDate();
                    let month = f.getMonth();
                    let year = f.getFullYear();

                    month = month+1

                    day   = ('0' + day).slice(-2);
                    month = ('0' + month).slice(-2);
                    return `${day}/${month}/${year}`
                },
    },

    methods:{

        async getAllAlmacenes(){
            try{
                const response = await axios.get('/api/')
                this.almacenes = response.data
            }catch(e){
                console.log(e)
            }
        },

         async getAllStatus(){
            try{
                const response = await axios.get('/api/status')
                this.status = response.data
                console.log(this.status)
            }catch(e){
                console.log(e)
            }
        },

        async sendFormData(){
            this.almacen.fecha_create = this.fechaActual
            try{
                const response = await axios.post('/api/',this.almacen);
                this.getAllAlmacenes()
                this.modal_almacen = false
                console.log(response.data)
            }catch(e){
                console.log(e);
            }
        },

        selectStatus(id){
            this.almacen.status = parseInt(id);
        },

        confirmEliminarAlmacen(almacen){
            this.id_delete = almacen.id,this.almacen_delete = almacen.nombre_almacen
            this.modal_delete = true
        },

        viewInformation(data){
           let id = parseInt(data.id); 
           this.$router.push(`/almacen/${id}`);
        },

        async deleteAlmacen(){
            try{
                const response = await axios.delete(`/api/?id=${this.id_delete}`);
                console.log(response.data);
                this.getAllAlmacenes()
                this.modal_delete = false
                this.id_delete = null
                this.almacen_delete = ''
            }catch(e){
                console.log(e)
            }
        }
    }
}
</script>

<style>

</style>