<script setup lang="ts">
import { onMounted, watch, ref } from "vue"
import { useRoute } from "vue-router"
import currencies from "@/assets/currencies.json"

const route = useRoute()
const currency = ref({ code: "XXX", name: "Nieznana waluta" })

let updateCurrency = () => {
    currency.value = currencies.find((currency) => currency.code === route.params.code) ?? { code: "XXX", name: "Nieznana waluta" }
    document.title = `Kurs ${currency.value.name} - Kursy walut`
}

onMounted(updateCurrency)
watch(() => route.params.code, updateCurrency)
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
