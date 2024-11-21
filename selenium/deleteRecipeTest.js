const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function deleteRecipeTest() {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
  try {
    // Navegar a la página de inicio de sesión
    await driver.get('http://localhost:3000/login');

    // Ingresar el correo electrónico y la contraseña
    await driver.findElement(By.name('email')).sendKeys('testuser@example.com');
    await driver.findElement(By.name('password')).sendKeys('S4f3_p@ssw0rd');
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Esperar a que aparezca el mensaje de éxito
    await driver.wait(until.alertIsPresent(), 10000);
    let alert = await driver.switchTo().alert();
    await alert.accept();

    // Navegar a la página principal y seleccionar una receta
    await driver.get('http://localhost:3000/');
    await driver.findElement(By.linkText('Test Recipe')).click();

    // Hacer clic en "Eliminar Receta"
    await driver.findElement(By.css('button.delete-recipe')).click();

    // Confirmar la eliminación
    await driver.wait(until.alertIsPresent(), 10000);
    alert = await driver.switchTo().alert();
    console.log(await alert.getText());
    await alert.accept();
  } finally {
    await driver.quit();
  }
})();