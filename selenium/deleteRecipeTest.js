const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function deleteRecipeTest() {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
  try {
    const user = {
      name: "TestUser",
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

    // Navegar a la página principal y seleccionar una receta
    await driver.get('http://localhost:3000/');
    await driver.findElement(By.linkText('Updated Recipe')).click();

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