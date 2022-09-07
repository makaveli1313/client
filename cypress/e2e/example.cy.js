// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.contains("div", "TODO List:");
  });
});

describe("Add todo item", () => {
  it("adds a todo item", () => {
    cy.visit("/");
    cy.get("input").type("Test Todo Item").type("{enter}");
    cy.contains("div", "Test Todo Item");
  });
});
