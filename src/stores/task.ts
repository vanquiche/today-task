import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import type { TaskType } from "@/types";
import { DateTime } from "luxon";

import createId from "@/utility/createId";

const dt = DateTime;

export const useTaskStore = defineStore("tasks", () => {
  // STATE
  const tasks = ref<TaskType[]>([]);
  const newTask = ref("");
  const editTask = ref("");

  function addTask() {
    if (!newTask.value) return;
    const task: TaskType = {
      id: createId(),
      createdAt: dt.now().toISO(),
      task: newTask.value.trim(),
      completed: false,
    };

    tasks.value.unshift(task);
    newTask.value = "";
  }

  function moveTask(copyTask: TaskType) {
    console.log("moving...");

    // copy task, update date
    const copiedTask: TaskType = {
      ...copyTask,
      createdAt: dt.now().toISO(),
      completed: false,
    };

    // move copied task to beginning of list
    tasks.value = [
      copiedTask,
      ...tasks.value.filter((t) => t.id !== copyTask.id),
    ];
  }

  function toggleComplete(id: string) {
    const index = tasks.value.findIndex((t) => t.id === id);
    tasks.value[index].completed = !tasks.value[index].completed;
  }

  function deleteTask(id: string) {
    tasks.value = tasks.value.filter((t) => t.id !== id);
  }

  function inputEditTask(e: Event) {
    const el = e.target as HTMLInputElement;
    editTask.value = el.value;
  }

  function updateEdit(id: string) {
    if (editTask.value === "") return;
    else {
      const index = tasks.value.findIndex((t) => t.id === id);
      tasks.value[index].task = editTask.value;
      editTask.value = "";
    }
  }

  // GETTERS
  const getTodayTasks = computed(() =>
    tasks.value.filter(
      (t) =>
        dt.fromISO(t.createdAt).day === dt.now().day &&
        dt.fromISO(t.createdAt).weekNumber === dt.now().weekNumber
    )
  );

  const daysWithTasks = computed(() => {
    const days = new Set<DateTime["weekday"]>();
    days.add(dt.now().weekday);
    tasks.value.forEach((t) => {
      const day = dt.fromISO(t.createdAt).weekday;
      days.add(day);
    });
    // order date from newest to oldes
    // i.e. [5, 3, 2]
    return Array.from(days);
  });

  watch(
    tasks,
    (newTasks: TaskType[]) => {
      const currentWeek = newTasks.filter(
        (t) => dt.fromISO(t.createdAt).weekNumber === dt.now().weekNumber
      );
      localStorage.setItem("todayTask", JSON.stringify(currentWeek));
    },
    { deep: true }
  );

  return {
    tasks,
    newTask,
    editTask,
    getTodayTasks,
    daysWithTasks,
    inputEditTask,
    updateEdit,
    moveTask,
    addTask,
    deleteTask,
    toggleComplete,
  };
});
