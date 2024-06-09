<script setup lang="ts">
import { useOpenSidebarStore } from "@/stores/openSidebar";
import Menubar from "primevue/menubar";
import NavAvatar from './NavAvatar.vue';

const store = useOpenSidebarStore();
const { toggleSidebar } = store;
</script>

<template>
  <Menubar>
    <template #start>
        <span class="text-xl pi pi-bars cursor-pointer ml-2" @click="toggleSidebar" v-if="!store.isSidebarOpen" />
    </template>
    <template #end>
        <NavAvatar />
    </template>
  </Menubar>
</template>
