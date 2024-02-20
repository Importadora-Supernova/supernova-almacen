<template>
    <v-dialog v-model="$props.modal" max-width="700">
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
                <h3 class="primary--text">Traslasdar Productos</h3>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" >
                        <p><v-icon color="indigo">mdi-warehouse</v-icon> <b>Almacen Origen:  {{ dataTraslado.nombre_almacen }} </b></p> 
                    </v-col>
                    <v-col cols="12" >
                        <p><b>DATOS DEL PRODUCTO:</b></p> 
                    </v-col>
                    <v-col cols="8">
                        <v-chip color="success">{{ dataTraslado.codigo }} - {{ dataTraslado.nombre }} </v-chip>
                    </v-col>
                    <v-col cols="4">
                        <v-chip color="primary">Pz por caja: {{ dataTraslado.topec }} </v-chip>
                    </v-col>  
                    <v-col cols="6">
                        <v-autocomplete
                        label="Almacen de Destino"
                        :items="Almacenes"
                        item-text="nombre_almacen"
                        item-value="id"
                        outlined
                        append-icon="mdi-warehouse"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field type="number" label="Cantidad a trasladar" outlined placeholder="0" :max="parseInt(dataTraslado.cantidad)"></v-text-field>
                    </v-col>
                    <v-col cols="12" class="text-right">
                        <hr>
                        <v-btn color="primary" class="mt-2"><v-icon >mdi-swap-horizontal-bold</v-icon> Trasladar</v-btn>
                    </v-col>
                </v-row>
                
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {    
   props:['modal','dataTraslado','Almacenes'],
    methods:{
        
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