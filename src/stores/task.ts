import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import type { TaskType } from "@/types";

// export const useTaskStore = defineStore("tasks", {
//   state: (): { tasks: TaskType[]; newTask: string; editTask: string } => ({
//     tasks: exampleTask,
//     newTask: "",
//     editTask: "",
//   }),
//   getters: {
//     getAllTasks(state) {
//       return state.tasks;
//     },
//   },
//   actions: {
//     addTask() {
//       if (!this.newTask) return;
//       const task: TaskType = {
//         id: Math.random().toString(),
//         date: new Date(),
//         task: this.newTask,
//         completed: false,
//       };
//       this.tasks.unshift(task);
//       this.newTask = "";
//     },
//     toggleComplete(id: string) {
//       const index = this.tasks.findIndex((t) => t.id === id);
//       this.tasks[index].completed = !this.tasks[index].completed;
//     },
//     deleteTask(id: string) {
//       this.tasks = this.tasks.filter((t) => t.id !== id);
//     },
//     inputEditTask(e: Event) {
//       const el = e.target as HTMLInputElement;
//       this.editTask = el.value;
//     },
//     updateEdit(id: string) {
//       if (this.editTask === "") return;
//       else {
//         const index = this.tasks.findIndex((t) => t.id === id);
//         this.tasks[index].task = this.editTask;
//         this.editTask = "";
//       }
//     },
//   },
// });

export const useTaskStore = defineStore("tasks", () => {
  // STATE
  const tasks = ref<TaskType[]>([]);
  const newTask = ref("");
  const editTask = ref("");

  function addTask() {
    if (!newTask.value) return;
    const task: TaskType = {
      id: Math.random().toString(),
      date: new Date(),
      task: newTask.value,
      completed: false,
    };

    tasks.value.unshift(task);
    newTask.value = "";
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
  const getAllTasks = computed(() => tasks.value);
  const inCompleteTasks = computed(() =>
    tasks.value.filter((t) => t.completed === false)
  );

  watch(
    tasks,
    (newTasks: TaskType[]) => {
      localStorage.setItem("todayTask", JSON.stringify(newTasks));
    },
    { deep: true }
  );

  return {
    tasks,
    newTask,
    editTask,
    getAllTasks,
    inputEditTask,
    updateEdit,
    addTask,
    deleteTask,
    toggleComplete,
    inCompleteTasks,
  };
});
