<script setup lang="ts">
import type ChartData from '@/types/ChartData';
import type Rate from '@/types/Rate';
import { ref } from 'vue';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Line } from 'vue-chartjs';

const props = defineProps<{
    rates: Rate[],
    rateTable: string
}>()

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false    
}

const chartData = ref({
    labels: [],
    datasets: []
} as ChartData)

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

chartData.value.labels = props.rates.map((rate) => new Date(rate.effectiveDate).toLocaleDateString("pl-pl")) as string[]

if (props.rateTable === "A") {
    chartData.value.datasets.push({
        label: "Kurs średni",
        backgroundColor: "#3e95cd",
        data: props.rates.map((rate) => rate.mid) as number[]
    })
} else if (props.rateTable === "C") {
    chartData.value.datasets.push({
        label: "Kurs kupna",
        backgroundColor: "#3e95cd",
        data: props.rates.map((rate) => rate.bid) as number[]
    })
    chartData.value.datasets.push({
        label: "Kurs sprzedaży",
        backgroundColor: "#8e5ea2",
        data: props.rates.map((rate) => rate.ask) as number[]
    })
}
</script>

<template>
    <Line class="chart" :data="chartData" :options="chartOptions" />
</template>

<style scoped>
.chart {
    height: 250px;
    background-color: white;
}
</style>