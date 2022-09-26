<template>
  <v-container class="px-5 py-3">
    <v-row class="mt-5">
      <v-col cols="12">
        <v-card elevation="3" class="px-5 py-5">
          <v-row>
            <v-col cols="12">
              <v-alert type="info" outlined>
                Para añadir productos al almacen de garantia debes buscar los
                productos por numero de orden de compra
              </v-alert>
            </v-col>
            <v-col cols="5" class="d-flex">
              <v-text-field
                type="search"
                label="Numero de Orden"
                v-model="orden"
                @keyup.enter="getAllProductsOrden"
              ></v-text-field>
              <v-btn class="mt-3 ml-1 primary" @click="getAllProductsOrden">
                Buscar
                <v-icon class="ml-2">mdi-clipboard-text-search</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" v-if="productosOrdenes.length > 0">
              <v-simple-table>
                <template v-slot:default>
                  <thead class="primary">
                    <tr class="">
                      <th class="text-center white--text">Id</th>
                      <th class="text-center white--text">Nombre</th>
                      <th class="text-center white--text">Codigo</th>
                      <th class="text-center white--text">Precio</th>
                      <th class="text-center white--text">Cantidad</th>
                      <th class="text-center white--text">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in productosOrdenes" :key="index">
                      <td class="text-center">{{ item.id }}</td>
                      <td class="text-center">{{ item.nombre }}</td>
                      <td class="text-center">{{ item.codigo }}</td>
                      <td class="text-center">{{ item.precio }}</td>
                      <td class="text-center">{{ item.cantidad }}</td>
                      <td class="text-center">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              icon
                              color="success"
                              v-bind="attrs"
                              v-on="on"
                            >
                              <v-icon>mdi-swap-horizontal</v-icon>
                            </v-btn>
                          </template>
                          <span>Reintegro de mercancia</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              icon
                              color="primary"
                              v-bind="attrs"
                              v-on="on"
                              @click="transferAlmacenGarantia(item)"
                            >
                              <v-icon>mdi-warehouse</v-icon>
                            </v-btn>
                          </template>
                          <span>Enviar a almacen de garantia</span>
                        </v-tooltip>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    data(){
        return{
            // productosOrdenes:[
            //     {id:1,codigo:"4587",nombre:"Nombre producto",precio:120,cantidad:5}
            // ]
        }
    }
};
</script>

<style>
</style>