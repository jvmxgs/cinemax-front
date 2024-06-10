<script setup lang="ts">
import Carousel from 'primevue/carousel';
import Tag from 'primevue/tag';
import { onMounted, ref } from 'vue';
import { getBillboard } from '../services/billboardService';

const timeSlots = ref([])

onMounted(() => {
  getBillboard().then((response) => {
    timeSlots.value = response.data
    console.log(response.data)
  })
})
</script>

<template>
  <main>
    <!-- <Card v-for="(timeSlot, key) of timeSlots" v-bind:key="key">
      <template #content>
        {{ timeSlot.start_time }}
      </template>
    </Card> -->
    <Carousel :value="timeSlots" :numVisible="3" :numScroll="1" circular :autoplayInterval="3000">
      <template #item="slotProps">
        <div class="border-1 surface-border border-round m-2  p-3">
          <div class="mb-3">
              <div class="relative mx-auto">
                  <img :src="slotProps.data.movie.poster" :alt="slotProps.data.movie.description" class="w-full border-round" />
                  <Tag :value="slotProps.data.movie.genre" class="absolute" style="left:5px; top: 5px"/>
              </div>
          </div>
          <div class="mb-3 font-medium">{{ slotProps.data.movie.title }}</div>
          <div class="flex justify-content-between align-items-center">
              <div class="mt-0 font-semibold text-xl">{{ slotProps.data.start_time }}</div>
              <span>
                  <Button icon="pi pi-heart" severity="secondary" outlined />
                  <Button icon="pi pi-shopping-cart" class="ml-2"/>
              </span>
          </div>
        </div>
      </template>
    </Carousel>
  </main>
</template>
