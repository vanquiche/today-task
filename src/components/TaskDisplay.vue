<script setup lang="ts">
import { useTaskStore } from "@/stores/task";
import TaskItem from "@/components/TaskItem.vue";
import { ref, computed, inject } from "vue";
const taskStore = useTaskStore();
const showAllTask = ref<boolean>(true);
const darkTheme = inject("theme");

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

  <ul class="container" :class="[darkTheme ? 'taskDark' : 'taskLight']">
    <li class="task" v-for="task in filteredTasks" :key="task.id">
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

.taskDark li:nth-child(odd) {
  background-color: rgb(43, 43, 43);
}

.taskLight li:nth-child(odd) {
  background-color: rgb(230, 230, 230);
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
  padding: 10px 0;
  border-radius: 5px;
}
</style>
