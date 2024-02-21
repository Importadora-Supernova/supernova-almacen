<template>
    <v-dialog v-model="$props.modal" max-width="1000">
        <v-card class="card-alert">
            <v-btn class="mx-2 btn-close" fab dark small @click="$emit('close')">
                <v-icon dark>
                    mdi-close
                </v-icon>
            </v-btn>
            <v-card-title>
                <h3 class="primary--text">Trasladar Productos</h3>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-data-table :headers="cabecera" :items="traslados" class="elevation-6 py-7">
                            <template v-slot:top>
                                <v-toolbar flat class="pb-5">
                                    <v-toolbar-title><v-icon class="mr-5" large color="primary">mdi-compare-horizontal
                                        </v-icon> Traslados </v-toolbar-title>
                                    <v-divider class="mx-4" inset vertical></v-divider>
                                    <v-spacer></v-spacer>
                                    <v-spacer></v-spacer>
                                    <v-spacer></v-spacer>
                                </v-toolbar>
                            </template>
                            <template v-slot:[`item.almacen_d`]="{ item }">
                                <v-autocomplete :items="item.almacenes" item-text="nombre_almacen" item-value="id_almacen"
                                    label="Selecciona Almacen" return-object 
                               ></v-autocomplete>
                            </template>
                            <template v-slot:[`item.cant`]="{ item }">
                                <v-text-field type="number" label="Cantidad" v-model="item.cantidad"></v-text-field>
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        color="success"
                                        v-bind="attrs"
                                        v-on="on"
                                        @click="$emit('move',item)"
                                    >
                                        <v-icon>mdi-swap-horizontal</v-icon>
                                        Trasladar
                                    </v-btn>
                                    </template>
                                    <span>Trasladar productos</span>
                                </v-tooltip>
                            </template>
                        </v-data-table>
                    </v-col>
                </v-row>

            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['modal', 'traslados'],
    data() {
        return {
            cabecera:[
                {
                    text: "Codigo",
                    value: "codigo",
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
                    text: "Almacen Origen",
                    value: "almacen_d",
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
                    text: "Acciones",
                    value: "actions",
                    align: "center",
                    class: "primary white--text px-0 mx-0",
                },
            ]
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