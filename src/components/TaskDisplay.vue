<script setup lang="ts">
import TaskItem from "@/components/TaskItem.vue";
import type { ThemeType } from "./themes";
import { ref, computed, inject } from "vue";
import { useTaskStore } from "@/stores/task";
import { DateTime } from "luxon";
import type { TaskType } from "@/types";
import OldTaskItem from "./OldTaskItem.vue";
const showAllTask = ref<boolean>(true);
const theme = inject<ThemeType>("theme");
const taskStore = useTaskStore();
const dt = DateTime;
const today = dt.now().weekday;

const props = withDefaults(defineProps<{ tasks: TaskType[] }>(), {});

const tasks = computed(() =>
  showAllTask.value
    ? props.tasks
    : props.tasks.filter((t) => t.completed === false)
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
      v-for="(task, index) in tasks"
      :key="task.id"
      :style="[index % 2 === 0 ? { backgroundColor: theme?.inputBgColor } : {}]"
    >
      <TaskItem
        :task="task"
        v-if="dt.fromISO(task.createdAt).weekday === today"
      />
      <OldTaskItem
        :task-item="task"
        :handle-click="() => taskStore.moveTask(task)"
        v-else
      />
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
