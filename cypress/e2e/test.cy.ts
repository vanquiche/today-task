// https://docs.cypress.io/api/introduction/api.html
import { darkTheme, lightTheme } from "../../src/components/themes";

describe("My First Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("visits the app root url", () => {
    cy.contains("h1", /today/i);
  });
  context("Task Actions", () => {
    it("Create new task", () => {
      cy.createTask("hello world");
      cy.contains("p", "hello world");
    });
    it("Delete task", () => {
      cy.createTask("foobar");
      cy.getChildEl("task-0", "deleteTask").click();
      cy.contains("p", "foobar").should("not.exist");
    });
    it("Edit task", () => {
      cy.createTask("Edt this");
      cy.getChildEl("task-0", "editTask").click();
      cy.focused().clear().type("Edit This").type("{enter}");
      cy.contains("p", "Edit This");
    });
    it("Reset edited task", () => {
      cy.createTask("Don't edit this");
      cy.getChildEl("task-0", "editTask").click();
      cy.focused().clear().type("fizzbuzz");
      cy.getChildEl("task-0", "resetTask").click();
      cy.contains("p", "Don't edit this");
    });
    it("Mark task as complete", () => {
      cy.createTask("Complete this task");
      cy.getChildEl("task-0", "toggleComplete").click();
      cy.contains("p", "Complete this task")
        .should("have.css", "text-decoration")
        .and("eq", `line-through solid ${darkTheme.color}`);
    });
    it("Toggle complete", () => {
      cy.createTask("Toggle completed task");
      cy.getChildEl("task-0", "toggleComplete").click().click();
      cy.contains("p", "Toggle completed task")
        .should("have.css", "text-decoration")
        .and("eq", `none solid ${darkTheme.color}`);
    });
    it("Filter incompleted tasks", () => {
      cy.createTask("Task 1");
      cy.createTask("Task 2");
      cy.createTask("Task 3");
      cy.getChildEl("task-1", "toggleComplete").click();
      cy.getByDataId("filterIncomplete").click();
      cy.contains("p", "Task 2").should("not.exist");
    });

    it("reorder tasks by drag and drop", () => {
      cy.createTask("task 1");
      cy.createTask("task 2");
      cy.createTask("task 3");
      cy.createTask("task 4");
      cy.get("[data-testid='task-3']").trigger("dragstart");
      cy.get("[data-testid='task-0']").trigger("dragover");
      cy.get("[data-testid='task-0']").trigger("dragend");

      cy.get("#taskContainer")
        .find("p")
        .first()
        .contains("p", "task 1")
        .should("exist");
    });
  });

  context("Theme", () => {
    it("Default theme is dark", () => {
      cy.get("#navbar")
        .should("have.css", "background-color")
        .and("eq", darkTheme.bgColor);
    });
    it("Toggle to light theme", () => {
      cy.get("[data-testid='themeToggle']").check();
      cy.get("#navbar")
        .should("have.css", "background-color")
        .and("eq", lightTheme.bgColor);
    });
    it("Can toggle between both themes", () => {
      cy.get("[data-testid='themeToggle']").check().uncheck();
      cy.get("#navbar")
        .should("have.css", "background-color")
        .and("eq", darkTheme.bgColor);
    });
  });

  context("Modal", () => {
    it("Open modal", () => {
      cy.getByDataId("aboutBtn").click();
      cy.getByDataId("modal").should("exist");
    });
    it("Open and closes modal", () => {
      cy.getByDataId("aboutBtn").click();
      cy.getByDataId("closeModal").click();
      cy.getByDataId("modal").should("not.exist");
    });
  });
});
