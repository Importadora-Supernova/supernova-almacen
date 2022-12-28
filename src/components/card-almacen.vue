<template>
  <v-col cols="12" sm="4" md="4">
    <v-card class="mx-auto" elevation="2" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4">Status: {{ data.status }}</div>
          <v-list-item-title class="text-h5 mb-1">
            {{ data.nombre_almacen }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Fecha de creacion : {{ data.fecha_create }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="blue lighten-1">
          <v-icon large color="white">mdi-warehouse</v-icon>
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn outlined rounded text color="primary" @click="$emit('view',data)" :disabled="!permiso"> Ver <v-icon class="ml-1">mdi-eye</v-icon> </v-btn>
        <v-btn outlined rounded text color="error" disabled  @click="deleteAlmacen(data)"> Eliminar <v-icon class="ml-1">mdi-delete</v-icon></v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
    props:['data','permiso'],

    methods:{
        deleteAlmacen(data){
            this.$emit('delete',data);
        }
    }
};
</script>

<style>
</style>