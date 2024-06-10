<script setup lang="ts">
import Avatar from 'primevue/avatar'
import Menu from 'primevue/menu'
import { ref } from "vue"
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const menu = ref();
const items = ref([
    {
        label: 'Jhon Doe',
        items: [
            {
                label: 'Dashboard',
                icon: 'pi pi-th-large',
                command: () => {
                  router.push('/admin')
                }
            },
            {
                label: 'Sign out',
                icon: 'pi pi-sign-out',
                iconOnly: true,
                command: () => {
                  singOut()
                }
            }
        ]
    }
]);

const toggle = (event) => {
    menu.value.toggle(event)
};

const singOut = () => {
  authStore.clearToken()
  router.push({ name: 'Login' })
}

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
