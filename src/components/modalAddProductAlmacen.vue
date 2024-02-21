<template>
    <v-dialog v-model="$props.modal" max-width="600">
        <v-card class="card-alert">
               <v-btn
                class="mx-2 btn-close"
                fab
                dark
                small
                @click="$emit('close')"
                >
                <v-icon dark>
                    mdi-close
                </v-icon>
            </v-btn>
            <v-card-title>
                <h3 class="primary--text">Agregar Productos</h3>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" >
                        <p><v-icon color="indigo">mdi-warehouse</v-icon> <b>Almacen:  {{ dataTraslado.nombre_almacen }} </b></p> 
                    </v-col>
                    <v-col cols="6" >
                        <p><b>DATOS DEL PRODUCTO:</b></p> 
                    </v-col>
                    <v-col cols="6" class="text-right">
                        <v-chip color="warning" label outlined>Disponible: {{ dataTraslado.cantidad }}pz </v-chip>
                    </v-col>
                    <v-col cols="8" >
                        <v-chip color="success">{{ dataTraslado.codigo }} - {{ dataTraslado.nombre }} </v-chip>
                    </v-col>
                    <v-col cols="4" class="text-right">
                        <v-chip color="indigo" label text-color="white" >Pz por caja: {{ dataTraslado.topec }}pz </v-chip>
                    </v-col>
                    <v-col cols="12" >
                        <v-text-field outlined label="Cantidad" type="number" placeholder="0" v-model="cantidad"></v-text-field>
                    </v-col>

                    <v-col cols="12" class="text-right">
                        <hr>
                        <v-btn color="primary" class="mt-2" @click="addProduct(cantidad)"><v-icon >mdi-tag-plus</v-icon> Agregar</v-btn>
                    </v-col>
                </v-row>
                
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {    
   props:['modal','dataTraslado'],
   data(){
    return{
        cantidad:0
    }
   },
    methods:{
        addProduct(cantidad){
            this.$emit('add',cantidad)
            this.cantidad = 0
        }
    }
}
</script>

<style lang="scss">
    .card-alert{
        position: relative;

        #btn-modal{
            width: 230px !important;
            margin-top: 21px !important;
        }
        .btn-close{
            position: absolute;
            background: rgb(172, 34, 34) !important; 
            top: 6px;
            right: -4px;
            width: 30px !important;
            height: 30px !important;

        }
    }
</style>