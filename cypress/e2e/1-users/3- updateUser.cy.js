/// <reference types="cypress" />

describe('Update User', () => {
    const user = {
      name: 'TestUser',
      email: 'testuser@example.com',
      password: 'S4f3_p@ssw0rd'
    };

    it('should update the user profile', () => {
      cy.visit('/login');
      cy.get('input[name="email"]').type(user.email);
      cy.get('input[name="password"]').type(user.password);
      cy.get('button[type="submit"]').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Logged in successfully');
      });
      cy.window().then((win) => {
        // win.localStorage.setItem('authToken', 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2'); // Reemplaza 'your-auth-token' con el token real
        win.localStorage.setItem('userName', user.name);
      });
      cy.visit('/user');
      cy.get('input[name="name"]').clear().type('UpdatedUser');
      cy.get('button[type="submit"]').contains('Actualizar Perfil').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Perfil actualizado con éxito');
      });
    });
  });