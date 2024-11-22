const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function manageRatingsTest() {
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

    // Navegar a la página de detalles de una receta
    await driver.get('http://localhost:3000/recipes/1'); // Cambia el ID de la receta según sea necesario

    // Agregar una valoración
    await driver.findElement(By.name('rating')).sendKeys('5');
    await driver.findElement(By.css('button.add-rating')).click();

    // Verificar que la valoración se ha agregado correctamente
    await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), '5 estrellas')]")), 10000);

    // Eliminar la valoración
    await driver.findElement(By.xpath("//*[contains(text(), 'Eliminar Valoración')]")).click();

    // Verificar que la valoración se ha eliminado correctamente
    let isRatingPresent = await driver.findElements(By.xpath("//*[contains(text(), '5 estrellas')]")).then(elements => elements.length > 0);
    if (isRatingPresent) {
      throw new Error('Rating is still present');
    }

  } finally {
    await driver.quit();
  }
})();