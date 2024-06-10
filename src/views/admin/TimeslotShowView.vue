<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import ConfirmPopup from 'primevue/confirmpopup';
import Toast from 'primevue/toast';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { deleteTimeslot, getTimeslot } from '../../services/timeslotsService';

const route = useRoute();
const router = useRouter();
const notFound = ref(false);
const timeslot = ref(null);
const confirm = useConfirm();
const toast = useToast();

const deleteItem = (event, timeslotId) => {
  confirm.require({
    target: event.currentTarget,
    group: 'headless',
    message: 'Delete this item?',
    accept: () => {
      deleteTimeslot(timeslotId).then((response) => {
        toast.add({severity:'success', summary:'Deleted', detail:response.message, life: 3000});
      }).catch((error) => {
        toast.add({severity:'error', summary:'Error', detail:error.response.data.message, life: 3000});
      }).finally(() => {
        router.push('/admin/timeslots');
      });
    }
  });
};

onMounted(() => {
  getTimeslot(route.params.id).then(res => {
    timeslot.value = res.data;
  }).catch(err => {
    notFound.value = true;
    console.log(err);
  });
});
</script>

<template>
  <Card class="shadow-none" v-if="timeslot">
    <template #title>
      <div class="flex justify-between">
        Timeslot Details
        <div class="flex items-center justify-center gap-4">
          <router-link :to="{ name: 'TimeslotsEdit', params: { id: timeslot.id } }">
            <Button icon="pi pi-pencil" aria-label="Edit" />
          </router-link>
          <Button @click="deleteItem($event, timeslot.id)" icon="pi pi-trash" outlined severity="danger"></Button>
        </div>
      </div>
    </template>
    <template #content>
      <div>
        <div class="flex flex-col md:flex-row">
          <div class="md:w-2/3 md:pl-6">
            <h1 class="text-3xl font-bold mb-2">Start Time: {{ timeslot.start_time }}</h1>
            <p><strong>Is Active:</strong> {{ timeslot.is_active ? 'Yes' : 'No' }}</p>
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
  <Card class="shadow-none" v-if="!timeslot && notFound">
    <template #title>Resource not found</template>
  </Card>
</template>
