<script setup lang="ts">
import Button from 'primevue/button'
import Card from 'primevue/card'
import Column from 'primevue/column'
import ConfirmPopup from 'primevue/confirmpopup'
import DataTable from 'primevue/datatable'
import Paginator from 'primevue/paginator'
import Toast from 'primevue/toast'
import { useConfirm } from "primevue/useconfirm"
import { useToast } from "primevue/usetoast"
import { onMounted, ref } from 'vue'
import { deleteTimeslot, getTimeslots } from '../../services/timeslotsService'

const confirm = useConfirm()
const toast = useToast()
const timeslots = ref()
const pagination = ref()

const pageEvent = async (value) => {
  await getPaginatedTimeslots(value.page + 1)
}

const getPaginatedTimeslots = async (page) => {
  const response = await getTimeslots(page)
  timeslots.value = response.data
  pagination.value = response.meta
}

const deleteItem = (event, timeslotId) => {
  confirm.require({
    target: event.currentTarget,
    group: 'headless',
    message: 'Delete this item?',
    accept: () => {
      deleteTimeslot(timeslotId).then((response) => {
        toast.add({severity:'success', summary:'Deleted', detail:response.message, life: 3000})
      }).catch((error) => {
        toast.add({severity:'error', summary:'Error', detail:error.response.data.message, life: 3000})
      }).finally(() => {
        getPaginatedTimeslots(pagination.value.current_page)
      })
    }
  })
}

onMounted(async () => {
  await getPaginatedTimeslots(1)
})
</script>

<template>
  <Card class="shadow-none">
    <template #title>Timeslots</template>
    <template #content>
      <div class="card">
        <DataTable :value="timeslots" tableStyle="min-width: 50rem">
          <Column field="start_time" header="Start time"></Column>
          <Column header="Active">
            <template #body="slotProps">
              <span class="pi pi-check-circle text-green-500" v-if="slotProps.data.is_active"></span>
              <span class="pi pi-times-circle text-red-500" v-if="!slotProps.data.is_active"></span>
            </template>
          </Column>
          <Column header="Movie">
            <template #body="slotProps">
              <router-link v-if="slotProps.data.movie" :to="{ name: 'MoviesShow', params: { id: slotProps.data.movie.id } }">
                {{ slotProps.data.movie.title }}
              </router-link>
            </template>
          </Column>
          <Column header="Actions" style="width: 25%">
            <template #body="slotProps">
              <div class="flex flex-row-reverse md:flex-row gap-2">
                <router-link :to="{ name: 'TimeslotsEdit', params: { id: slotProps.data.id } }">
                  <Button icon="pi pi-pencil" label="Edit" class="flex-auto md:flex-initial text-nowrap"></Button>
                </router-link>
                <Button @click="deleteItem($event, slotProps.data.id)" icon="pi pi-trash" outlined severity="danger"></Button>
              </div>
            </template>
          </Column>
        </DataTable>
        <Paginator v-if="pagination" @page="pageEvent" :rows="pagination.per_page" :totalRecords="pagination.total"></Paginator>
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
