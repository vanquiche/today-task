<script setup lang="ts">
import { onMounted, ref, provide, computed, type ComputedRef } from "vue";
import { DateTime } from "luxon";
// themes
import { lightTheme, darkTheme, type ThemeType } from "./components/themes";
// components
import TaskDisplay from "@/components/TaskDisplay.vue";
import HeaderBar from "./components/HeaderBar.vue";
import TaskForm from "@/components/TaskForm.vue";
import DateRange from "./components/DateRange.vue";
// store
import { useTaskStore } from "@/stores/task";
// variables
const taskStore = useTaskStore();
const toggleTheme = ref(true);

// date variables
const dt = DateTime;
const selectedDate = ref(dt.now().weekday);
const selectedDateIndex = ref(0);

// computed values
const theme = computed(() => (toggleTheme.value ? darkTheme : lightTheme));

const selectedTasks = computed(() =>
  taskStore.tasks.filter(
    (t) => dt.fromISO(t.createdAt).weekday === selectedDate.value
  )
);

// functions
function handleToggleSwitch() {
  toggleTheme.value = !toggleTheme.value;
}
function handleDateDecrement() {
  if (taskStore.daysWithTasks.length === 0) return;
  selectedDateIndex.value++;
  selectedDate.value = taskStore.daysWithTasks[selectedDateIndex.value];
}

function handleDateIncrement() {
  if (taskStore.daysWithTasks.length === 0) return;
  selectedDateIndex.value--;
  selectedDate.value = taskStore.daysWithTasks[selectedDateIndex.value];
}

provide<ComputedRef<ThemeType>>("theme", theme);

onMounted(() => {
  const storage = localStorage.getItem("todayTask");
  if (storage) {
    taskStore.tasks = JSON.parse(storage);
  }
});
</script>

<template>
  <section
    class="container"
    :class="[toggleTheme ? 'blackDotPattern' : 'whiteDotPattern']"
    :style="{ backgroundColor: theme.bgColor, color: theme.color }"
  >
    <HeaderBar :on-toggle="handleToggleSwitch" :toggle-state="toggleTheme" />
    <DateRange
      :selected-date="selectedDate"
      :increment-date="handleDateIncrement"
      :decrement-date="handleDateDecrement"
    />
    <TaskForm :selected-date="selectedDate" />
    <TaskDisplay :tasks="selectedTasks" />
  </section>
</template>

<style scoped>
.container {
  padding: 0;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  min-height: 100%;
  height: fit-content;
  transition: background-color 250ms ease-out;
}

.whiteDotPattern {
  background-image: radial-gradient(
    circle at 1px 1px,
    rgba(0, 0, 0, 0.3) 1px,
    transparent 0
  );
  background-size: 35px 35px;
}
.blackDotPattern {
  background-image: radial-gradient(
    circle at 1px 1px,
    rgba(255, 255, 255, 0.3) 1px,
    transparent 0
  );
  background-size: 35px 35px;
}
</style>
