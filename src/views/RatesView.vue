<script setup lang="ts">
import { onMounted, watch, ref } from "vue"
import { useRoute } from "vue-router"
import currencies from "@/assets/currencies.json"

const route = useRoute()
const currency = ref({ code: "XXX", name: "Nieznana waluta" })

const updateCurrency = () => {
    currency.value = currencies.find((currency) => currency.code === route.params.code) ?? { code: "XXX", name: "Nieznana waluta" }
    document.title = `Kurs ${currency.value.name} - Kursy walut`
}

onMounted(updateCurrency)
watch(() => route.params.code, updateCurrency)

const storeLastVisited = () => {
    const currencyCode = route.params.code as string
    const lastVisited = JSON.parse(localStorage.getItem("lastVisited") ?? "[]") as Array<string>

    if (lastVisited[0] !== currencyCode) {
        const idx = lastVisited.indexOf(currencyCode)
        if (idx !== -1) lastVisited.splice(idx, 1)
        lastVisited.unshift(currencyCode)
    }

    localStorage.setItem("lastVisited", JSON.stringify(lastVisited))
}

onMounted(storeLastVisited)
watch(() => route.params.code, storeLastVisited)
</script>

<template>
    <h1>{{ currency.name }}</h1>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <h1>Chart Tabela A</h1>
            </div>
            <div class="col-md-6">
                <h1>Chart Tabela C</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <h1>List Tabela A</h1>
            </div>
            <div class="col-md-6">
                <h1>List Tabela C</h1>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Component styles go here */
</style>
