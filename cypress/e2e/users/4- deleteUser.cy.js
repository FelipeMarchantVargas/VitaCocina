/// <reference types="cypress" />

describe('Delete User', () => {
    it('should delete the user account', () => {
      cy.visit('/login');
      cy.get('input[name="email"]').type('testuser@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.visit('/user');
      cy.get('button.delete-button').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Cuenta eliminada con éxito');
      });
    });
  });