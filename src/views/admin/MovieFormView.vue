<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Dropdown from 'primevue/dropdown';
import FileUpload from 'primevue/fileupload';
import FloatLabel from 'primevue/floatlabel';
import Image from 'primevue/image';
import InlineMessage from 'primevue/inlinemessage';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import Skeleton from 'primevue/skeleton';
import Textarea from 'primevue/textarea';
import { inject, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getMovie, storeMovie, updateMovie } from '../../services/moviesService';

const route = useRoute()
const router = useRouter()
const showToast = inject('showToast')

const error = ref('')
const errors = ref([])
const loading = ref(false)
const loadingData = ref(false)
const editMode = ref(false)
const notFound = ref(false)
const title = ref('')
const description = ref('')
const director = ref('')
const release_year = ref('')
const genre = ref('')
const poster = ref<File | null>(null)
const imageSrc = ref<string | null>('/image-dummy.jpg')

const years = []
for (let year = 2025; year >= 1800; year--) {
  years.push({ value: year.toString() });
}

const updatePoster = (event) => {
  poster.value = event.files[0]
  const reader = new FileReader();

  reader.onload = () => {
    imageSrc.value = reader.result as string;
  };

  reader.readAsDataURL(event.files[0])
}

const createMovie = async () => {
  const formData = parseFormData()

  loading.value = true
  storeMovie(formData)
  .then((response) => {
    loading.value = false
    showToast('success', 'Movie added', response.data.message, 3000)
    router.push('/admin/movies/' + response.data.data.id)
  })
  .catch((e) => {
    loading.value = false
    errors.value = e.response.data.errors
    error.value = e.response.data.message
  })
}

const saveMovie = async () => {
  const formData = parseFormData()
  formData.append('_method', 'PATCH')

  loading.value = true
  updateMovie(formData, route.params.id)
  .then((response) => {
    loading.value = false
    showToast('success', 'Movie updated', response.data.message, 3000)
    router.push('/admin/movies/' + response.data.data.id)
  })
  .catch((e) => {
    loading.value = false
    errors.value = e.response.data.errors
    error.value = e.response.data.message
  })
}

const parseFormData = () => {
  const formData = new FormData();
  if (poster.value) {
    formData.append('poster', poster.value)
  }
  formData.append('title', title.value ?? '')
  formData.append('description', description.value ?? '')
  formData.append('director', director.value ?? '')
  formData.append('release_year', release_year.value.value ?? '')
  formData.append('genre', genre.value.value ?? '')
  return formData
}

onMounted(() => {
  if (route.params.id) {
    loadingData.value = true
    getMovie(route.params.id).then(res => {
      title.value = res.data.title
      description.value = res.data.description
      director.value = res.data.director
      release_year.value = new Proxy({ value: res.data.release_year.toString() }, {})
      genre.value = new Proxy({ value: res.data.genre }, {})
      editMode.value = true
    }).catch(err => {
      notFound.value = true
      console.log(err)
    }).finally(() => {
      loadingData.value = false
    })
  }
})

const genres = [
  { value: 'Action' },
  { value: 'Adventure' },
  { value: 'Animation' },
  { value: 'Biography' },
  { value: 'Comedy' },
  { value: 'Crime' },
  { value: 'Documentary' },
  { value: 'Drama' },
  { value: 'Family' },
  { value: 'Fantasy' },
  { value: 'History' },
  { value: 'Horror' },
  { value: 'Music' },
  { value: 'Musical' },
  { value: 'Mystery' },
  { value: 'Romance' },
  { value: 'Sci-Fi' },
  { value: 'Sport' },
  { value: 'Thriller' },
  { value: 'War' },
  { value: 'Western' }
]

</script>
<template>
  <Card class="shadow-none" v-if="!loadingData">
    <template #title>{{ editMode ? 'Edit movie' : 'Add movie' }}</template>
    <template #content>
      <div>
        <transition-group name="p-message" tag="div">
          <Message v-if="error" severity="error">{{ error }}</Message>
        </transition-group>
        <div class="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-8">
          <div class="flex flex-col gap-3">
            <FloatLabel class="flex flex-col">
              <InputText v-model="title" inputId="title" :invalid="!! errors?.title" />
              <label for="title">Title</label>
            </FloatLabel>
            <InlineMessage v-if="errors?.title">{{ errors.title[0] }}</InlineMessage>
          </div>
          <div class="flex flex-col gap-3">
            <FloatLabel class="flex flex-col">
              <InputText v-model="director" inputId="director" :invalid="!! errors?.director" />
              <label for="director">Director</label>
            </FloatLabel>
            <InlineMessage v-if="errors?.director">{{ errors.director[0] }}</InlineMessage>
          </div>
          <div class="row-span-2 flex flex-col gap-3">
            <FloatLabel class="flex flex-col">
              <Textarea v-model="description" inputId="description" :invalid="!! errors?.description" rows="5" cols="30" />
              <label for="description">Description</label>
            </FloatLabel>
            <InlineMessage v-if="errors?.description">{{ errors.description[0] }}</InlineMessage>
          </div>
          <div class="flex flex-col gap-3">
            <FloatLabel class="flex flex-col">
              <Dropdown v-model="release_year" :options="years" inputId="release_year" :invalid="!! errors?.release_year" optionLabel="value" placeholder="Select a release year" class="w-full md:w-14rem" />
              <label for="release_year">Release year</label>
            </FloatLabel>
            <InlineMessage v-if="errors?.release_year">{{ errors.release_year[0] }}</InlineMessage>
          </div>
          <div class="flex flex-col gap-3">
            <FloatLabel class="flex flex-col">
              <Dropdown v-model="genre" :options="genres" inputId="genre" :invalid="!! errors?.genre" optionLabel="value" placeholder="Select a genre" class="w-full md:w-14rem" />
              <label for="genre">Genre</label>
            </FloatLabel>
            <InlineMessage v-if="errors?.genre">{{ errors.genre[0] }}</InlineMessage>
          </div>
          <div class="flex flex-col gap-3">
            <Image :src="imageSrc" alt="Image" width="250" />
            <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" :auto="true" customUpload @uploader="updatePoster" />
            <InlineMessage v-if="errors?.poster">{{ errors.poster[0] }}</InlineMessage>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end w-full">
        <Button @click="createMovie" :loading="loading" label="Create movie" v-if="!editMode" />
        <Button @click="saveMovie" :loading="loading" label="Update movie" v-if="editMode" />
      </div>
    </template>
  </Card>
  <Card v-if="loadingData">
    <template #content>
      <div class="border-round border-1 surface-border p-4 surface-card">
        <ul class="m-0 p-0 list-none">
            <li class="mb-3">
                <div class="flex">
                    <div class="align-self-center" style="flex: 1">
                        <Skeleton width="10%" height="3rem" class="mb-2"></Skeleton>
                        <Skeleton width="100%" height="3rem" class="mb-2"></Skeleton>
                        <Skeleton width="75%"></Skeleton>
                    </div>
                </div>
            </li>
            <li class="mb-3">
                <div class="flex">
                    <div class="align-self-center" style="flex: 1">
                        <Skeleton width="100%" height="3rem" class="mb-2"></Skeleton>
                        <Skeleton width="75%"></Skeleton>
                    </div>
                </div>
            </li>
            <li class="mb-3">
                <div class="flex">
                    <div class="align-self-center" style="flex: 1">
                        <Skeleton width="10%" height="3rem" class="mb-2"></Skeleton>
                        <Skeleton width="5%"></Skeleton>
                    </div>
                </div>
            </li>
            <li>
              <div class="flex justify-end">
                  <Skeleton width="10%" height="3rem"></Skeleton>
              </div>
            </li>
        </ul>
      </div>
    </template>
  </Card>
</template>
