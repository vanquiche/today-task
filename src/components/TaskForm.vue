<script setup lang="ts">
import { useTaskStore } from "@/stores/task";
const taskStore = useTaskStore();
</script>

<template>
  <form @submit.prevent="taskStore.addTask">
    <label for="task">New Task</label>
    <input
      type="text"
      id="task"
      name="task"
      v-model="taskStore.newTask"
      placeholder="Let's do something..."
      autocomplete="off"
      required
    />
    <button>Submit</button>
  </form>
</template>

<style scoped>
label {
  display: block;
}
</style>
