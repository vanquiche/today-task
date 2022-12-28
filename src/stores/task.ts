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
      completed: false,
      task: newTask.value.trim(),
      createdAt: dt.now().toISO(),
      position: tasks.value.length,
    };

    tasks.value.push(task);
    newTask.value = "";
  }

  function moveTask(copyTask: TaskType) {
    // copy task, update date
    const copiedTask: TaskType = {
      ...copyTask,
      completed: false,
      createdAt: dt.now().toISO(),
      position: tasks.value.length,
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
    // then trim positions of tasks
    tasks.value = tasks.value
      .filter((t) => t.id !== task.id)
      .map((t) => {
        if (t.position > task.position) {
          return { ...t, position: t.position - 1 };
        } else return t;
      });
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
    daysWithTasks,
    addTask,
    moveTask,
    updateEdit,
    deleteTask,
    inputEditTask,
    updatePosition,
    toggleComplete,
  };
});
