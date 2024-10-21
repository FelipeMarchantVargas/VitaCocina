/// <reference types="cypress" />

describe('Recipe Search', () => {
    it('should search for "fideos con salsa" and display the results', () => {
      // Visit the application
      cy.visit('http://localhost:3000'); // Adjust the URL to match your application's URL
  
      // Enter the search query
      cy.get('input[placeholder="Buscar por título..."]').type('fideos con salsa');
  
      // Click the search button
      cy.get('button').contains('Buscar').click();
  
      // Verify the search results
      cy.contains('h1', 'Fideos con Salsa').should('be.visible');
      cy.contains('p', 'Receta clasica y facil de preparar').should('be.visible'); // Adjust the description text as needed
    });
  });