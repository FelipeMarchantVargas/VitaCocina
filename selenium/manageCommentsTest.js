const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function manageCommentsTest() {
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

    // Navegar a la página principal
    await driver.get('http://localhost:3000/');

    // Seleccionar una receta
    await driver.wait(until.elementLocated(By.linkText('Test Recipe')), 10000);
    await driver.findElement(By.linkText('Test Recipe')).click();

    // Agregar un comentario
    await driver.wait(until.elementLocated(By.name('comment')), 10000);
    await driver.findElement(By.name('comment')).sendKeys('Este es un comentario de prueba');
    await driver.findElement(By.css('button.add-comment')).click();

    // Verificar que el comentario se ha agregado correctamente
    await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Este es un comentario de prueba')]")), 10000);

    // Eliminar el comentario
    await driver.findElement(By.xpath("//*[contains(text(), 'Eliminar Comentario')]")).click();

    // Verificar que el comentario se ha eliminado correctamente
    let isCommentPresent = await driver.findElements(By.xpath("//*[contains(text(), 'Este es un comentario de prueba')]")).then(elements => elements.length > 0);
    if (isCommentPresent) {
      throw new Error('Comment is still present');
    }

  } finally {
    await driver.quit();
  }
})();