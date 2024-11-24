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
        cy.request({
          method: 'POST',
          url: '/api/auth/login',
          body: {
            email: user.email,
            password: user.password
          }
        }).then((response) => {
          const token = response.body.token;
          win.localStorage.setItem('authToken', token);
          win.localStorage.setItem('userName', user.name);
        });
      });
  
      // Verificar que el token se ha almacenado correctamente
      cy.window().its('localStorage.authToken').should('exist');
  
      cy.visit('/user');
      cy.get('input[name="name"]').clear().type('UpdatedUser');
      cy.get('button[type="submit"]').contains('Actualizar Perfil').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Perfil actualizado con éxito');
      });
    });
  });