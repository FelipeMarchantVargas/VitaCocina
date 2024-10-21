/// <reference types="cypress" />

describe('Create Recipe', () => {
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
    });
  
    it('should create a new recipe', () => {
      cy.visit('/addRecipe');
      cy.get('input[name="title"]').type(recipe.title);
      cy.get('input[name="description"]').type(recipe.description);
      recipe.ingredients.forEach((ingredient, index) => {
        if (index > 0) {
          cy.get('button').contains('Agregar ingrediente').click();
        }
        cy.get(`input[name="ingredient"]`).eq(index).type(ingredient);
      });
      recipe.instructions.forEach((instruction, index) => {
        if (index > 0) {
          cy.get('button').contains('Agregar instrucción').click();
        }
        cy.get(`input[name="instructions"]`).eq(index).type(instruction);
      });
      cy.get('input[name="image"]').type(recipe.image);
      cy.get('input[name="calories"]').type(recipe.nutrition.calories.toString());
      cy.get('input[name="protein"]').type(recipe.nutrition.protein.toString());
      cy.get('input[name="fat"]').type(recipe.nutrition.fat.toString());
      cy.get('input[name="carbs"]').type(recipe.nutrition.carbs.toString());
      cy.get('input[name="category"]').type(recipe.category);
      cy.get('input[name="time"]').type(recipe.time.toString());
      cy.get('input[name="difficulty"]').type(recipe.difficulty);
      cy.get('button[type="submit"]').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Recipe added successfully!');
      });
    });
  });