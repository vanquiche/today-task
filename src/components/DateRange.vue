<script setup lang="ts">
import type { DateTime as DateTimeType } from "luxon";
import { DateTime } from "luxon";
import type { ThemeType } from "./themes";
import { computed, inject } from "vue";
import { useTaskStore } from "@/stores/task";
const taskStore = useTaskStore();
const dt = DateTime;
// const today = dt.now().weekday;

const props = withDefaults(
  defineProps<{
    selectedDate: DateTimeType["weekday"];
    decrementDate: () => void;
    incrementDate: () => void;
  }>(),
  {}
);

const disableBackBtn = computed(() =>
  taskStore.daysWithTasks.length === 0 ||
  props.selectedDate ===
    taskStore.daysWithTasks[taskStore.daysWithTasks.length - 1]
    ? true
    : false
);

const disableForwardBtn = computed(() =>
  props.selectedDate === dt.now().weekday ? true : false
);

const theme = inject<ThemeType>("theme");

const displayDate = computed(() => {
  if (props.selectedDate === dt.now().weekday) return "Today";
  const now = dt.local();
  const date = now.startOf("week").plus({ days: props.selectedDate - 1 });
  return date.toLocaleString({ month: "short", day: "numeric" });
});
</script>

<template>
  <section id="date-range" class="wrapper">
    <button
      @click="props.decrementDate"
      :style="{ color: theme?.accentColor }"
      :disabled="disableBackBtn"
      aria-label="navigate to previous date"
    >
      <font-awesome-icon icon="fa-solid fa-circle-arrow-left" size="xl" />
    </button>
    <h1 class="date" aria-label="Selected Date">{{ displayDate }}</h1>
    <button
      @click="props.incrementDate"
      :style="{ color: theme?.accentColor }"
      :disabled="disableForwardBtn"
      aria-label="navigate to next date"
    >
      <font-awesome-icon icon="fa-solid fa-circle-arrow-right" size="xl" />
    </button>
  </section>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  gap: 30px;
}
button {
  color: inherit;
  cursor: pointer;
}

.date {
  font-size: 1.2rem;
  width: 135px;
  text-align: center;
  font-weight: 600;
}
</style>
