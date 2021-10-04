import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login')
    },
    {
        path: '/admin/orders',
        name: 'Orders',
        component: () => import('../views/ViewOrders')
    },
    {
        path: '/admin/newOrder',
        name: 'NewOrder',
        component: () => import('../views/NewOrder')
    },
    {
        path: '/admin/products',
        name: 'ProductList',
        component: () => import('../views/ProductList.vue')
    },
    {
        path: '/admin/product/:id',
        name: 'ProductPreview',
        component: () => import('../views/Preview.vue')
    },
    {
        path: '/admin/newProduct',
        name: 'ProductItem',
        component: () => import('../views/ProductItem.vue')
    },
    {
        path: '/admin/colors',
        name: 'ProductColors',
        component: () => import('../views/ProductColors.vue')
    },
    {
        path: '/admin/sizes',
        name: 'ProductSizes',
        component: () => import('../views/ProductSizes.vue')
    },
    {
        path: '/:chapters*',
        redirect: '/admin/orders'
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
