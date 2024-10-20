/// <reference types="cypress" />

describe('Read User', () => {
  it('should log in the user and display profile', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Logged in successfully');
    });
    // cy.visit('/user');
    // cy.contains('TestUser');
  });
});