const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function manageCommentsTest() {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
  try {
    const user = {
      name: "TestUser",
      email: "testuser@example.com",
      password: "S4f3_p@ssw0rd",
    };

    // Navegar a la página de inicio de sesión
    await driver.get("http://localhost:3000/login");

    // Ingresar el correo electrónico y la contraseña
    await driver.findElement(By.name("email")).sendKeys(user.email);
    await driver.findElement(By.name("password")).sendKeys(user.password);
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Esperar a que la alerta esté presente y aceptarla si aparece
    try {
      await driver.wait(until.alertIsPresent(), 5000);
      const alert = await driver.switchTo().alert();
      const alertText = await alert.getText();
      console.log("Texto de la alerta:", alertText);
      await alert.accept();
    } catch (error) {
      console.error("No se detectó ninguna alerta:", error.message);
    }

    // Verificar que el token se ha almacenado correctamente
    await driver.sleep(1000); // Esperar un momento para asegurarse de que el token se almacene
    const token = await driver.executeScript("return localStorage.getItem('authToken');");
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

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