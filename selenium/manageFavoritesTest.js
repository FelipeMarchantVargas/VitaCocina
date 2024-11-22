const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function manageFavoritesTest() {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
  try {
    const user = {
      email: 'testuser@example.com',
      password: 'S4f3_p@ssw0rd'
    };

    // Iniciar sesión
    await driver.get('http://localhost:3000/login');
    await driver.findElement(By.name('email')).sendKeys(user.email);
    await driver.findElement(By.name('password')).sendKeys(user.password);
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Esperar a que aparezca el mensaje de éxito
    await driver.wait(until.alertIsPresent(), 10000);
    let alert = await driver.switchTo().alert();
    await alert.accept();

    // Navegar a la página principal y seleccionar una receta
    await driver.get('http://localhost:3000/');
    await driver.findElement(By.linkText('Test Recipe')).click();

    // Agregar a Favoritos
    await driver.findElement(By.css('button.add-to-favorites')).click();

    // Verificar que la receta se ha agregado a la lista de favoritos
    await driver.get('http://localhost:3000/user/favorites');
    await driver.wait(until.elementLocated(By.linkText('Test Recipe')), 10000);

    // Eliminar de Favoritos
    await driver.findElement(By.linkText('Test Recipe')).click();
    await driver.findElement(By.css('button.remove-from-favorites')).click();

    // Verificar que la receta se ha eliminado de la lista de favoritos
    await driver.get('http://localhost:3000/user/favorites');
    let isRecipePresent = await driver.findElements(By.linkText('Test Recipe')).then(elements => elements.length > 0);
    if (isRecipePresent) {
      throw new Error('Recipe is still present in favorites');
    }

  } finally {
    await driver.quit();
  }
})();