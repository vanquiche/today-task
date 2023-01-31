<script setup lang="ts">
import type { TaskType } from "@/types";
const props = withDefaults(
  defineProps<{
    taskItem: TaskType;
    handleClick: Function;
  }>(),
  {}
);
</script>

<template>
  <div class="taskContainer">
    <p :class="[props.taskItem.completed ? 'strikethrough' : undefined]">
      {{ props.taskItem.task }}
    </p>
    <button @click="props.handleClick" aria-label="move task to current day">
      <font-awesome-icon icon="fa-solid fa-angles-right" />
    </button>
  </div>
</template>

<style scoped>
.taskContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.strikethrough {
  text-decoration: line-through;
  opacity: 0.65;
}
</style>
