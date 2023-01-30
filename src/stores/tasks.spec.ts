import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useTaskStore } from "@/stores/task";
import { DateTime, type WeekdayNumbers } from "luxon";

describe("Task Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("adds new task", () => {
    const taskStore = useTaskStore();
    taskStore.addTask("new task");
    expect(taskStore.tasks.length).toBe(1);
  });

  it("edit/update task", () => {
    const taskStore = useTaskStore();
    taskStore.addTask("new task");
    taskStore.updateEdit(taskStore.tasks[0].id, "edited task");
    expect(taskStore.tasks[0].task).toBe("edited task");
  });

  it("delete task", () => {
    const taskStore = useTaskStore();
    taskStore.addTask("new task");
    taskStore.deleteTask(taskStore.tasks[0]);
    expect(taskStore.tasks.length).toBe(0);
  });

  it("complete task", () => {
    const taskStore = useTaskStore();
    taskStore.addTask("completed task");
    taskStore.toggleComplete(taskStore.tasks[0].id);
    expect(taskStore.tasks[0].completed).toBe(true);
  });

  it("update position", () => {
    const taskStore = useTaskStore();
    ["1", "2", "3", "4", "5"].forEach((task) => {
      taskStore.addTask(task);
    });
    taskStore.updatePosition(taskStore.tasks[0], taskStore.tasks[3]);
    expect(taskStore.tasks[0].position).toBe(4);
  });

  it("move old task to current date i.e update createdAt value to today", () => {
    const dt = DateTime;
    const taskStore = useTaskStore();
    taskStore.addTask("Old Task", dt.now().minus({ days: 2 }).toISO());
    taskStore.addTask("Latest Task");
    taskStore.moveTask(taskStore.tasks[0]);
    expect(dt.fromISO(taskStore.tasks[0].createdAt).weekday).toBe(
      dt.fromISO(taskStore.tasks[1].createdAt).weekday
    );
  });

  it("get days/dates with tasks", () => {
    const taskStore = useTaskStore();
    const testDates: WeekdayNumbers[] = [];
    const dt = DateTime;
    [...Array(3)].forEach((_, i) => {
      const date = dt.now().minus({ days: i });
      taskStore.addTask(`Task ${i}`, date.toISO());
      testDates.push(date.weekday);
    });
    expect(taskStore.daysWithTasks).toStrictEqual(
      testDates.sort((a, b) => b - a)
    );
  });
});
