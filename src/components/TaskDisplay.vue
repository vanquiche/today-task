<script setup lang="ts">
import TaskItem from "@/components/TaskItem.vue";
import { darkTheme, type ThemeType } from "./themes";
import { ref, computed, inject } from "vue";
import { useTaskStore } from "@/stores/task";
import { DateTime } from "luxon";
import type { TaskType } from "@/types";
import OldTaskItem from "./OldTaskItem.vue";

const props = withDefaults(defineProps<{ tasks: TaskType[] }>(), {});

const showAllTask = ref<boolean>(true);

const theme = inject<ThemeType>("theme", darkTheme);
const taskStore = useTaskStore();
const dt = DateTime;
const today = dt.now().weekday;

const dragTaskSelected = ref<TaskType | null>(null);
const dragTaskHover = ref<TaskType | null>(null);
const isDragging = ref(false);

const tasks = computed(() =>
  showAllTask.value
    ? props.tasks
    : props.tasks.filter((t) => t.completed === false)
);

function handleDragstart(task: TaskType) {
  isDragging.value = true;
  dragTaskSelected.value = task;
}

function handleDragover(task: TaskType) {
  dragTaskHover.value = task;
}

function handleDragend() {
  if (dragTaskSelected.value && dragTaskHover.value && isDragging.value) {
    // return if position has not changed
    if (dragTaskSelected.value.position === dragTaskHover.value.position)
      return;
    taskStore.updatePosition(dragTaskSelected.value, dragTaskHover.value);
    // clear selection and style
  }
  dragTaskHover.value = null;
  isDragging.value = false;
}
</script>

<template>
  <section>
    <div class="btnContainer">
      <button
        class="filterBtn"
        @click="() => (showAllTask = true)"
        aria-label="show all tasks"
        data-testid="filterNone"
      >
        <font-awesome-icon
          icon="fa-regular fa-square"
          v-if="!showAllTask"
          aria-hidden="true"
        />
        <font-awesome-icon
          icon="fa-regular fa-square-check"
          v-else
          aria-hidden="true"
        />
        All Tasks
      </button>
      <button
        class="filterBtn"
        @click="() => (showAllTask = false)"
        aria-label="show uncompleted tasks"
        data-testid="filterIncomplete"
      >
        <font-awesome-icon
          icon="fa-regular fa-square"
          v-if="showAllTask"
          aria-hidden="true"
        />
        <font-awesome-icon
          icon="fa-regular fa-square-check"
          v-else
          aria-hidden="true"
        />
        Uncompleted Tasks
      </button>
    </div>

    <TransitionGroup name="task" tag="ul" class="container" id="taskContainer">
      <li
        class="task"
        v-for="(task, index) in tasks.filter((t) => t.task !== 'null')"
        :key="task.id"
        :style="{
          backgroundColor: index % 2 === 0 ? theme.inputBgColor : '',
          outline:
            dragTaskHover && dragTaskHover.id === task.id
              ? `2px solid ${theme.accentColor}`
              : '2px solid transparent',
        }"
        :draggable="dt.fromISO(task.createdAt).weekday === today"
        @dragstart="() => handleDragstart(task)"
        @dragover="() => handleDragover(task)"
        @dragend="handleDragend"
        :data-testid="`task-${index}`"
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
    </TransitionGroup>
  </section>
</template>

<style scoped>
section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  width: 100%;
  max-width: 800px;
}

.btnContainer {
  display: flex;
  gap: 25px;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
}

.filterBtn {
  display: flex;
  align-items: center;
  gap: 7px;
}

.task {
  width: 100%;
  display: flex;
  list-style-type: none;
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0;
  transition: outline 200ms ease;
}

/* transition classes */
.task-move,
.task-enter-active,
.task-leave-active {
  transition: transform 200ms ease;
}
.task-enter-from {
  transform: translateX(100%);
}
.task-leave-to {
  opacity: 0;
}
.task-leave-active {
  position: absolute;
}
</style>
