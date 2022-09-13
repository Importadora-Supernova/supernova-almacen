import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'almacen-supernova',
            meta: {
                layout: 'dashboard-layout'
            },
            component: () =>
                import ('../view/almacenes-admin.vue'),
        },
        {
            path: '/almacen/:id',
            name: 'almacenDescripcion',
            meta: {
                layout: 'dashboard-layout'
            },
            component: () =>
                import ('../view/almacenInfo.vue'),
        },

    ]


})

// router.beforeEach((to, from, next) => {

//     let autenticado = sessionStorage.getItem('autenticado')

//     let autorizacion = to.matched.some(record => record.meta.auth)

//     if (autorizacion && !autenticado) {
//         const loginpath = window.location.pathname;
//         next({ name: 'login', query: { from: loginpath } });
//     } else {
//         next();
//     }
// });

export default router;