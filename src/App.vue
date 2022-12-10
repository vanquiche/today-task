<script setup lang="ts">
import { onMounted } from "vue";
import TaskDisplay from "@/components/TaskDisplay.vue";
import TaskForm from "@/components/TaskForm.vue";
import { useTaskStore } from "@/stores/task";
const taskStore = useTaskStore();

onMounted(() => {
  const storage = localStorage.getItem("todayTask");
  if (storage) {
    taskStore.tasks = JSON.parse(storage);
  }
});
</script>

<template>
  <h1>Today Task</h1>
  <TaskForm />
  <TaskDisplay />
</template>

<!-- <style scoped></style> -->
