<script setup lang="ts">
import { useRouter } from "vue-router"
import TheWelcome from "../components/TheWelcome.vue"
import currencies from "@/assets/currencies.json"

document.title = "Kursy walut"

const router = useRouter()

const rowClicked = (code: string) => {
    router.push({ name: "currency", params: { code } })
}

const lastVisited = JSON.parse(localStorage.getItem("lastVisited") ?? "[]") as Array<string>
const lastVisitedCurrencies = lastVisited.map((code) => currencies.find((currency) => currency.code === code) ?? { code: "XXX", name: "Nieznana waluta" }).slice(0, 5)
</script>

<template>
    <main>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Lp.</th>
                    <th scope="col">Waluta</th>
                    <th scope="col">Kod</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="({ code, name }, index) in lastVisitedCurrencies" :key="code" @click="$event => rowClicked(code)">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ name }}</td>
                    <td>{{ code }}</td>
                </tr>
            </tbody>
        </table>
        <TheWelcome />
    </main>
</template>

<style scoped>
tbody > tr {
    cursor: pointer;
}
</style>
