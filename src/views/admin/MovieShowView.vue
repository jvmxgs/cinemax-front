<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import ConfirmPopup from 'primevue/confirmpopup';
import Toast from 'primevue/toast';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { deleteMovie, getMovie } from '../../services/moviesService';

const route = useRoute()
const router = useRouter()
const notFound = ref(false)
const movie = ref(null)
const confirm = useConfirm()
const toast = useToast()

const deleteItem = (event, movieId) => {
  confirm.require({
    target: event.currentTarget,
    group: 'headless',
    message: 'Delete this item?',
    accept: () => {
      deleteMovie(movieId).then((response) => {
        toast.add({severity:'success', summary:'Deleted', detail:response.message, life: 3000})
      }).catch((error) => {
        toast.add({severity:'error', summary:'Error', detail:error.response.data.message, life: 3000})
      }).finally(() => {
        router.push('/admin/movies')
      })
    }
  })
}

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
    <template #title>
      <div class="flex justify-between">
        Simple Card
        <div class="flex items-center justify-center gap-4">
          <router-link :to="{ name: 'MoviesEdit', params: { id: movie.id } }">
            <Button icon="pi pi-pencil" aria-label="Submit" />
          </router-link>
          <Button @click="deleteItem($event, movie.id)" icon="pi pi-trash" outlined severity="danger"></Button>
        </div>
      </div>
    </template>
    <template #content>
      <div>
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
            <div v-if="movie.time_slots.length" class="flex gap-2 mt-4">
              <span class="pi pi-clock"></span>
              <span class="text-sm font-semibold text-900" v-for="time_slot of movie.time_slots">{{ time_slot.start_time }}</span>
            </div>
          </div>
        </div>
        <Toast />
        <ConfirmPopup group="headless">
          <template #container="{ message, acceptCallback, rejectCallback }">
              <div class="border-round p-3">
                  <span>{{ message.message }}</span>
                  <div class="flex align-items-center gap-2 mt-3">
                      <Button label="Delete" @click="acceptCallback" severity="danger" size="small"></Button>
                      <Button label="Cancel" outlined @click="rejectCallback" severity="secondary" size="small" text></Button>
                  </div>
              </div>
          </template>
        </ConfirmPopup>
      </div>
    </template>
  </Card>
  <Card class="shadow-none" v-if="!movie && notFound">
    <template #title>Resource not found</template>
  </Card>
</template>
