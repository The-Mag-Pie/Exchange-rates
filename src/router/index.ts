import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import RatesView from "../views/RatesView.vue"
import ConverterView from "../views/ConverterView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView
        },
        {
            path: "/currency/:code",
            name: "currency",
            component: RatesView
        },
        {
            path: "/converter",
            name: "converter",
            component: ConverterView
        }
    ]
})

export default router
