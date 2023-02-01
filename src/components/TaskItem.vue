<script setup lang="ts">
// imports
import { nextTick, ref } from "vue";
import type { TaskType } from "@/types";
import { useTaskStore } from "@/stores/task";

const props = withDefaults(defineProps<{ task: TaskType }>(), {});
// store
const taskStore = useTaskStore();
// state
const canEdit = ref(false);
const edit = ref<HTMLInputElement>();
const taskInput = ref(props.task.task);

// methods
function handleBlur() {
  canEdit.value = false;
  taskInput.value = props.task.task;
}
async function handleEditClick() {
  canEdit.value = true;
  await nextTick();
  if (edit.value) {
    edit.value.focus();
  }
}
function handleSumbit(id: string) {
  if (!taskInput.value) return;
  taskStore.updateEdit(id, taskInput.value);
  canEdit.value = false;
}
</script>

<template>
  <button
    @click="() => taskStore.toggleComplete(props.task.id)"
    class="completeBtn"
    :aria-label="props.task.completed ? 'task complete' : 'task incomplete'"
    data-testid="toggleComplete"
  >
    <font-awesome-icon
      v-if="props.task.completed"
      class="btn"
      icon="fa-regular fa-square-check"
    />
    <font-awesome-icon v-else class="btn" icon="fa-regular fa-square" />
  </button>
  <div class="taskContainer">
    <form
      aria-label="Edit task"
      v-if="canEdit"
      @submit.prevent="() => handleSumbit(props.task.id)"
    >
      <input
        ref="edit"
        type="text"
        v-model="taskInput"
        :disabled="!canEdit"
        :onblur="handleBlur"
        autocomplete="off"
        maxlength="135"
        data-testid="editTaskInput"
      />
    </form>
    <p v-else :class="[props.task.completed ? 'strikethrough' : undefined]">
      {{ props.task.task }}
    </p>
  </div>
  <button
    v-if="!canEdit"
    @click="handleEditClick"
    class="controlBtn"
    aria-label="edit task"
    data-testid="editTask"
  >
    <font-awesome-icon class="btn" icon="fa-solid fa-edit" />
  </button>
  <button
    v-else
    type="reset"
    @click="handleBlur"
    class="controlBtn"
    aria-label="reset edit"
    data-testid="resetTask"
  >
    <font-awesome-icon class="btn" icon="fa-solid fa-rotate-left" />
  </button>
  <button
    @click="() => taskStore.deleteTask(task)"
    class="controlBtn"
    aria-label="delete task"
    data-testid="deleteTask"
  >
    <font-awesome-icon class="btn" icon="fa-solid fa-xmark" size="lg" />
  </button>
</template>

<style scoped>
button {
  margin: 0 3px;
  color: inherit;
}
.btn {
  cursor: pointer;
}
.taskContainer {
  width: 90%;
  overflow-x: hidden;
  padding: 0 10px;
  display: flex;
  align-items: center;
}

form {
  width: 100%;
}

input {
  width: 100%;
  font-size: 0.8rem;
  font-family: inherit;
  margin: 0;
  border: none;
  outline: none;
  background: none;
  color: inherit;
  border-radius: 5px;
}

input:focus {
  outline: 1px solid tomato;
}

p {
  word-wrap: break-word;
  /* outline: 1px solid red; */
}

.task {
  background: none;
  outline: none;
  border: none;
}

.strikethrough {
  text-decoration: line-through;
  opacity: 0.65;
}
</style>
