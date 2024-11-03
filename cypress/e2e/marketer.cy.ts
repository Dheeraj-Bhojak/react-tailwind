/// <reference types="cypress" />

describe("test le nding page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.viewport(1560, 768); // Set viewport to desktop size
    cy.title().should("eq", "QikGro");
  });
  it("Test navigation bars", () => {
    cy.get("nav").within(() => {
      cy.contains("For Brands").click();
    });
    cy.url().should("include", "/");
  });
  it('should navigate to the login page when "Sign In" is clicked', () => {
    cy.get("nav").contains("link").click();
    cy.url().should("include", "login");
  });
});
