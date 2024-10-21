/// <reference types="cypress" />

describe('Delete Recipe', () => {
    const recipe = {
      title: 'Updated Recipe',
      description: 'This is a test recipe',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      instructions: ['Step 1', 'Step 2'],
      image: 'https://example.com/image.jpg',
      nutrition: {
        calories: 200,
        protein: 10,
        fat: 5,
        carbs: 30,
      },
      category: 'Dessert',
      time: 30,
      difficulty: 'Fácil'
    };
  
    const user = {
      name: 'TestUser',
      email: 'testuser@example.com',
      password: 'password123'
    };
  
    before(() => {
      // Log in before running the tests
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
    });

    it('should update the recipe', () => {
        cy.visit('/');
        cy.contains(recipe.title).click();
        //   cy.contains('Eliminar Receta').click();
        cy.contains('Eliminar Receta').click();
        cy.on('window:confirm', () => true); // Confirm the deletion
        cy.on('window:alert', (str) => {
        expect(str).to.equal('Receta eliminada exitosamente');
        });
        cy.visit('/'); // Adjust the URL to match your application's URL
        cy.contains(recipe.title).should('not.exist'); // Verify the recipe is no longer in the list
    });
  });