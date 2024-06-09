<script setup lang="ts">
import NavBar from '@/components/admin/NavBar.vue';
import SideBar from '@/components/admin/SideBar.vue';

</script>

<template>
  <main class="flex h-screen">
    <SideBar />
    <div class="flex flex-col flex-grow h-full">
      <NavBar />
      <div class="flex-grow p-6">
        <router-view />
      </div>
    </div>
  </main>
</template>
