/// <reference types="cypress" />

describe("LoginForm", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login"); // Assuming the login page is located at "http://localhost:3000/#/home/login"
  });

  it("displays the login form", () => {
    cy.title().should("eq", "QikGro"); // Check if the title is display correctly
    // cy.contains("QikGro").should("be.visible"); // Check if the nav bar logo display correctly
    cy.get("h1").should("contain", "Login"); // Check if the heading is displayed correctly
    cy.get("input[name='email']").should("be.visible"); // Check if the email input field is visible
    cy.get("input[name='password']").should("be.visible"); // Check if the password input field is visible
    cy.get("button[type='submit']").should("be.visible"); // Check if the submit button is visible
  });

  it("allows users to enter email and password", () => {
    const email = "test@example.com";
    const password = "test123";

    cy.get("input[name='email']").type(email); // Enter the email
    cy.get("input[name='password']").type(password); // Enter the password

    cy.get("input[name='email']").should("have.value", email); // Check if the email value is set correctly
    cy.get("input[name='password']").should("have.value", password); // Check if the password value is set correctly
  });

  it("should display an error message for an invalid email", () => {
    const invalidEmail = "invalidemail";
    const invalidPassword = "aaaaa";

    // Type an invalid email address into the input field
    cy.get('input[name="email"]').type(invalidEmail);
    cy.get('input[name="password"]').type(invalidPassword);
    cy.get("button[type='submit']").click();

    // Assert that the error message is displayed
    cy.get("span.text-red-500").should("be.visible").contains("Invalid email");
  });

  it("submits the form successfully with valid data", () => {
    const email = "test@example.com";
    const password = "Test123!";

    cy.get("input[name='email']").type(email); // Enter the email
    cy.get("input[name='password']").type(password); // Enter the password

    cy.get("button[type='submit']").click(); // Submit the form

    // Add assertions to check if the login is successful, such as checking for a redirect or a success message
  });

  it("should toggle password visibility when the toggle button is clicked", () => {
    // Type a password into the input field
    const password = "mysecretpassword";
    cy.get('input[name="password"]').type(password);

    // Assert that the password is hidden by default
    cy.get('input[name="password"]').should("have.attr", "type", "password");

    // Click the toggle button
    cy.get("div.passwordVisibility").click();

    // Assert that the password is visible after clicking the toggle button
    cy.get('input[name="password"]').should("have.attr", "type", "text");

    // Click the toggle button again
    cy.get("div.passwordVisibility").click();

    // Assert that the password is hidden again after clicking the toggle button
    cy.get('input[name="password"]').should("have.attr", "type", "password");
  });
});
