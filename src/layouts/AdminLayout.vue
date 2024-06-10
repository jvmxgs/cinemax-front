<script setup lang="ts">
import NavBar from '@/components/admin/NavBar.vue';
import SideBar from '@/components/admin/SideBar.vue';
import Breadcrumb from 'primevue/breadcrumb';
import Toast from 'primevue/toast';
import { computed, provide, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const globalToast = ref(null)

const home = ref({
    icon: 'pi pi-home',
    url: '/admin',
})

const breadcrumbItems = computed(() => {
  const matchedRoutes = route.matched
  return matchedRoutes
    .filter(route => {
      if (route.path !== '/admin') {
        return route
      }
    })
    .map(route => ({
      label: route.meta.breadcrumb as string,
      url: route.path
    }))
})

const showToast = (severity, summary, detail, life) => {
  globalToast.value.add({ severity, summary, detail, life })
};

provide('showToast', showToast);
</script>

<template>
  <main class="flex h-screen">
    <SideBar />
    <div class="flex flex-col flex-grow h-full">
      <NavBar />
      <div class="flex-grow p-6">
        <Breadcrumb :home="home" :model="breadcrumbItems" />
        <router-view />
      </div>
    </div>
    <Toast ref="globalToast" />
  </main>
</template>
