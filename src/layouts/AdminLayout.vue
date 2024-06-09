<script setup lang="ts">
import NavBar from '@/components/admin/NavBar.vue';
import SideBar from '@/components/admin/SideBar.vue';
import Breadcrumb from 'primevue/breadcrumb';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

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
  </main>
</template>
