<script setup lang="ts">
// imports
import { defineProps, nextTick, ref } from "vue";
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
  if (edit.value) {
    await nextTick();
    edit.value.focus();
  }
}
function handleEditSumbit(id: string) {
  taskStore.updateEdit(id);
  canEdit.value = false;
}
</script>

<template>
  <button @click="() => taskStore.toggleComplete(task.id)">complete</button>
  <form @submit.prevent="() => handleEditSumbit(task.id)">
    <input
      ref="edit"
      class="task"
      type="text"
      @input="taskStore.inputEditTask"
      :value="task.task"
      :disabled="!canEdit"
      :class="[task.completed ? 'strikethrough' : undefined]"
      :onblur="handleBlur"
    />
  </form>
  <div>
    <button v-if="!canEdit" @click="handleEditClick">edit</button>
    <button v-else type="reset" @click="handleBlur">cancel</button>
    <button @click="() => taskStore.deleteTask(task.id)">delete</button>
  </div>
</template>

<style scoped>
.task {
  background: none;
  outline: none;
  border: none;
}

.strikethrough {
  text-decoration: line-through;
}
</style>
