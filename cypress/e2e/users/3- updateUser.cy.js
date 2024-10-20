/// <reference types="cypress" />

describe('Update User', () => {
    it('should update the user profile', () => {
      cy.visit('/login');
      cy.get('input[name="email"]').type('testuser@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.visit('/user');
      cy.get('input[name="name"]').clear().type('UpdatedUser');
      cy.get('button[type="submit"]').contains('Actualizar Perfil').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Perfil actualizado con éxito');
      });
    });
  });