<script setup lang="ts">
// imports
import { nextTick, ref } from "vue";
import type { TaskType } from "@/types";
import { useTaskStore } from "@/stores/task";

defineProps<{ task: TaskType }>();
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
  <button @click="() => taskStore.toggleComplete(task.id)" class="completeBtn">
    <font-awesome-icon
      v-if="task.completed"
      class="btn"
      icon="fa-regular fa-square-check"
    />
    <font-awesome-icon v-else class="btn" icon="fa-regular fa-square" />
  </button>
  <div class="taskContainer">
    <form v-if="canEdit" @submit.prevent="() => handleEditSumbit(task.id)">
      <input
        ref="edit"
        type="text"
        @input="taskStore.inputEditTask"
        :value="task.task"
        :disabled="!canEdit"
        :onblur="handleBlur"
        maxlength="85"
      />
    </form>
    <p v-else :class="[task.completed ? 'strikethrough' : undefined]">
      {{ task.task }}
    </p>
  </div>
  <button v-if="!canEdit" @click="handleEditClick" class="controlBtn">
    <font-awesome-icon class="btn" icon="fa-solid fa-edit" />
  </button>
  <button v-else type="reset" @click="handleBlur" class="controlBtn">
    <font-awesome-icon class="btn" icon="fa-solid fa-rotate-left" />
  </button>
  <button @click="() => taskStore.deleteTask(task.id)" class="controlBtn">
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

.taskContainer input {
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

.taskContainer p {
  word-wrap: break-word;
  font-weight: 500;
}

.task {
  background: none;
  outline: none;
  border: none;
}

input:focus {
  outline: 1px solid tomato;
}

.strikethrough {
  text-decoration: line-through;
  opacity: 0.65;
}
</style>
