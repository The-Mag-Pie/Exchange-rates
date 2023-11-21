<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import { RouterLink } from "vue-router"
import currencies from "@/assets/currencies.json"

const html = document.documentElement
const darkModeEnabled = html.getAttribute("data-bs-theme") == "dark" ? ref(true) : ref(false)

watch(darkModeEnabled, (value) => {
    if (value) {
        html.setAttribute("data-bs-theme", "dark")
    } else {
        html.setAttribute("data-bs-theme", "light")
    }
})

onMounted(() => {
    darkModeEnabled.value = window.matchMedia("(prefers-color-scheme: dark)").matches
})
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <RouterLink to="/" class="navbar-brand">Kursy walut</RouterLink>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink to="/" class="nav-link" active-class="active">Strona główna</RouterLink>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Waluty</a>
                        <ul class="dropdown-menu">
                            <li v-for="{ code, name } in currencies" :key="code">
                                <RouterLink :to="`/currency/${code}`" class="dropdown-item" active-class="active">{{ name }}</RouterLink>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/converter" class="nav-link" active-class="active">Przelicznik walut</RouterLink>
                    </li>
                </ul>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="darkModeSwitch" v-model="darkModeEnabled" />
                    <label class="form-check-label" for="darkModeSwitch">Tryb ciemny</label>
                </div>
            </div>
        </div>
    </nav>
</template>
