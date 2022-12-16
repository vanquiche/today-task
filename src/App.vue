<script setup lang="ts">
import { onMounted, ref, provide } from "vue";
import TaskDisplay from "@/components/TaskDisplay.vue";
import TaskForm from "@/components/TaskForm.vue";
import { useTaskStore } from "@/stores/task";
const taskStore = useTaskStore();
const darkTheme = ref(true);

provide("theme", darkTheme);

onMounted(() => {
  const storage = localStorage.getItem("todayTask");
  if (storage) {
    taskStore.tasks = JSON.parse(storage);
  }
});
</script>

<template>
  <div class="container" :class="[darkTheme ? 'blackGrid' : 'whiteGrid']">
    <div class="switchContainer">
      <input
        type="checkbox"
        id="theme"
        name="theme"
        class="switch"
        :class="[darkTheme ? 'left' : 'right']"
        v-model="darkTheme"
      />
    </div>
    <h1>Today Task</h1>
    <TaskForm :dark-theme="darkTheme" />
    <TaskDisplay />
  </div>
</template>

<style scoped>
.container {
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  min-height: 100%;
  height: fit-content;
  transition: background-color 250ms ease-out;
  outline: 1px solid red;
}

.switchContainer {
  width: 35px;
  outline: 1px solid red;
  position: relative;
  height: 20px;
}

.switch {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: left 100ms ease-out;
  height: 25px;
  width: 25px;
}

.left {
  left: 0;
}

.right {
  left: 100%;
}
.whiteGrid {
  background-image: radial-gradient(
    circle at 1px 1px,
    rgba(0, 0, 0, 0.3) 1px,
    transparent 0
  );
  background-color: white;
  background-size: 35px 35px;
  color: black;
}
.blackGrid {
  background-image: radial-gradient(
    circle at 1px 1px,
    rgba(255, 255, 255, 0.3) 1px,
    transparent 0
  );
  background-color: black;
  background-size: 35px 35px;
  color: white;
}
</style>
