const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function manageFavoriteTipsTest() {
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

    // Agregar un tip a favoritos
    const favoriteButton = await driver.findElement(By.css('.tip-card button'));
    await driver.executeScript("arguments[0].scrollIntoView(true);", favoriteButton);
    await driver.sleep(500); // Espera para asegurar que el desplazamiento se complete
    await favoriteButton.click();
    await driver.sleep(1000); // Espera para asegurar que la acción se complete

    // Navegar a la página de favoritos
    await driver.get('http://localhost:3000/favorites');
    await driver.sleep(1000); // Espera para asegurar que la página se cargue
    
    // Verificar que hay tips en la página de favoritos
    let favoriteTips = await driver.findElements(By.css('.tip-card'));
    if (favoriteTips.length === 0) {
        throw new Error('No favorite tips found');
    }
    
    await driver.get('http://localhost:3000/tips');
    await driver.sleep(1000); // Espera para asegurar que la página se cargue

    // Quitar el tip de favoritos
    const unfavoriteButton = await driver.findElement(By.css('.tip-card button'));
    await driver.executeScript("arguments[0].scrollIntoView(true);", unfavoriteButton);
    await driver.sleep(500); // Espera para asegurar que el desplazamiento se complete
    await unfavoriteButton.click();
    await driver.sleep(1000); // Espera para asegurar que la acción se complete
    
    await driver.get('http://localhost:3000/favorites');
    await driver.sleep(1000); // Espera para asegurar que la página se cargue
    
    // Verificar que no hay tips en la página de favoritos
    favoriteTips = await driver.findElements(By.css('.tip-card'));
    if (favoriteTips.length > 0) {
      throw new Error('Favorite tips still found');
    }

  } finally {
    await driver.quit();
  }
})();