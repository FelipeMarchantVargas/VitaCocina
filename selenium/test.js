const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
  try {
    // Navegar a la página de inicio de sesión
    await driver.get('http://localhost:3000/login');

    // Esperar a que los campos de entrada estén presentes
    await driver.wait(until.elementLocated(By.name('email')), 10000);
    await driver.wait(until.elementLocated(By.name('password')), 10000);

    // Ingresar el correo electrónico y la contraseña
    await driver.findElement(By.name('email')).sendKeys('b@b');
    await driver.findElement(By.name('password')).sendKeys('b');
    // await driver.findElement(By.name('email')).sendKeys('testuser@example.com');
    // await driver.findElement(By.name('password')).sendKeys('S4f3_p@ssw0rd');

    // Esperar a que el botón de inicio de sesión esté presente y hacer clic en él
    const loginButton = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 10000);
    await driver.wait(until.elementIsVisible(loginButton), 10000);
    await loginButton.click();

    // Esperar a que aparezca el mensaje de éxito
    await driver.wait(until.alertIsPresent(), 10000);
    let alert = await driver.switchTo().alert();
    let alertText = await alert.getText();
    console.log(alertText);
    await alert.accept();

    // Verificar que el usuario ha iniciado sesión correctamente
    await driver.wait(until.urlIs('http://localhost:3000/'), 10000);
  } finally {
    await driver.quit();
  }
})();