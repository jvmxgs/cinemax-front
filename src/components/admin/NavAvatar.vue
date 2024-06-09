<script setup lang="ts">
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';
import { ref } from "vue";

const menu = ref();
const items = ref([
    {
        label: 'Jhon Doe',
        items: [
            {
                label: 'Account',
                icon: 'pi pi-user'
            },
            {
                label: 'Sign out',
                icon: 'pi pi-sign-out'
            }
        ]
    }
]);

const toggle = (event) => {
    menu.value.toggle(event);
};
</script>

<template>
  <Avatar
    image="https://i.pravatar.cc/150?u=admin@example.com"
    class="mr-2"
    size="large"
    shape="circle"
    @click="toggle"
    aria-haspopup="true"
    aria-controls="overlay_menu"
  />
  <Menu
    ref="menu"
    id="overlay_menu"
    :model="items"
    :popup="true"
  />
</template>
