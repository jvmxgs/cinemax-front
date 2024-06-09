<script setup>
  import { FwbAvatar, FwbDropdown, FwbListGroup, FwbListGroupItem } from 'flowbite-vue';
</script>

<template>
  <fwb-dropdown text="Bottom" align-to-end>
    <template #trigger>
      <fwb-avatar img="https://i.pravatar.cc/150?u=admin@example.com" rounded />
    </template>
    <fwb-list-group class="bg-gray-50 dark:bg-gray-800">
      <fwb-list-group-item>
        <router-link to="/bar">Go to Bar</router-link>
      </fwb-list-group-item>
      <fwb-list-group-item>
        Settings
      </fwb-list-group-item>
      <fwb-list-group-item>
        Messages
      </fwb-list-group-item>
      <fwb-list-group-item>
        Download
      </fwb-list-group-item>
    </fwb-list-group>
  </fwb-dropdown>
</template>
