/// <reference types="cypress" />

describe('Read Recipe', () => {
    it('should read the recipe details', () => {
      cy.visit('/');
      cy.get('input[placeholder="Buscar por título..."]').type('test recipe');
  
      // Click the search button
      cy.get('button').contains('Buscar').click();
      cy.wait(1000); // Espera para asegurar que la alerta sea manejada
  
      // Verify the search results
      cy.contains('h1', "Test Recipe").should('be.visible');
    });
  });