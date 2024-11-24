const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function searchRecipeWithFiltersTest() {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
  try {
    // Navegar a la página principal
    await driver.get('http://localhost:3000/');

    // Ingresar los filtros de búsqueda
    // await driver.findElement(By.css('input[placeholder="Buscar por título..."]')).sendKeys('test recipe');
    await driver.findElement(By.css('input[placeholder="Máx Calorías"]')).sendKeys('200');
    await driver.findElement(By.css('input[placeholder="Mín Proteínas"]')).sendKeys('10');
    await driver.findElement(By.css('input[placeholder="Máx Grasa"]')).sendKeys('5');
    await driver.findElement(By.css('input[placeholder="Máx Carbohidratos"]')).sendKeys('30');
    await driver.findElement(By.css('button.search-button')).click();

    // Verificar los resultados de búsqueda
    await driver.wait(until.elementLocated(By.css('h1')), 10000);
    let recipeTitle = await driver.findElement(By.css('h1')).getText();
    console.log(recipeTitle);
  } finally {
    await driver.quit();
  }
})();