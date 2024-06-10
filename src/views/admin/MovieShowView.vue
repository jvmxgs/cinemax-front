<script setup lang="ts">
import Card from 'primevue/card';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getMovie } from '../../services/moviesService';

const route = useRoute()
const notFound = ref(false)
const movie = ref(null)

onMounted(() => {
  getMovie(route.params.id).then(res => {
    movie.value = res.data
  }).catch(err => {
    notFound.value = true
    console.log(err)
  })
})
</script>
<template>
  <Card class="shadow-none" v-if="movie">
    <template #title>Simple Card</template>
    <template #content>
      <div class="max-w-4xl mx-auto p-6">
        <div class="flex flex-col md:flex-row">
          <div class="md:w-1/3 mb-4 md:mb-0">
            <img :src="movie.poster" alt="Movie Poster" class="w-full rounded-lg">
          </div>
          <div class="md:w-2/3 md:pl-6">
            <h1 class="text-3xl font-bold mb-2">{{ movie.title }}</h1>
            <p class="text-gray-600 mb-4">{{ movie.description }}</p>
            <p><strong>Director:</strong> {{ movie.director }}</p>
            <p><strong>Release Year:</strong> {{ movie.release_year }}</p>
            <p><strong>Genre:</strong> {{ movie.genre }}</p>
            <p class="text-gray-500 text-sm mt-4">Created at: {{ movie.created_at }}</p>
            <p class="text-gray-500 text-sm">Updated at: {{ movie.updated_at }}</p>
          </div>
        </div>
      </div>
    </template>
  </Card>
  <Card class="shadow-none" v-if="!movie && notFound">
    <template #title>Resource not found</template>
  </Card>
</template>
