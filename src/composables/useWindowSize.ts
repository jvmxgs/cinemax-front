import { onMounted, onUnmounted, ref } from 'vue';

export function useWindowSize() {
  const isMobile = ref(window.innerWidth <= 640);

  const onResize = () => {
    isMobile.value = window.innerWidth <= 640;
  };

  onMounted(() => {
    window.addEventListener('resize', onResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', onResize);
  });

  return { isMobile };
}
