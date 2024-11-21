const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function readUserTest() {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
  try {
    const user = {
      name: 'TestUser',
      email: 'testuser@example.com',
      password: 'S4f3_p@ssw0rd'
    };

    // Navegar a la página de inicio de sesión
    await driver.get('http://localhost:3000/login');

    // Ingresar el correo electrónico y la contraseña
    await driver.findElement(By.name('email')).sendKeys(user.email);
    await driver.findElement(By.name('password')).sendKeys(user.password);
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Esperar a que aparezca el mensaje de éxito
    await driver.wait(until.alertIsPresent(), 10000);
    let alert = await driver.switchTo().alert();
    let alertText = await alert.getText();
    console.log(alertText);
    await alert.accept();

    // Verificar que el token se ha almacenado correctamente
    const token = await driver.executeScript("return localStorage.getItem('authToken');");
    if (!token) {
      throw new Error('Token not found in localStorage');
    }

    // Navegar a la página de perfil de usuario
    await driver.get('http://localhost:3000/user');
    await driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), '${user.name}')]`)), 10000);

  } finally {
    await driver.quit();
  }
})();