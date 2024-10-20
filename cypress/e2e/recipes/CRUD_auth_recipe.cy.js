/// <reference types="cypress" />

describe('Add, Update, and Delete Recipe', () => {
  before(() => {
    // Intercept the login request
    cy.intercept('POST', '/api/auth/login').as('loginRequest'); // Adjust the URL to match your application's login API endpoint

    // Visit the login page
    cy.visit('http://localhost:3000/login'); // Adjust the URL to match your application's login URL

    // Enter login credentials
    cy.get('input[name="email"]').type('benja@mail.com'); // Use the email from your example.json
    cy.get('input[name="password"]').type('benja'); // Replace with the actual password

    // Submit the login form
    cy.get('button').contains('Login').click();

    // Wait for the login request and assert the response status code
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
  });

  it('should add, update, and delete a recipe', () => {
    // Navigate to the add recipe page
    cy.visit('http://localhost:3000/add'); // Adjust the URL to match your application's add recipe URL

    // Fill in the recipe form
    cy.get('input[name="title"]').type('Test Recipe');
    cy.get('input[name="ingredients"]').type('Ingredient 1, Ingredient 2');
    cy.get('input[name="nutrition"]').type('Calories: 200, Protein: 10g');
    cy.get('input[name="vegan"]').check();
    cy.get('textarea[name="instructions"]').type('Step 1: Do this. Step 2: Do that.');
    cy.get('textarea[name="tips"]').type('Tip 1: Use fresh ingredients.');

    // Submit the form
    cy.get('button').contains('Add Recipe').click();

    // Verify the recipe was added
    cy.contains('h1', 'Test Recipe').should('be.visible');

    // Navigate to the recipe list page
    cy.visit('http://localhost:3000/recipes'); // Adjust the URL to match your application's recipe list URL

    // Find the added recipe and click the edit button
    cy.contains('Test Recipe').parent().find('button').contains('Edit').click();

    // Update the recipe form
    cy.get('input[name="title"]').clear().type('Updated Test Recipe');
    cy.get('textarea[name="instructions"]').clear().type('Updated Step 1: Do this. Updated Step 2: Do that.');

    // Submit the form
    cy.get('button').contains('Save Changes').click();

    // Verify the recipe was updated
    cy.contains('h1', 'Updated Test Recipe').should('be.visible');

    // Navigate to the recipe list page
    cy.visit('http://localhost:3000/recipes'); // Adjust the URL to match your application's recipe list URL

    // Find the updated recipe and delete it
    cy.contains('Updated Test Recipe').parent().find('button').contains('Delete').click();

    // Verify the recipe was deleted
    cy.contains('Updated Test Recipe').should('not.exist');
  });
});