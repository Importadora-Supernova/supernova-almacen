import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    // base: "/dist/",
    routes: [{
            path: '/',
            name: 'login',
            meta: {
                layout: 'login-layout'
            },
            component: () =>
                import ('../view/Login-almacen.vue'),
        },
        {
            path: '/home',
            name: 'almacen-home',
            meta: {
                layout: 'dashboard-layout',
                auth: true
            },
            component: () =>
                import ('../view/home-almacen.vue'),
        },
        {
            path: '/almacen',
            name: 'almacen-supernova',
            meta: {
                layout: 'dashboard-layout',
                auth: true
            },
            component: () =>
                import ('../view/almacenes-admin.vue'),
        },
        {
            path: '/almacen/:id',
            name: 'almacenDescripcion',
            meta: {
                layout: 'dashboard-layout',
                auth: true
            },
            component: () =>
                import ('../view/almacenInfo.vue'),
        },
        {
            path: '/traspasos',
            name: 'traspasos',
            meta: {
                layout: 'dashboard-layout',
                auth: true
            },
            component: () =>
                import ('../view/traspasos-almacen.vue'),
        },
        {
            path: '/almacenGeneral',
            name: 'almacenGeneral',
            meta: {
                layout: 'dashboard-layout',
                auth: true
            },
            component: () =>
                import ('../view/almacen-general.vue'),
        },
        {
            path: '/productosAlmacen',
            name: 'productosAlmacen',
            meta: {
                layout: 'dashboard-layout',
                auth: true
            },
            component: () =>
                import ('../view/productos-almacen.vue'),
        },
        {
            path: '/garantia/almacen',
            name: 'garantiaAlmacen',
            meta: {
                layout: 'dashboard-layout',
                auth: true
            },
            component: () =>
                import ('../view/almacen-garantia-almacen.vue'),
        },
        {
            path: '/garantia/tienda',
            name: 'garantiaTinda',
            meta: {
                layout: 'dashboard-layout',
                auth: true
            },
            component: () =>
                import ('../view/almacen-garantia-tienda.vue'),
        },
        {
            path:'/pedidos/almacen',
            name:'pedidosAlmacen',
            meta:{
                layout:'dashboard-layout',
                auth:true
            },
            component:()=> import ('../view/pedidos/almacen-pedidos.vue'),
        },
        {
            path:'/alertProducts',
            name:'alertaProductos',
            meta:{
                layout:'alert-layout',
                auth:true
            },
            component:()=> import ('../view/alert-products.vue'),
        }

    ]


})

router.beforeEach((to, from, next) => {

    let autenticado = sessionStorage.getItem('autenticado')

    let autorizacion = to.matched.some(record => record.meta.auth)

    if (autorizacion && !autenticado) {
        const loginpath = window.location.pathname;
        next({ name: 'login', query: { from: loginpath } });
    } else {
        next();
    }
});

export default router;