import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SellItems from '../views/SellItems.vue'
import EditProfile from '../views/EditProfile.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/SellItems',
        name: 'SellItems',
        component: SellItems
    },
    {
        path: '/EditProfile',
        name: 'EditProfile',
        component: EditProfile
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
