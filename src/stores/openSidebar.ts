import { useWindowSize } from '@/composables/useWindowSize'
import { defineStore } from 'pinia'
import { onMounted, ref, watch } from 'vue'

export const useOpenSidebarStore = defineStore('openSidebar', () => {
  const openSidebarLs = localStorage.getItem('openSidebar')
  const localOpenSidebarStore = openSidebarLs === '1' || openSidebarLs === null
  const isSidebarOpen = ref(localOpenSidebarStore)
  const { isMobile } = useWindowSize()
  const isMobileDevice = ref(isMobile.value)

  const updateDeviceState = () => {
    isMobileDevice.value = isMobile.value;
    if (isMobile.value || !localOpenSidebarStore) {
      isSidebarOpen.value = false
    }
  };

  onMounted(() => {
    updateDeviceState()
  });

  watch(isMobile, () => {
    updateDeviceState()
  })

  watch(isSidebarOpen, (value): void => {
    if (isMobileDevice.value) {
      return
    }
    localStorage.setItem('openSidebar', value ? '1' : '0')
  })

  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  function hideSidebar() {
    isSidebarOpen.value = false
  }

  return { isSidebarOpen, hideSidebar, toggleSidebar }
})
