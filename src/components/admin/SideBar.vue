<script setup lang="ts">
import { useOpenSidebarStore } from "@/stores/openSidebar";
import Avatar from "primevue/avatar";
import Badge from "primevue/badge";
import Image from "primevue/image";
import Menu from "primevue/menu";
import { ref } from "vue";


const store = useOpenSidebarStore();
const { hideSidebar } = store;

const items = ref([
    {
        separator: true
    },
    {
        label: 'Documents',
        items: [
            {
                label: 'New',
                icon: 'pi pi-plus'
            },
            {
                label: 'Search',
                icon: 'pi pi-search'
            }
        ]
    },
    {
        label: 'Profile',
        items: [
            {
                label: 'Settings',
                icon: 'pi pi-cog'
            },
            {
                label: 'Messages',
                icon: 'pi pi-inbox',
                badge: 2
            },
            {
                label: 'Logout',
                icon: 'pi pi-sign-out'
            }
        ]
    },
    {
        separator: true
    }
]);
</script>

<template>
    <div class="flex justify-content-center" v-if="store.isSidebarOpen">
        <Menu :model="items" class="w-full md:w-60">
            <template #start>
                <div class="flex justify-between items-center pr-3">
                    <span class="inline-flex align-items-center gap-1 px-2 py-2">
                        <RouterLink :to="{ name: 'Admin' }">
                            <Image src="/logo.png" alt="Image" width="120" />
                        </RouterLink>
                    </span>
                    <span class="pi pi-times cursor-pointer" @click="hideSidebar" />
                </div>
            </template>
            <template #submenuheader="{ item }">
                <span class="text-primary font-bold">{{ item.label }}</span>
            </template>
            <template #item="{ item, props }">
                <a class="flex align-items-center" v-bind="props.action">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                    <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                    <span v-if="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{ item.shortcut }}</span>
                </a>
            </template>
            <template #end>
                <button class="relative overflow-hidden w-full p-link flex align-items-center p-2 pl-3 text-color hover:surface-200 border-noround">
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="mr-2" shape="circle" />
                    <span class="inline-flex flex-column">
                        <span class="font-bold">Amy Elsner</span>
                        <span class="text-sm">Admin</span>
                    </span>
                </button>
            </template>
        </Menu>
    </div>
</template>
