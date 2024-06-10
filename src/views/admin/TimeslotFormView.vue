<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Checkbox from 'primevue/checkbox';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import { inject, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getTimeslot, storeTimeslot, updateTimeslot } from '../../services/timeslotsService';

const route = useRoute();
const router = useRouter();
const showToast = inject('showToast');

const error = ref('');
const errors = ref<Record<string, string[]>>({});
const loading = ref(false);
const editMode = ref(false);
const notFound = ref(false);
const start_time = ref();
const is_active = ref(false);

const createTimeslot = async () => {
  const formData = parseFormData();

  storeTimeslot(formData)
    .then((response) => {
      loading.value = true;
      showToast('success', 'Timeslot added', response.data.message, 3000);
      router.push('/admin/timeslots/' + response.data.data.id);
    })
    .catch((e) => {
      loading.value = false;
      errors.value = e.response.data.errors;
      error.value = e.response.data.message;
    });
};

const saveTimeslot = async () => {
  const formData = parseFormData();
  formData.append('_method', 'PATCH');

  updateTimeslot(formData, route.params.id)
    .then((response) => {
      loading.value = true;
      showToast('success', 'Timeslot updated', response.data.message, 3000);
      router.push('/admin/timeslots/' + response.data.data.id);
    })
    .catch((e) => {
      loading.value = false;
      errors.value = e.response.data.errors;
      error.value = e.response.data.message;
    });
};

const parseFormData = () => {
  const formData = new FormData();
  formData.append('start_time', start_time.value ?? '');
  formData.append('is_active', is_active.value ? '1' : '0');
  return formData;
};

onMounted(() => {
  if (route.params.id) {
    getTimeslot(route.params.id)
      .then((res) => {
        start_time.value = res.data.start_time
        editMode.value = true;
      })
      .catch((err) => {
        notFound.value = true;
        console.log(err);
      });
  }
});
</script>

<template>
  <Card class="shadow-none">
    <template #title>{{ editMode ? 'Edit Timeslot' : 'Add Timeslot' }}</template>
    <template #content>
      <div>
        <transition-group name="p-message" tag="div">
          <Message v-if="error" severity="error">{{ error }}</Message>
        </transition-group>
        <div class="grid grid-cols-1 gap-8">
          <div class="flex flex-col gap-3">
            <FloatLabel class="flex flex-col">
              <InputText v-model="start_time" inputId="start_time" :invalid="!!errors?.start_time" />
              <label for="start_time">Start Time</label>
            </FloatLabel>
            <InlineMessage v-if="errors?.start_time">{{ errors.start_time[0] }}</InlineMessage>
          </div>
          <div class="flex flex-col gap-3">
            <Checkbox v-model="is_active" :binary="true" inputId="is_active" :invalid="!!errors?.is_active" />
            <label for="is_active">Is Active</label>
            <InlineMessage v-if="errors?.is_active">{{ errors.is_active[0] }}</InlineMessage>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end w-full">
        <Button @click="createTimeslot" v-if="!editMode">Create Timeslot</Button>
        <Button @click="saveTimeslot" v-if="editMode">Update Timeslot</Button>
      </div>
    </template>
  </Card>
</template>
