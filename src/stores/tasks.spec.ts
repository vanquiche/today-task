import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useTaskStore } from "@/stores/task";
import { DateTime } from "luxon";
import type { TaskType } from "@/types";
import "@4tw/cypress-drag-drop";

describe("Task Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("adds new task", () => {
    const taskStore = useTaskStore();
    taskStore.newTask = "new task";
    taskStore.addTask();
    expect(taskStore.tasks.length).toBe(1);
  });

  it("edit/update task", () => {
    const taskStore = useTaskStore();
    taskStore.newTask = "new task";
    taskStore.addTask();
    taskStore.editTask = "edited task";
    taskStore.updateEdit(taskStore.tasks[0].id);
    expect(taskStore.tasks[0].task).toBe("edited task");
  });

  it("delete task", () => {
    const taskStore = useTaskStore();
    taskStore.newTask = "new task";
    taskStore.addTask();
    taskStore.deleteTask(taskStore.tasks[0]);
    expect(taskStore.tasks.length).toBe(0);
  });

  it("complete task", () => {
    const taskStore = useTaskStore();
    taskStore.newTask = "completed task";
    taskStore.addTask();
    taskStore.toggleComplete(taskStore.tasks[0].id);
    expect(taskStore.tasks[0].completed).toBe(true);
  });

  it("update position", () => {
    const taskStore = useTaskStore();
    ["1", "2", "3", "4", "5"].forEach((task) => {
      taskStore.newTask = task;
      taskStore.addTask();
    });
    taskStore.updatePosition(taskStore.tasks[0], taskStore.tasks[3]);
    expect(taskStore.tasks[0].position).toBe(4);
  });

  it("move old task to current date i.e update createdAt value to today", () => {
    const dt = DateTime;
    const taskStore = useTaskStore();
    const oldTask: TaskType = {
      id: "001",
      task: "Old Task",
      position: 0,
      completed: false,
      createdAt: dt.now().minus({ days: 2 }).toISO(),
    };
    taskStore.addTask(oldTask);
    taskStore.newTask = "Latest Task";
    taskStore.addTask();
    taskStore.moveTask(oldTask);
    expect(dt.fromISO(taskStore.tasks[0].createdAt).weekday).toBe(
      dt.fromISO(taskStore.tasks[1].createdAt).weekday
    );
  });

  it("get days/dates with tasks", () => {
    const taskStore = useTaskStore();
    const dt = DateTime;
    [...Array(3)].forEach((_, i) => {
      const task: TaskType = {
        id: i.toString(),
        position: i + 1,
        task: `Task ${i}`,
        completed: false,
        createdAt:
          i % 2 === 0 ? dt.now().toISO() : dt.now().minus({ days: i }).toISO(),
      };
      taskStore.addTask(task);
    });
    expect(taskStore.daysWithTasks).toStrictEqual([6, 5]);
  });
  xit("reposition task by drag and drop", () => {});
});
