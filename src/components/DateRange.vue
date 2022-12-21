<script setup lang="ts">
import type { DateTime as DateTimeType } from "luxon";
import { DateTime } from "luxon";
import type { ThemeType } from "./themes";
import { computed, inject } from "vue";
import { useTaskStore } from "@/stores/task";
const taskStore = useTaskStore();
const dt = DateTime;
const today = dt.now().weekday;

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
  props.selectedDate === today ? true : false
);

const theme = inject<ThemeType>("theme");

const displayDate = computed(() => {
  const now = dt.local();
  const date = now.startOf("week").plus({ days: props.selectedDate - 1 });
  return date.toLocaleString(dt.DATE_MED_WITH_WEEKDAY);
});
</script>

<template>
  <div class="wrapper">
    <button
      @click="props.decrementDate"
      :style="{ color: theme?.accentColor }"
      :disabled="disableBackBtn"
    >
      <font-awesome-icon icon="fa-solid fa-circle-arrow-left" size="xl" />
    </button>
    <p>{{ displayDate }}</p>
    <button
      @click="props.incrementDate"
      :style="{ color: theme?.accentColor }"
      :disabled="disableForwardBtn"
    >
      <font-awesome-icon icon="fa-solid fa-circle-arrow-right" size="xl" />
    </button>
  </div>
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
button:focus {
  outline: 2px solid red;
}

p {
  font-size: 1.2rem;
}
</style>
