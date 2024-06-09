<script setup lang="ts">
import { useOpenSidebarStore } from "@/stores/openSidebar"
import Badge from "primevue/badge"
import Image from "primevue/image"
import Menu from "primevue/menu"
import { ref } from "vue"
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useOpenSidebarStore()
const { hideSidebar } = store

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
            router.push({ name: 'Admin' })
        }
    },
    {
        separator: true
    },
    {
        label: 'Movies',
        items: [
            {
                label: 'List',
                icon: 'pi pi-video',
                command: () => {
                    router.push({ name: 'MoviesList' })
                }
            },
            {
                label: 'Add',
                icon: 'pi pi-plus',
                command: () => {
                    router.push({ name: 'MoviesAdd' })
                }
            }
        ]
    },
    {
        label: 'Schedules',
        items: [
            {
                label: 'List',
                icon: 'pi pi-calendar'
            }
        ]
    },
    {
        separator: true
    }
])
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
        </Menu>
    </div>
</template>
