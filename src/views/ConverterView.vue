<script setup lang="ts">
import { reactive, ref, watch, computed } from "vue";
import currenciesJson from "@/assets/currencies.json";
import type Currency from "@/types/Currency";
import axios from "axios";
import apiUrls from "@/assets/apiUrls.json";

document.title = "Przelicznik walut - Kursy walut"

const currencies = currenciesJson as Currency[];

const currency1 = reactive({
    code: "none",
    rate: 0,
    date: null as Date | null,
    ready: false
})
const currency2 = reactive({
    code: "none",
    rate: 0,
    date: null as Date | null,
    ready: false
})
const amount = ref("");
const result = ref("");

const areCurrenciesReady = computed(() => currency1.ready && currency2.ready);  

const calculate = () => {
    if (areCurrenciesReady.value && amount.value !== "") {
        result.value = (Number(amount.value) * currency1.rate / currency2.rate).toFixed(2);
    }
    else {
        result.value = "";
    }
}

watch(amount, calculate)

watch(() => currency1.code, async () => {
    if (currency1.code === "PLN") {
        currency1.rate = 1;
        currency1.date = null;
        currency1.ready = true;
    }
    else if (currency1.code !== "none") {
        const response = await axios.get(apiUrls.latestRateA.replace("{code}", currency1.code));
        currency1.rate = response.data.rates[0].mid;
        currency1.date = new Date(response.data.rates[0].effectiveDate);
        currency1.ready = true;
    }
    else {
        amount.value = "";
        currency1.ready = false;
    }
    calculate();
})

watch(() => currency2.code, async () => {
    if (currency2.code === "PLN") {
        currency2.rate = 1;
        currency2.date = null;
        currency2.ready = true;
    }
    else if (currency2.code !== "none") {
        const response = await axios.get(apiUrls.latestRateA.replace("{code}", currency2.code));
        currency2.rate = response.data.rates[0].mid;
        currency2.date = new Date(response.data.rates[0].effectiveDate);
        currency2.ready = true;
    }
    else {
        amount.value = "";
        currency2.ready = false;
    }
    calculate();
})
</script>

<template>
    <h1>Przelicznik walut</h1>
    <div class="container text-center">
        <div class="row justify-content-md-center">
            <div class="col col-md-auto">
                <label for="currencySelect1" class="form-label">Przelicz z:</label>
                <select id="currencySelect1" class="form-select mb-3" v-model="currency1.code">
                    <option value="none">Wybierz walutę</option>
                    <option value="PLN">(PLN) Polski złoty</option>
                    <option v-for="{ code, name } in currencies" :key="code" :value="code">({{ code }}) {{ name }}</option>
                </select>
                <div v-if="areCurrenciesReady" class="mb-3">
                    <label for="amount" class="form-label">Ilość:</label>
                    <input type="number" min="0.01" step="0.01" class="form-control" id="amount" placeholder="Podaj ilość" v-model="amount">
                </div>
                <div v-if="areCurrenciesReady && currency1.date != null">
                    <i>Kurs z dnia {{ currency1.date.toLocaleDateString("pl-pl") }}</i>
                </div>
            </div>
            <div class="col col-md-auto mb-3">
                <label for="currencySelect1" class="form-label">Przelicz na:</label>
                <select id="currencySelect2" class="form-select mb-3" v-model="currency2.code">
                    <option value="none">Wybierz walutę</option>
                    <option value="PLN">(PLN) Polski złoty</option>
                    <option v-for="{ code, name } in currencies" :key="code" :value="code">({{ code }}) {{ name }}</option>
                </select>
                <div v-if="areCurrenciesReady" class="mb-3">
                    <label for="result" class="form-label">Wynik:</label>
                    <input type="number" class="form-control" id="result" placeholder="Wynik" readonly v-model="result">
                </div>
                <div v-if="areCurrenciesReady && currency2.date != null">
                    <i>Kurs z dnia {{ currency2.date.toLocaleDateString("pl-pl") }}</i>
                </div>
            </div>
            <div v-if="areCurrenciesReady" class="row text-center"><p>Wyniki są przybliżone!</p></div>
        </div>
    </div>
</template>

<style scoped>
h1 {
    text-align: center;
}
</style>
