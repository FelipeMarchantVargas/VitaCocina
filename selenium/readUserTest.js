const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

(async function readUserTest() {
  let driver = await new Builder().forBrowser("chrome").setChromeOptions(new chrome.Options()).build();

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

    // Esperar a que aparezca el mensaje de alerta
    await driver.wait(until.alertIsPresent(), 10000);
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    console.log(alertText);
    await alert.accept();

    // Verificar que el token se ha almacenado correctamente
    const token = await driver.executeScript("return localStorage.getItem('authToken');");
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    // // Navegar a la página de perfil de usuario
    // await driver.get("http://localhost:3000/user");

    // // Esperar hasta que el texto del usuario esté visible
    // const userNameElement = await driver.wait(
    //   until.elementLocated(By.xpath(`//*[contains(text(), '${user.name}')]`)),
    //   15000 // Incrementa el tiempo de espera máximo
    // );

    // // Verificar que el elemento esté visible
    // const isDisplayed = await userNameElement.isDisplayed();
    // if (!isDisplayed) {
    //   throw new Error("User name is not displayed");
    // }

    // console.log("User name is displayed correctly");

  } catch (error) {
    console.error("Test failed:", error.message);
  } finally {
    await driver.quit();
  }
})();
