/// <reference types="cypress" />

describe('Update Recipe', () => {
    const recipe = {
      title: 'Test Recipe',
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
      password: 'S4f3_p@ssw0rd'
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
        win.localStorage.setItem('userName', user.name);
      });
    });
  
    it('should update the recipe', () => {
      cy.visit('/');
      cy.contains(recipe.title).click();
      cy.contains('Editar Receta').click();
      cy.get('input[name="title"]').clear().type('Updated Recipe');
      cy.get('button[type="submit"]').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Receta actualizada con éxito');
      });
    });
  });