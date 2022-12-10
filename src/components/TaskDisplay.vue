<script setup lang="ts">
import { useTaskStore } from "@/stores/task";
import TaskItem from "@/components/TaskItem.vue";
import { ref, computed } from "vue";
const taskStore = useTaskStore();
const showAllTask = ref<boolean>(true);

const filteredTasks = computed(() =>
  showAllTask.value ? taskStore.tasks : taskStore.inCompleteTasks
);
</script>

<template>
  <label for="all">
    <input type="radio" id="all" v-model="showAllTask" :value="true" />
    all
  </label>
  <label for="incomplete">
    <input type="radio" id="incomplete" v-model="showAllTask" :value="false" />
    incomplete
  </label>

  <ul class="container">
    <li class="task" v-for="task in filteredTasks" :key="task.id">
      <TaskItem :task="task" />
    </li>
  </ul>
</template>

<style scoped>
.container {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
}

.task {
  width: 100%;
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  /* outline: 1px solid black; */
  margin: 10px 0;
}
</style>
