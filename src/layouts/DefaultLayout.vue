<script setup lang="ts">
import NavAvatar from '@/components/admin/NavAvatar.vue';
import { useAuthStore } from '@/stores/auth';
import Button from 'primevue/button';
import Image from 'primevue/image';
import Menubar from 'primevue/menubar';
import { RouterLink } from 'vue-router';

const authStore = useAuthStore()


</script>

<template>
  <div class="h-screen flex flex-col">
    <header>
      <Menubar>
        <template #start>
          <RouterLink :to="{ name: 'Home' }">
            <Image src="/logo.png" alt="Image" width="120" />
          </RouterLink>
        </template>
        <template #end>
            <NavAvatar v-if="authStore.isAuthenticated"/>
            <RouterLink v-else :to="{ name: 'Login' }">
              <Button label="Login" icon="pi pi-sign-in" />
            </RouterLink>
        </template>
      </Menubar>
    </header>
    <main class="flex-grow">
      <router-view />
    </main>
  </div>
</template>
