<script setup lang="ts">
import { onMounted, watch, ref } from "vue"
import { useRoute } from "vue-router"
import type Currency from "@/types/Currency"
import type Rate from "@/types/Rate"
import currenciesJson from "@/assets/currencies.json"

const currencies = currenciesJson as Currency[]

const route = useRoute()
const currency = ref({} as Currency)
const rateA = ref([] as Rate[])

const updateCurrency = () => {
    currency.value = currencies.find((currency) => currency.code === route.params.code) ?? { code: "XXX", name: "Nieznana waluta" } as Currency
    document.title = `Kurs ${currency.value.name} - Kursy walut`
}

// const updateRate = async () => {
//     const response = await fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${currency.value.code}/last/1/?format=json`)
//     const data = await response.json()
//     rateA.value = data.rates[0]
// }

const storeLastVisitedCurrency = () => {
    const currencyCode = route.params.code as string
    const lastVisited = JSON.parse(localStorage.getItem("lastVisited") ?? "[]") as Array<string>

    if (lastVisited[0] !== currencyCode) {
        const idx = lastVisited.indexOf(currencyCode)
        if (idx !== -1) lastVisited.splice(idx, 1)
        lastVisited.unshift(currencyCode)
    }

    localStorage.setItem("lastVisited", JSON.stringify(lastVisited))
}

onMounted(() => {
    updateCurrency()
    storeLastVisitedCurrency()
})

watch(() => route.params.code, () => {
    updateCurrency()
    storeLastVisitedCurrency()
})
</script>

<template>
    <h1>{{ currency.name }}</h1>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1>Chart Tabela A</h1>
            </div>
            <div class="col">
                <h1>Chart Tabela C</h1>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h1>List Tabela A</h1>
            </div>
            <div class="col">
                <h1>List Tabela C</h1>
            </div>
        </div>
    </div>
</template>

<style scoped>
h1 {
    text-align: center;
    margin: 30px 0;
}
</style>
