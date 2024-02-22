<template>
    <v-dialog v-model="$props.modal" max-width="600">
        <v-card class="card-alert">
            <v-btn class="mx-2 btn-close" fab dark small @click="$emit('close')">
                <v-icon dark>
                    mdi-close
                </v-icon>
            </v-btn>
            <v-card-title class="align-center">
                <h3 class="error--text text-center" style="font-size:26px">CONFIRMAR</h3>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" class="text-center">
                        <h3 style="font-size:24px">Estas Seguro de realizar el traslado de:</h3>
                        <p class="mt-3"> <b>{{ datos.codigo  }} {{ datos.nombre }} </b> </p> 
                        <v-chip color="warning" style="font-size:20px">{{ datos.cantidad_add }}pz </v-chip> <br>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-col cols="12" class="text-right">
                    <v-btn text color="error" class="mr-3" @click="$emit('close')">No</v-btn>
                    <v-btn color="success">SI</v-btn>
                </v-col>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['modal','datos'],
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style lang="scss">
.card-alert {
    position: relative;

    #btn-modal {
        width: 230px !important;
        margin-top: 21px !important;
    }

    .btn-close {
        position: absolute;
        background: rgb(172, 34, 34) !important;
        top: 6px;
        right: -4px;
        width: 30px !important;
        height: 30px !important;

    }
}
</style>