import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import type { TaskType } from "@/types";
import { DateTime } from "luxon";

import createId from "@/utility/createId";

const dt = DateTime;

export const useTaskStore = defineStore("tasks", () => {
  // STATE
  const tasks = ref<TaskType[]>([]);

  function addTask(addTask: string, date?: string) {
    if (!addTask) return;
    const lastPosition = Math.max(...tasks.value.map((t) => t.position), 0);
    const task: TaskType = {
      id: createId(),
      completed: false,
      task: addTask.trim(),
      createdAt: date ? date : dt.now().toISO(),
      position: lastPosition + 1,
    };

    tasks.value.push(task);
  }

  function moveTask(copyTask: TaskType) {
    // get the larget position in list
    const lastPosition = Math.max(...tasks.value.map((t) => t.position));
    // copy task, with first position and incomplete state
    const copiedTask: TaskType = {
      ...copyTask,
      completed: false,
      position: lastPosition + 1,
      createdAt: dt.now().toISO(),
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

  function deleteTask(task: TaskType) {
    // filter out task
    // then trim positions of tasks with positions lower than deleted task
    tasks.value = tasks.value
      .filter((t) => t.id !== task.id)
      .map((t) => {
        if (t.position > task.position) {
          return { ...t, position: t.position - 1 };
        } else return t;
      });
  }

  function updateEdit(id: string, editedTask: string) {
    if (!editedTask) return;
    const index = tasks.value.findIndex((t) => t.id === id);
    tasks.value[index].task = editedTask;
  }

  function updatePosition(start: TaskType, end: TaskType) {
    const moveDirection = start.position > end.position ? "back" : "forward";
    const rangeStart = Math.min(start.position, end.position);
    const rangeEnd = Math.max(start.position, end.position);
    // if tasks are next to each other swap task positions
    if (rangeEnd - rangeStart === 1) {
      tasks.value = tasks.value.map((t) => {
        if (t.id === start.id) {
          return { ...t, position: end.position };
        } else if (t.id === end.id) {
          return { ...t, position: start.position };
        } else return t;
      });
    } else {
      tasks.value = tasks.value.map((t) => {
        if (t.id === start.id) {
          return { ...t, position: end.position };
        } else if (t.position >= rangeStart && t.position <= rangeEnd) {
          return {
            ...t,
            position:
              moveDirection === "forward" ? t.position - 1 : t.position + 1,
          };
        } else return t;
      });
    }
  }

  // GETTERS
  const daysWithTasks = computed(() => {
    const days = new Set<DateTime["weekday"]>();
    days.add(dt.now().weekday);
    tasks.value.forEach((t) => {
      const day = dt.fromISO(t.createdAt).weekday;
      days.add(day);
    });
    // order date from newest to oldest i.e. [5, 3, 2]
    return Array.from(days).sort((a, b) => b - a);
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
    daysWithTasks,
    addTask,
    moveTask,
    updateEdit,
    deleteTask,
    updatePosition,
    toggleComplete,
  };
});
