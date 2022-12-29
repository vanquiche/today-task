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

// methods
function handleBlur() {
  canEdit.value = false;
  taskStore.editTask = "";
}
async function handleEditClick() {
  canEdit.value = true;
  await nextTick();
  if (edit.value) {
    edit.value.focus();
  }
}
function handleEditSumbit(id: string) {
  taskStore.updateEdit(id);
  canEdit.value = false;
}
</script>

<template>
  <button
    @click="() => taskStore.toggleComplete(props.task.id)"
    class="completeBtn"
    :aria-label="props.task.completed ? 'task complete' : 'task incomplete'"
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
      id="editTaskForm"
      aria-label="Edit task"
      v-if="canEdit"
      @submit.prevent="() => handleEditSumbit(props.task.id)"
    >
      <input
        id="editTaskInput"
        ref="edit"
        type="text"
        @input="taskStore.inputEditTask"
        :value="props.task.task"
        :disabled="!canEdit"
        :onblur="handleBlur"
        autocomplete="off"
        maxlength="85"
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
  >
    <font-awesome-icon class="btn" icon="fa-solid fa-edit" />
  </button>
  <button
    v-else
    type="reset"
    @click="handleBlur"
    class="controlBtn"
    aria-label="reset edit"
  >
    <font-awesome-icon class="btn" icon="fa-solid fa-rotate-left" />
  </button>
  <button
    @click="() => taskStore.deleteTask(task)"
    class="controlBtn"
    aria-label="delete task"
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
  /* outline: 1px solid red; */
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
  font-weight: 500;
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
