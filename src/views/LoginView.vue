<template>
  <div class="flex justify-center items-center w-full h-full">
    <Card class="w-full max-w-sm sm:p-4 md:p-6">
      <template #title>Login</template>
      <template #content>
        <section class="flex flex-col gap-6 mt-4">
          <transition-group name="p-message" tag="div">
            <Message severity="error" v-if="error">{{ error }}</Message>
          </transition-group>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-at"></i>
            </InputGroupAddon>
            <FloatLabel>
              <InputText v-model="email" inputId="email" :invalid="!! errors?.email" />
              <label for="email">Email</label>
            </FloatLabel>
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-shield"></i>
            </InputGroupAddon>
            <FloatLabel>
                <Password v-model="password" :feedback="false" inputId="password" :invalid="!! errors?.password" />
                <label for="password">Password</label>
            </FloatLabel>
          </InputGroup>
        </section>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <Button label="Login" icon="pi pi-sign-in" class="mr-2" :loading="loading" @click="login" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import Card from 'primevue/card'
import FloatLabel from 'primevue/floatlabel'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import Password from 'primevue/password'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login as loginService } from '../services/authService'
import { useAuthStore } from '../stores/auth'

  const email = ref('')
  const password = ref('')
  const loading = ref(false)
  const error = ref('')
  const errors = ref([])
  const authStore = useAuthStore()
  const router = useRouter()

  const login = async () => {
    try {
      loading.value = true
      error.value = null
      errors.value = []
      const data = await loginService({ email: email.value, password: password.value })
      authStore.setToken(data.data.data.access_token)
      router.push('/admin')
    } catch (e) {
      loading.value = false
      errors.value = e.response.data.errors
      error.value = e.response.data.message
    }
  }

</script>
