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
  };

  const user = {
    name: "aa",
    email: "aa@aa.aa",
    password: "aa",
  };
  // const user = {
  //   name: 'TestUser',
  //   email: 'testuser@example.com',
  //   password: 'S4f3_p@ssw0rd'
  // };

  before(() => {
    // Log in before running the tests
    cy.visit("/login");
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('button[type="submit"]').click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Logged in successfully");
    });
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
    cy.contains(recipe.title).click();
    //   cy.contains('Eliminar Receta').click();
    cy.window().then((win) => {
      cy.spy(win.console, "log").as("log");
    });
    cy.contains("Eliminar Receta").click();
    cy.on("window:confirm", () => true); // Confirm the deletion
    cy.get("@log").should("be.calledWith", "Receta eliminada exitosamente");
    cy.visit("/"); // Adjust the URL to match your application's URL
    cy.contains(recipe.title).should("not.exist"); // Verify the recipe is no longer in the list
  });
});
