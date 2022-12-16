<script setup lang="ts">
import { inject } from "vue";
import { useTaskStore } from "@/stores/task";
const taskStore = useTaskStore();

const darkTheme = inject("theme");
</script>

<template>
  <!-- <p>{{ darkTheme }}</p> -->
  <form @submit.prevent="taskStore.addTask">
    <input
      type="text"
      :class="[darkTheme ? 'inputDark' : 'inputLight']"
      id="task"
      name="task"
      v-model="taskStore.newTask"
      placeholder="let's do something today..."
      autocomplete="off"
      maxlength="85"
      required
    />
    <button :disabled="taskStore.newTask.length > 0 ? false : true">
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

button {
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  background-color: rgb(110, 112, 212);
  color: white;
}

button:disabled {
  cursor: default;
  background-color: rgb(151, 151, 151);
  color: rgb(182, 182, 182);
}

input {
  width: 70%;
  max-width: 600px;
  padding: 8px 10px;
  border-radius: 5px;
  border: none;
  text-align: center;
  outline: none;
}

.inputDark {
  background-color: rgb(51, 51, 51);
  color: white;
}

.inputLight {
  background-color: rgb(216, 216, 216);
  color: black;
}

input:focus {
  outline: 2px solid tomato;
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
