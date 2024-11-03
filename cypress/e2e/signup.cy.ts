/// <reference types = "cypress"/>

describe("registerForm", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/register"); //  the register ipage located at "localhost:3000/#/home/register"
  });

  it("displays the register form", () => {
    cy.title().should("eq", "QikGro"); // check title
    cy.contains("REGISTER").should("be.visible"); //login page heading
    cy.contains("Enter your information to register").should("be.visible"); //login contant is visible
    cy.get("input[name='first_name']").should("be.visible"); //input field for first name is visible
    cy.get("input[name='last_name']").should("be.visible"); // input feild for last name is visible
    cy.get("input[name='email']").should("be.visible"); // Check if the email input field is visible
    cy.get("input[name='password']").should("be.visible"); // Check if the email input field is visible
    cy.get("input[name='confirmPassword']").should("be.visible"); // Check if the email input field is visible
    cy.contains("Already have an Account ?").should("be.visible"); // Check if the email input field is visible
  });

  it("allows user to enter register details", () => {
    //seed test data
    const firstName = "jone";
    const lastName = "doe";
    const email = "jonedoe@gmail.com";
    const password = "Perfect9th";
    const confirmPassword = "Perfect9th";

    cy.get("input[name='first_name']").type(firstName); // enter fisrt name
    cy.get("input[name='last_name']").type(lastName); //enter last name
    cy.get("input[name='email']").type(email); //enter email
    cy.get("input[name='password']").type(password); //enter password
    cy.get("input[name='confirmPassword']").type(confirmPassword); //enter confrm password
  });
  // test to get error from input field with invalid first name
  it("should display an errors message for an invalid firstName format", () => {
    const invalidFirstName = "j";
    cy.get("input[name='first_name']").type(invalidFirstName);
    cy.get("button[type='submit']").click();
    cy.get("span.text-red-500")
      .should("be.visible")
      .contains("First name should contain at least 2 characters.");
  });
  // test to get error from input field with invalid first name
  it("should display an errors message for an invalid email format", () => {
    const invalidEmail = "frgvvfvfv";
    cy.get("input[name='email']").type(invalidEmail);
    cy.get("button[type='submit']").click();
    cy.get("span.text-red-500")
      .should("be.visible")
      .contains("Invalid Email format");
  });
  // test to get error from input field with invalid first name
  it("should display an errors message for an invalid email format", () => {
    const invalidPassword = "asdghjkl";
    cy.get("input[name='password']").type(invalidPassword);
    cy.get("button[type='submit']").click();
    cy.get("span.text-red-500")
      .should("be.visible")
      .contains(
        "Password should contain at least one Uppercase letter and one number."
      );
  });
  // test to get error from input field with invalid first name
  it("should display an errors message for an invalid email format", () => {
    const invalidPasswordLength = "A3Acc";
    cy.get("input[name='password']").type(invalidPasswordLength);
    cy.get("button[type='submit']").click();
    cy.get("span.text-red-500")
      .should("be.visible")
      .contains("Password should contain at least 8 characters");
  });
  // test to get error from input field with mismatch confirmPassword format
  it("should display an errors message for an mismatch confirmPassword format", () => {
    const invalidConfirmPassword = "A1123Acc";
    cy.get("input[name='confirmPassword']").type(invalidConfirmPassword);
    cy.get("button[type='submit']").click();
    cy.get("span.text-red-500")
      .should("be.visible")
      .contains("Password Not Matched");
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

  // navigate to login page

  it("should navigate to login page form", () => {
    cy.contains("login").click();
    cy.url().should("include", "/login");
  });
});
