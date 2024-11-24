const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function searchRecipeTest() {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
  try {
    // Navegar a la página principal
    await driver.get('http://localhost:3000/');

    // Ingresar el título de la receta en la barra de búsqueda
    await driver.findElement(By.css('input[placeholder="Buscar por título..."]')).sendKeys('test recipe');
    await driver.findElement(By.css('button.search-button')).click();

    // Verificar los resultados de búsqueda
    await driver.wait(until.elementLocated(By.css('.recipe-card h1')), 10000);
    let recipeTitle = await driver.findElement(By.css('.recipe-card h1')).getText();
    console.log(recipeTitle);
  } finally {
    await driver.quit();
  }
})();