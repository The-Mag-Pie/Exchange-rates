<script setup lang="ts">
import image from "@/assets/images/currency-image.jpg"
</script>

<template>
    <div class="content">
        <div class="img">
            <img :src="image" height="250" />
        </div>
        <h3 class="text-center">Witaj na stronie z kursami walut!</h3>
        <p>Znajdziesz tutaj aktualne oraz historyczne kursy wielu walut, w tym ceny średnie oraz ceny kupna i sprzedaży. Dane pobierane są na bieżąco z zasobów Narodowego Banku Polskiego.</p>
    </div>
</template>

<style scoped>
.img {
    display: flex;
    justify-content: center;
}
.content > h3 {
    margin: 10px 0;
}
</style>
