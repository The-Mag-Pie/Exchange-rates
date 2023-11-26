<script setup lang="ts">
import { onMounted, watch, ref } from "vue"
import { useRoute } from "vue-router"
import type Currency from "@/types/Currency"
import type Rate from "@/types/Rate"
import currenciesJson from "@/assets/currencies.json"
import axios from "axios"
import apiUrls from "@/assets/apiUrls.json"
import Loader from "@/components/SpinnerLoader.vue"
import LastRates from "@/components/LastRates.vue"
import RatesChart from "@/components/RatesChart.vue"

const currencies = currenciesJson as Currency[]

const route = useRoute()
const lastCount = ref(30)
const isLoading = ref(true)
const currency = ref({} as Currency)
const ratesA = ref([] as Rate[])
const ratesC = ref([] as Rate[])

const updateCurrency = () => {
    currency.value = currencies.find((currency) => currency.code === route.params.code) ?? { code: "XXX", name: "Nieznana waluta" } as Currency
    document.title = `Kurs ${currency.value.name} - Kursy walut`
}

const updateRates = async () => {
    isLoading.value = true
    try {
        let response = await axios.get(apiUrls.lastRatesA
            .replace("{code}", currency.value.code)
            .replace("{count}", lastCount.value.toString()))
        ratesA.value = response.data.rates
    } catch (err) {
        console.log(err)
        ratesA.value = []
    }

    try {
        let response = await axios.get(apiUrls.lastRatesC
            .replace("{code}", currency.value.code)
            .replace("{count}", lastCount.value.toString()))
        ratesC.value = response.data.rates
    } catch (err) {
        console.log(err)
        ratesC.value = []
    }
    isLoading.value = false
}

const storeLastVisitedCurrency = () => {
    const currencyCode = route.params.code as string
    const lastVisited = JSON.parse(localStorage.getItem("lastVisited") ?? "[]") as Array<string>

    if (lastVisited[0] !== currencyCode) {
        const idx = lastVisited.indexOf(currencyCode)
        if (idx !== -1) lastVisited.splice(idx, 1)
        lastVisited.unshift(currencyCode)
    }

    localStorage.setItem("lastVisited", JSON.stringify(lastVisited.splice(0, 5)))
}

onMounted(async () => {
    updateCurrency()
    storeLastVisitedCurrency()
    await updateRates()
})

watch(() => route.params.code, async () => {
    updateCurrency()
    storeLastVisitedCurrency()
    await updateRates()
})
</script>

<template>
    <h1>{{ currency.name }} ({{ currency.code }})</h1>
    <form onsubmit="return false" @submit="updateRates" class="d-flex lastCountContainer">
        <label for="lastCount" class="form-label">Pokaż ostatnie</label>
        <input type="number" class="form-control" id="lastCount" min="1" max="255" step="1" v-model="lastCount" required>
        <label for="lastCount" class="form-label">dni</label>
        <button class="btn btn-outline-info btn-sm" type="submit">Zapisz</button>
    </form>
    <Loader v-if="isLoading" />
    <div v-else class="container">
        <div class="row mb-3">
            <div class="col">
                <RatesChart v-if="ratesA.length > 0" :rates="ratesA" rate-table="A" />
                <p v-else>Brak notowań dla kursów średnich</p>
            </div>
            <div class="col">
                <RatesChart v-if="ratesC.length > 0" :rates="ratesC" rate-table="C" />
                <p v-else>Brak notowań dla cen kupna i sprzedaży</p>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <LastRates v-if="ratesA.length > 0" :rates="ratesA" />
            </div>
            <div class="col">
                <LastRates v-if="ratesC.length > 0" :rates="ratesC" />
            </div>
        </div>
    </div>
</template>

<style scoped>
h1 {
    text-align: center;
    margin: 30px 0 10px 0;
}
.lastCountContainer {
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
}
.lastCountContainer > label {
    margin: 0;
}
.lastCountContainer > button {
    margin-left: 10px;
}
#lastCount {
    width: 70px;
    margin: 0 10px;
}
p {
    text-align: center;
}
.row {
    gap: 10px;
}
</style>
