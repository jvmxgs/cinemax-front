<script setup lang="ts">
import Button from 'primevue/button'
import Card from 'primevue/card'
import ConfirmPopup from 'primevue/confirmpopup'
import DataView from 'primevue/dataview'
import Paginator from 'primevue/paginator'
import Skeleton from 'primevue/skeleton'
import Tag from 'primevue/tag'
import Toast from 'primevue/toast'
import { useConfirm } from "primevue/useconfirm"
import { useToast } from "primevue/usetoast"
import { onMounted, ref } from 'vue'
import { deleteMovie, getMovies } from '../../services/moviesService'

const confirm = useConfirm()
const toast = useToast()
const movies = ref()
const pagination = ref()
const loading = ref(false)

const pageEvent = async (value) => {
  await getPaginatedMovies(value.page + 1)
}

const getPaginatedMovies = async (page) => {
  loading.value = true
  const response = await getMovies(page)
  movies.value = response.data
  pagination.value = response.meta
  loading.value = false
}

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
        getPaginatedMovies(pagination.value.current_page)
      })
    }
  })
}

onMounted(async () => {
  await getPaginatedMovies(1)
})
</script>
<template>
  <Card class="shadow-none">
    <template #title>Movies</template>
    <template #content>
      <div class="card">
        <DataView :value="movies" v-if="!loading">
          <template #list="slotProps">
            <div class="grid grid-nogutter">
              <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
                <div class="flex flex-col sm:flex-row sm:items-center p-4 gap-3" :class="{ 'border-top-1 surface-border': index !== 0 }">
                  <div class="md:w-10rem relative">
                    <img class="block xl:block mx-auto border-round rounded-md w-32" :src="`${item.poster}`" :alt="item.title" />
                    <Tag :value="item.genre" severity="success" class="absolute" style="left: 4px; top: 4px"></Tag>
                  </div>
                  <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-4">
                    <div class="flex flex-col justify-between items-start gap-2">
                      <div>
                        <div class="text-lg font-medium text-900 mt-2">{{ item.title }} (<span class="text-sm font-semibold text-900">{{ item.release_year }}</span>)</div>
                        <span class="font-medium text-gray-500 text-sm">{{ item.description }}</span>
                      </div>
                      <div class="flex flex-col">
                        <span class="text-900 font-normal text-sm">{{ item.director }}</span>
                        <div v-if="item.time_slots.length" class="flex gap-2 mt-4">
                          <span class="pi pi-clock"></span>
                          <span class="text-sm font-semibold text-900" v-for="time_slot of item.time_slots">{{ time_slot.start_time }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col md:items-end gap-5">
                      <div class="flex flex-row-reverse md:flex-row gap-2">
                        <router-link :to="{ name: 'MoviesEdit', params: { id: item.id } }">
                          <Button icon="pi pi-pencil" label="Edit" class="flex-auto md:flex-initial text-nowrap"></Button>
                        </router-link>
                        <router-link :to="{ name: 'MoviesShow', params: { id: item.id } }">
                          <Button title="Show movie" icon="pi pi-eye" severity="info"></Button>
                        </router-link>
                        <Button @click="deleteItem($event, item.id)" icon="pi pi-trash" outlined severity="danger"></Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
        <div v-if="loading" class="border-round border-1 surface-border p-4 surface-card">
            <ul class="m-0 p-0 list-none">
                <li class="mb-3">
                    <div class="flex">
                        <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                        <div class="align-self-center" style="flex: 1">
                            <Skeleton width="100%" class="mb-2"></Skeleton>
                            <Skeleton width="75%"></Skeleton>
                        </div>
                    </div>
                </li>
                <li class="mb-3">
                    <div class="flex">
                        <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                        <div class="align-self-center" style="flex: 1">
                            <Skeleton width="100%" class="mb-2"></Skeleton>
                            <Skeleton width="75%"></Skeleton>
                        </div>
                    </div>
                </li>
                <li class="mb-3">
                    <div class="flex">
                        <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                        <div class="align-self-center" style="flex: 1">
                            <Skeleton width="100%" class="mb-2"></Skeleton>
                            <Skeleton width="75%"></Skeleton>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="flex">
                        <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                        <div class="align-self-center" style="flex: 1">
                            <Skeleton width="100%" class="mb-2"></Skeleton>
                            <Skeleton width="75%"></Skeleton>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <Paginator v-if="pagination && !loading" @page="pageEvent" :rows="pagination.per_page" :totalRecords="pagination.total"></Paginator>
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
    </template>
  </Card>
</template>
