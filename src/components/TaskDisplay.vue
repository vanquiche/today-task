<script setup lang="ts">
import { useTaskStore } from "@/stores/task";
import TaskItem from "@/components/TaskItem.vue";
import type { ThemeType } from "./themes";
import { ref, computed, inject } from "vue";
const taskStore = useTaskStore();
const showAllTask = ref<boolean>(true);
const theme = inject<ThemeType>("theme");

const filteredTasks = computed(() =>
  showAllTask.value ? taskStore.getTodayTasks : taskStore.inCompleteTasks
);
</script>

<template>
  <div class="radioContainer">
    <label for="all">
      <input type="radio" id="all" v-model="showAllTask" :value="true" />
      Show All
    </label>
    <label for="incomplete">
      <input
        type="radio"
        id="incomplete"
        v-model="showAllTask"
        :value="false"
      />
      Show Incompleted
    </label>
  </div>

  <ul class="container">
    <li
      class="task"
      v-for="(task, index) in filteredTasks"
      :key="task.id"
      :style="[index % 2 === 0 ? { backgroundColor: theme?.inputBgColor } : {}]"
    >
      <TaskItem :task="task" />
    </li>
  </ul>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  /* outline: 1px solid red; */
  padding: 0 20px;
  width: 100%;
  max-width: 800px;
}

.radioContainer {
  display: flex;
  gap: 20px;
  /* outline: 1px solid red; */
  width: fit-content;
}

.task {
  width: 100%;
  display: flex;
  /* justify-content: space-between; */
  list-style-type: none;
  /* outline: 1px solid black; */
  padding: 10px;
  border-radius: 5px;
}
</style>
