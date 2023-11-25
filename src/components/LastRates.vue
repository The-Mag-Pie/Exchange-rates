<script setup lang="ts">
import type Rate from "@/types/Rate"

defineProps<{
    rates: Rate[]
}>()
</script>

<template>
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">Numer</th>
                <th scope="col">Data</th>
                <th v-if="rates[0].mid" scope="col">Kurs średni</th>
                <th v-if="rates[0].bid" scope="col">Kurs kupna</th>
                <th v-if="rates[0].ask" scope="col">Kurs sprzedaży</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="{ no, effectiveDate, mid, bid, ask } in [...rates].reverse()" :key="no">
                <td>{{ no }}</td>
                <td>{{ new Date(effectiveDate).toLocaleDateString("pl-pl") }}</td>
                <td v-if="mid">{{ mid }}</td>
                <td v-if="bid">{{ bid }}</td>
                <td v-if="ask">{{ ask }}</td>
            </tr>
        </tbody>
    </table>
</template>