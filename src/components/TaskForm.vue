<script setup lang="ts">
import { inject, computed, ref } from "vue";
import { useTaskStore } from "@/stores/task";
import type { ThemeType } from "./themes";
import type { DateTime as DateTimeType } from "luxon";
import { DateTime } from "luxon";
const dt = DateTime;
const taskStore = useTaskStore();
let today = dt.now().weekday;
const theme = inject<ThemeType>("theme");
const props = withDefaults(
  defineProps<{ selectedDate: DateTimeType["weekday"] }>(),
  {}
);
const taskInput = ref("");

function submitTask() {
  taskStore.addTask(taskInput.value);
  taskInput.value = "";
}
const disableInput = computed(() =>
  props.selectedDate !== today ? true : false
);

function checkDate() {
  if (today !== dt.now().weekday) {
    location.reload();
  }
}
</script>

<template>
  <form id="task-form" @submit.prevent="submitTask" aria-label="Add new task">
    <input
      type="text"
      id="newTaskInput"
      :style="{
        backgroundColor: theme?.inputBgColor,
        color: theme?.color,
      }"
      v-model="taskInput"
      :placeholder="disableInput ? '...' : 'do something today'"
      @focus="checkDate"
      autocomplete="off"
      maxlength="135"
      :disabled="disableInput"
      aria-label="Add new task"
      data-testid="newTaskInput"
      required
    />
    <button
      id="task-submit-btn"
      name="task-submit-btn"
      :disabled="taskInput ? false : true"
      data-testid="newTaskSubmit"
      class="btn-std"
    >
      Add Task
    </button>
  </form>
</template>

<style scoped>
form {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  /* outline: 1px solid red; */
  padding: 0 20px;
}

input {
  width: 70%;
  max-width: 600px;
  padding: 8px 10px;
  border-radius: 5px;
  border: none;
  /* text-align: center; */
  outline: none;
}

input:focus {
  outline: 2px solid rgb(110, 112, 212);
}
label {
  display: block;
}

@media screen and (max-width: 500px) {
  form {
    flex-direction: column;
  }
  input {
    width: 100%;
  }
}
</style>
