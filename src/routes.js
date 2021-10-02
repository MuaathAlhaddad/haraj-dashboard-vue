export default [
    {
        path: '/login',
        component: require('./components/auth/signIn.vue').default
    },
    {
        path: '/dashboard', component: require('./components/Dashboard.vue').default,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/profile', component: require('./components/Profile.vue').default, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/developer', component: require('./components/Developer.vue').default, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/test', component: require('./components/Test.vue').default, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/users', component: require('./components/Users.vue').default, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ads', component: require('./components/product/Products.vue').default, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ads/tag', component: require('./components/product/Tag.vue').default, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ads/haraj', component: require('./components/product/Haraj.vue').default, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ads/brand', component: require('./components/product/Brand.vue').default, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ads/type', component: require('./components/product/Type.vue').default, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ads/model', component: require('./components/product/Model.vue').default, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/ads/retrieve', component: require('./components/retrieve/RetrieveAds.vue').default, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/users/retrieve', component: require('./components/retrieve/RetrieveUsers.vue').default, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/harajs/retrieve', component: require('./components/retrieve/taxonomies/Haraj.vue').default, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/brands/retrieve', component: require('./components/retrieve/taxonomies/Brand.vue').default, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/models/retrieve', component: require('./components/retrieve/taxonomies/Model.vue').default, meta: {
            requiresAuth: true
        }
    },
    { path: '/types/retrieve', component: require('./components/retrieve/taxonomies/Type.vue').default },
    {
        path: '/reports', component: require('./components/report/Reports.vue').default, meta: {
            requiresAuth: true
        }
    },
    { path: '*', component: require('./components/NotFound.vue').default }
];
