import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/Cart.vue'),
    },
    {
        path: '/cart/continue',
        name: 'NewOrder',
        component: () => import('../views/NewOrder.vue'),
    },
    {
        path: '/product/:id',
        name: 'Product',
        component: () => import('../views/Product.vue'),
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/Cart.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
