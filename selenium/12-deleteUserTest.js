const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function deleteUserTest() {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
  try {
    const user = {
      // name: "TestUser",
      name: "UpdatedUser",
      email: "testuser@example.com",
      password: "S4f3_p@ssw0rd",
    };

        // Verificar que el usuario puede iniciar sesión después de registrarse
    await driver.get('http://localhost:3000/login');
    await driver.findElement(By.name('email')).sendKeys(user.email);
    await driver.findElement(By.name('password')).sendKeys(user.password);
    await driver.findElement(By.name('login')).click();

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

    // Navegar a la página de perfil de usuario
    await driver.get('http://localhost:3000/user');

    // Esperar a que el botón de eliminar cuenta esté presente
    await driver.wait(until.elementLocated(By.css('button.delete-button')), 10000);

    // Hacer clic en el botón de eliminar cuenta
    await driver.findElement(By.css('button.delete-button')).click();

    // Esperar a que aparezca el mensaje de confirmación
    await driver.wait(until.alertIsPresent(), 10000);
    const alert = await driver.switchTo().alert();
    console.log(await alert.getText());
    await alert.accept();
  } finally {
    await driver.quit();
  }
})();