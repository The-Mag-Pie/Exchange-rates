<script setup lang="ts">
import { useRouter } from "vue-router"
import axios from "axios"
import currenciesJson from "@/assets/currencies.json"
import apiUrls from "@/assets/apiUrls.json"
import { onMounted, ref } from "vue"
import Loader from "@/components/SpinnerLoader.vue"
import type Currency from "@/types/Currency"

const currencies = currenciesJson as Currency[]

interface CurrencyRow extends Currency {
    mid?: number
    bid?: number
    ask?: number
}

const router = useRouter()

const rowClicked = (code: string) => {
    router.push({ name: "currency", params: { code } })
}

const isLoading = ref(true)

const lastVisited = JSON.parse(localStorage.getItem("lastVisited") ?? "[]") as Array<string>
const lastVisitedCurrencies = lastVisited.map((code) => currencies.find((currency) => currency.code === code) ?? { code: "XXX", name: "Nieznana waluta" }).slice(0, 5) as CurrencyRow[]

onMounted(async () => {
    isLoading.value = true
    for (const currency of lastVisitedCurrencies) {
        try {
            let response = await axios.get(apiUrls.latestRateA.replace("{code}", currency.code))
            currency.mid = response.data.rates[0].mid
        } catch (err) {
            console.log(err)
        }

        try {
            let response = await axios.get(apiUrls.latestRateC.replace("{code}", currency.code))
            currency.bid = response.data.rates[0].bid
            currency.ask = response.data.rates[0].ask
        } catch (err) {
            console.log(err)
        }
    }
    isLoading.value = false
})
</script>

<template>
    <main>
        <h3 class="text-center">Ostatnio oglądane waluty</h3>
        <Loader v-if="isLoading" />
        <p v-else-if="lastVisitedCurrencies.length === 0">Nie oglądałeś jeszcze żadnej waluty.</p>
        <table v-else class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Lp.</th>
                    <th scope="col">Waluta</th>
                    <th scope="col">Kod</th>
                    <th scope="col">Średni kurs</th>
                    <th scope="col">Kupno</th>
                    <th scope="col">Sprzedaż</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="({ code, name, mid, bid, ask }, index) in lastVisitedCurrencies" :key="code" @click="($event) => rowClicked(code)">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ name }}</td>
                    <td>{{ code }}</td>
                    <td>{{ mid }}</td>
                    <td>{{ bid }}</td>
                    <td>{{ ask }}</td>
                </tr>
            </tbody>
        </table>
    </main>
</template>

<style scoped>
tbody > tr {
    cursor: pointer;
}
p {
    text-align: center;
}
</style>
