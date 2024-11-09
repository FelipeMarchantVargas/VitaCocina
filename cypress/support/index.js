// cypress/support/index.js
Cypress.on("uncaught:exception", (err, runnable) => {
  // Regresa false para evitar que Cypress falle en excepciones no manejadas
  return false;
});
