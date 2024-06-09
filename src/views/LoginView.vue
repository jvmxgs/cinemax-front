<template>
  <div class="flex justify-center items-center w-full h-full">
    <Card class="w-full max-w-sm sm:p-4 md:p-6">
      <template #title>Login</template>
      <template #content>
        <section class="flex flex-col gap-6 mt-4">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-at"></i>
            </InputGroupAddon>
            <FloatLabel>
              <InputText v-model="email" inputId="email" />
              <label for="email">Email</label>
            </FloatLabel>
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-shield"></i>
            </InputGroupAddon>
            <FloatLabel>
                <Password v-model="password" :feedback="false" inputId="password" />
                <label for="password">Password</label>
            </FloatLabel>
          </InputGroup>
        </section>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <Button label="Login" icon="pi pi-sign-in" class="mr-2" @click="login" />
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
import Password from 'primevue/password'
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const login = () => {
  console.log('Email:', email.value)
  console.log('Password:', password.value)
}
</script>
