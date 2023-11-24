<script setup lang="ts">
import LastVisitedCurrencies from "@/components/LastVisitedCurrencies.vue"
import TheWelcome from "@/components/TheWelcome.vue"

document.title = "Kursy walut"
</script>

<template>
    <main>
        <h1 class="title">Kursy walut</h1>
        <div class="container g-1">
            <div class="row">
                <div class="col"><TheWelcome /></div>
                <div class="col"><LastVisitedCurrencies /></div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.title {
    text-align: center;
    margin: 30px 0;
}
</style>
