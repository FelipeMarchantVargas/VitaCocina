module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // Ignorar excepciones no manejadas
      on("uncaught:exception", (err, runnable) => {
        // Devuelve false para evitar que Cypress falle en excepciones no manejadas
        return false;
      });

      // Aquí puedes implementar otros listeners de eventos
    },
    baseUrl: "http://localhost:3000", // Cambia esto a la URL base de tu aplicación
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
};
