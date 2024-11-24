const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function updateRecipeTest() {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
  try {
    const recipe = {
      title: "Test Recipe",
      description: "This is a test recipe",
      ingredients: ["Ingredient 1", "Ingredient 2"],
      instructions: ["Step 1", "Step 2"],
      image: "https://example.com/image.jpg",
      nutrition: {
        calories: 200,
        protein: 10,
        fat: 5,
        carbs: 30,
      },
      category: "Dessert",
      time: 30,
      difficulty: "Fácil",
      tips: ["Hola!", "este es un ejemplo"],
    };

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

    // Actualizar la receta
    await driver.get('http://localhost:3000/');
    console.log(recipe.title);
    // Ingresar el título de la receta en la barra de búsqueda
    await driver.findElement(By.css('input[placeholder="Buscar por título..."]')).sendKeys('test recipe');
    await driver.sleep(500); // Espera 2 segundos (2000 milisegundos).
    await driver.findElement(By.name('buscar')).click();
    await driver.sleep(500); // Espera 2 segundos (2000 milisegundos).

    await driver.wait(until.elementLocated(By.css('.recipe-card')), 10000).click();
    await driver.sleep(2000); // Espera 2 segundos (2000 milisegundos).

    
    await driver.findElement(By.xpath(`//*[contains(text(), 'Editar Receta')]`)).click();
    await driver.sleep(2000); // Espera 2 segundos (2000 milisegundos).
    await driver.findElement(By.name('title')).clear();
    await driver.findElement(By.name('tips')).clear();
    await driver.sleep(750); // Espera 2 segundos (2000 milisegundos).
    await driver.findElement(By.name('title')).sendKeys('Updated Recipe');
    await driver.findElement(By.name('tips')).sendKeys('Updated Tip 1,Updated Tip 2');
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Esperar a que aparezca el mensaje de éxito
    await driver.wait(until.alertIsPresent(), 10000);
    alert = await driver.switchTo().alert();
    alertText = await alert.getText();
    console.log(alertText);
    await alert.accept();

  } finally {
    await driver.quit();
  }
})();