<script setup lang="ts">
import { onMounted, ref, provide, computed, type ComputedRef } from "vue";
import { DateTime } from "luxon";
// themes
import { lightTheme, darkTheme, type ThemeType } from "./components/themes";
// components
import TaskDisplay from "@/components/TaskDisplay.vue";
import SwitchBtn from "./components/SwitchBtn.vue";
import TaskForm from "@/components/TaskForm.vue";
import DateRange from "./components/DateRange.vue";
// store
import { useTaskStore } from "@/stores/task";
// variables
const taskStore = useTaskStore();
const toggleTheme = ref(true);
const theme = computed(() => (toggleTheme.value ? darkTheme : lightTheme));
function handleToggleSwitch() {
  toggleTheme.value = !toggleTheme.value;
}
provide<ComputedRef<ThemeType>>("theme", theme);
const dt = DateTime;
const selectedDate = ref(dt.now());
const today = dt.now();

function decrementDate() {
  selectedDate.value = selectedDate.value.minus({ days: 1 });
}
function incrementDate() {
  selectedDate.value = selectedDate.value.plus({ days: 1 });
}

const todayTasks = computed(() =>
  taskStore.tasks.filter(
    (t) => dt.fromISO(t.createdAt).weekday === selectedDate.value.weekday
  )
);
onMounted(() => {
  const storage = localStorage.getItem("todayTask");
  if (storage) {
    taskStore.tasks = JSON.parse(storage);
  }
});
</script>

<template>
  <div
    class="container"
    :class="[toggleTheme ? 'blackGrid' : 'whiteGrid']"
    :style="{ backgroundColor: theme.bgColor, color: theme.color }"
  >
    <SwitchBtn :on-change="handleToggleSwitch" :state="toggleTheme" />
    <DateRange
      :current-date="today"
      :selected-date="selectedDate"
      :increment-date="incrementDate"
      :decrement-date="decrementDate"
    />
    <TaskForm />
    <TaskDisplay :tasks="todayTasks" />
  </div>
</template>

<style scoped>
.container {
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  min-height: 100%;
  height: fit-content;
  transition: background-color 250ms ease-out;
}

.whiteGrid {
  background-image: radial-gradient(
    circle at 1px 1px,
    rgba(0, 0, 0, 0.3) 1px,
    transparent 0
  );
  background-size: 35px 35px;
}
.blackGrid {
  background-image: radial-gradient(
    circle at 1px 1px,
    rgba(255, 255, 255, 0.3) 1px,
    transparent 0
  );
  background-size: 35px 35px;
}
</style>
