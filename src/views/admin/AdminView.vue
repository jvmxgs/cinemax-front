<script setup lang="ts">
  import Button from 'primevue/button';
import Card from 'primevue/card';
import Timeline from 'primevue/timeline';
import { ref } from 'vue';

const events = ref([
    { status: 'Add a movie', date: '15/10/2020 10:30', icon: 'pi pi-caret-down', color: '#9C27B0', desc: "Navigate to the left menu and click on 'Add' under the 'Movies' section. Then, fill in the required information to add a new movie." },
    { status: 'Add a time slot', date: '15/10/2020 14:00', icon: 'pi pi-caret-down', color: '#673AB7', desc: "Navigate to the left menu and click on 'Add' under the 'Time slots' section. Then, fill in the required information to add a new time slot. Ensure that the time slots have a minimum interval of 20 minutes to avoid overlapping." },
    { status: 'Assign a time slot to a movie', date: '15/10/2020 16:15', icon: 'pi pi-caret-down', color: '#FF9800', desc: "You can assign a time slot to a movie either by adding a new slot or by updating an existing one." }
]);

</script>
<template>
  <Card class="shadow-none">
    <template #title>CineMax</template>
    <template #content>
      <Timeline :value="events" align="alternate" class="customized-timeline">
            <template #marker="slotProps">
                <span class="flex w-2rem h-2rem items-center justify-center text-white border-circle z-1 shadow-1" :style="{ backgroundColor: slotProps.item.color }">
                    <i :class="slotProps.item.icon"></i>
                </span>
            </template>
            <template #content="slotProps">
                <Card class="mt-3">
                    <template #title>
                        {{ slotProps.item.status }}
                    </template>
                    <template #content>
                        <p>
                          {{ slotProps.item.desc }}
                        </p>
                        <Button label="Read more" text></Button>
                    </template>
                </Card>
            </template>
        </Timeline>
    </template>
  </Card>
</template>
<style scoped>
@media screen and (max-width: 960px) {
    ::v-deep(.customized-timeline) {
        .p-timeline-event:nth-child(even) {
            flex-direction: row;

            .p-timeline-event-content {
                text-align: left;
            }
        }

        .p-timeline-event-opposite {
            flex: 0;
        }
    }
}
</style>
