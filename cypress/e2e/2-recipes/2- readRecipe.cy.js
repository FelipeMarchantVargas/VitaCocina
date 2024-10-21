/// <reference types="cypress" />

describe('Read Recipe', () => {
    it('should read the recipe details', () => {
      cy.visit('/');
    //   cy.contains('Test Recipe').click();
    //   cy.contains('This is a test recipe');
    //   cy.contains('Ingredient 1');
    //   cy.contains('Step 1');
      cy.get('input[placeholder="Buscar por título..."]').type('fideos con salsa');
  
      // Click the search button
      cy.get('button').contains('Buscar').click();
  
      // Verify the search results
      cy.contains('h1', 'Fideos con Salsa').should('be.visible');
      cy.contains('p', 'Receta clasica y facil de preparar').should('be.visible');
    });
  });