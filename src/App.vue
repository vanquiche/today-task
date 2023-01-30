<script setup lang="ts">
import { onMounted, ref, provide, computed, reactive } from "vue";
import { DateTime } from "luxon";
// themes
import { lightTheme, darkTheme } from "./components/themes";
// components
import TaskDisplay from "@/components/TaskDisplay.vue";
import HeaderBar from "./components/HeaderBar.vue";
import TaskForm from "@/components/TaskForm.vue";
import DateRange from "./components/DateRange.vue";
// store
import { useTaskStore } from "@/stores/task";
import ModalDialog from "./components/ModalDialog.vue";
import type { TaskType } from "./types";
// store
const taskStore = useTaskStore();

// date handler
const dt = DateTime;
const dateRange = reactive({
  dates: computed(() => taskStore.daysWithTasks) as any,
  index: 0,
  selected: function () {
    return this.dates[this.index] || dt.now().weekday;
  },
  nextDate: function () {
    if (this.index >= this.dates.length - 1) return;
    this.index++;
  },
  prevDate: function () {
    if (this.index <= 0) return;
    this.index--;
  },
});

function handleDateDecrement() {
  dateRange.nextDate();
}

function handleDateIncrement() {
  dateRange.prevDate();
}

// computed values
const toggleTheme = ref(true);
const theme = computed(() => (toggleTheme.value ? darkTheme : lightTheme));
function handleToggleSwitch() {
  toggleTheme.value = !toggleTheme.value;
  localStorage.setItem("todayTheme", JSON.stringify(toggleTheme.value));
}

const selectedTasks = computed(() =>
  taskStore.tasks
    .filter((t) => dt.fromISO(t.createdAt).weekday === dateRange.selected())
    .sort((a, b) => b.position - a.position)
);

const modal = reactive({
  state: false,
  close: function () {
    this.state = false;
  },
  open: function () {
    this.state = true;
  },
});

provide("modal", modal);
provide("theme", theme);

onMounted(() => {
  const storage = localStorage.getItem("todayTask");
  const theme = localStorage.getItem("todayTheme");
  // check if is date of latest task is in this week
  if (storage) {
    const currentWeek = dt.now().weekNumber;
    // filter out task that is not within the current week
    const tasks = JSON.parse(storage).filter(
      (task: TaskType) => dt.fromISO(task.createdAt).weekNumber === currentWeek
    );
    taskStore.tasks = tasks;
  }

  if (theme) {
    toggleTheme.value = JSON.parse(theme);
  }
});
</script>

<template>
  <ModalDialog />
  <main
    class="main"
    :class="[toggleTheme ? 'blackDotPattern' : 'whiteDotPattern']"
    :style="{ backgroundColor: theme.bgColor, color: theme.color }"
  >
    <HeaderBar
      :on-toggle="handleToggleSwitch"
      :toggle-state="toggleTheme"
      :on-click="() => modal.open()"
    />
    <DateRange
      :selected-date="dateRange.selected()"
      :increment-date="handleDateIncrement"
      :decrement-date="handleDateDecrement"
    />
    <TaskForm :selected-date="dateRange.selected()" />
    <TaskDisplay :tasks="selectedTasks" />
  </main>
</template>

<style scoped>
.main {
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
    rgba(0, 0, 0, 0.18) 1px,
    transparent 0
  );
  background-size: 35px 35px;
}
.blackDotPattern {
  background-image: radial-gradient(
    circle at 1px 1px,
    rgba(255, 255, 255, 0.18) 1px,
    transparent 0
  );
  background-size: 35px 35px;
}
</style>
