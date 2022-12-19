<script setup lang="ts">
import { inject, computed } from "vue";
import { useTaskStore } from "@/stores/task";
import type { ThemeType } from "./themes";
import type { DateTime as DateTimeType } from "luxon";
import { DateTime } from "luxon";
const dt = DateTime;
const taskStore = useTaskStore();
const today = dt.now().weekday;
const theme = inject<ThemeType>("theme");
const props = withDefaults(
  defineProps<{ selectedDate: DateTimeType["weekday"] }>(),
  {}
);
const disableInput = computed(() =>
  props.selectedDate !== today ? true : false
);
</script>

<template>
  <!-- <p>{{ darkTheme }}</p> -->
  <form @submit.prevent="taskStore.addTask">
    <input
      type="text"
      :style="{
        backgroundColor: theme?.inputBgColor,
        color: theme?.color,
      }"
      id="task"
      name="task"
      v-model="taskStore.newTask"
      :placeholder="disableInput ? '...' : 'do something today'"
      autocomplete="off"
      maxlength="85"
      :disabled="disableInput"
      required
    />
    <button :disabled="taskStore.newTask ? false : true">Add Task</button>
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

button {
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: rgb(110, 112, 212);
}

button:disabled {
  color: rgb(172, 172, 172);
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
