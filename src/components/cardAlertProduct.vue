<template>
    <div class="alert-product" @click="$emit('view')">
        <div class="data-product">
            <h3>{{ producto.codigo }} </h3>
            <p>{{ producto.nombre }}</p>
            <v-chip color="white"><span>Faltan: {{ producto.cantidad }} </span> pz</v-chip>
            <v-chip color="success" class="mt-2
                    "><span>Pz por caja: {{ producto.topec }} </span> pz</v-chip>
        </div>
        <div class="data-almacenes" v-if="producto.almacenes.length > 0">
            <p>Disponible en:</p>
            <ul>
                <li v-for="(alma, i) of producto.almacenes" :key="i">
                    <p v-if="parseInt(alma.cantidad) > 0"> {{ alma.nombre_almacen }} </p>
                </li>
            </ul>
        </div>
        <div class="data-almacenes" v-else>
            <p>No hay disponibilidad</p>
        </div>
        <v-icon class="icon-alert" color="white" size="30px">mdi-alert</v-icon>
    </div>
</template>

<script>
export default {
    props:['producto']

}
</script>

<style></style>