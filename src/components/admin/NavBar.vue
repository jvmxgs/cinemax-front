<script setup lang="ts">
import { useOpenSidebarStore } from "@/stores/openSidebar";
import Menubar from "primevue/menubar";
import { ref } from "vue";
import NavAvatar from './NavAvatar.vue';

const store = useOpenSidebarStore();
const { toggleSidebar } = store;

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home'
    },
    {
        label: 'Features',
        icon: 'pi pi-star'
    },
    {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
            {
                label: 'Components',
                icon: 'pi pi-bolt'
            },
            {
                label: 'Blocks',
                icon: 'pi pi-server'
            },
            {
                label: 'UI Kit',
                icon: 'pi pi-pencil'
            },
            {
                label: 'Templates',
                icon: 'pi pi-palette',
                items: [
                    {
                        label: 'Apollo',
                        icon: 'pi pi-palette'
                    },
                    {
                        label: 'Ultima',
                        icon: 'pi pi-palette'
                    }
                ]
            }
        ]
    },
    {
        label: 'Contact',
        icon: 'pi pi-envelope'
    }
])

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
