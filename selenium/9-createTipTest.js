const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function createTipTest() {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
  try {
    const user = {
      email: "testuser@example.com",
      password: "S4f3_p@ssw0rd",
    };

    const tip = {
      title: "Nuevo Tip",
      content: "Este es el contenido del nuevo tip",
    };

    // Iniciar sesión
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

    // Navegar a la página de tips
    await driver.get('http://localhost:3000/tips');
    await driver.sleep(1000); // Esperar para asegurar que la página se cargue

    // Crear un nuevo tip
    await driver.findElement(By.name('title')).sendKeys(tip.title);
    await driver.findElement(By.name('content')).sendKeys(tip.content);
    const boton = await driver.findElement(By.css('button[type="submit"]'))
    await driver.executeScript("arguments[0].scrollIntoView(true);", boton);
    await driver.sleep(500); // Espera para asegurar que el desplazamiento se complete
    await boton.click();
    await driver.sleep(500); // Espera para asegurar que el desplazamiento se complete

    // Esperar a que aparezca el mensaje de éxito
    await driver.wait(until.alertIsPresent(), 10000);
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    console.log(alertText);
    await driver.sleep(2000); // Espera para asegurar que el desplazamiento se complete
    await alert.accept();
    await driver.sleep(2000); // Espera para asegurar que el desplazamiento se complete

    // Verificar que el nuevo tip se ha agregado correctamente
    const newTip = await driver.findElement(By.xpath(`//*[contains(text(), '${tip.title}')]`));
    if (!newTip) {
      throw new Error('New tip not found');
    }

  } finally {
    await driver.quit();
  }
})();