/// <reference types="cypress" />

describe("Delete Recipe", () => {
  const recipe = {
    title: "Updated Recipe",
    description: "This is a test recipe",
    ingredients: ["Ingredient 1", "Ingredient 2"],
    instructions: ["Step 1", "Step 2"],
    image: "https://example.com/image.jpg",
    nutrition: {
      calories: 200,
      protein: 10,
      fat: 5,
      carbs: 30,
    },
    category: "Dessert",
    time: 30,
    difficulty: "Fácil",
    tips: ["Updated Tip 1", "Updated Tip 2"]
  };

  const user = {
    name: "TestUser",
    email: "testuser@example.com",
    password: "S4f3_p@ssw0rd",
  };

  before(() => {
    // Log in before running the tests
    cy.visit("/login");
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('button[type="submit"]').click();
    // cy.on("window:alert", (str) => {
    //   expect(str).to.equal("Logged in successfully");
    // });
    cy.wait(500);
    cy.window().then((win) => {
      cy.request({
        method: "POST",
        url: "/api/auth/login",
        body: {
          email: user.email,
          password: user.password,
        },
      }).then((response) => {
        const token = response.body.token;
        win.localStorage.setItem("authToken", token);
        win.localStorage.setItem("userName", user.name);
      });
    });
  });

  it("should delete the recipe", () => {
    cy.visit("/");
    cy.get('input[placeholder="Buscar por título..."]').type(recipe.title);
    // Click the search button
    cy.get('button').contains('Buscar').click();
    cy.wait(1000); // Espera para asegurar que la alerta sea manejada
    cy.contains(recipe.title).click();
    cy.wait(1000); // Espera para asegurar que la alerta sea manejada
    cy.contains("Eliminar Receta").click();
    cy.on("window:confirm", () => true); // Confirm the deletion
    cy.wait(1000); // Espera para asegurar que la alerta sea manejada
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Receta eliminada exitosamente");
    });
    // cy.visit("/"); // Verifica que la receta ya no esté en la lista
    // cy.contains(recipe.title).should("not.exist");
  });
});
