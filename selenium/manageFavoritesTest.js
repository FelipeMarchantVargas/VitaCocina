const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function manageFavoritesTest() {
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

    // Navegar a la página principal y seleccionar una receta
    // await driver.get('http://localhost:3000/');
    await driver.findElement(By.css('input[placeholder="Buscar por título..."]')).sendKeys('test recipe');
    await driver.sleep(500); // Espera 2 segundos (2000 milisegundos).
    await driver.findElement(By.name('buscar')).click();
    await driver.sleep(500); // Espera 2 segundos (2000 milisegundos).

    await driver.wait(until.elementLocated(By.css('.recipe-card')), 10000);
    await driver.sleep(2000); // Espera 2 segundos (2000 milisegundos).

    // Agregar a Favoritos
    await driver.findElement(By.css('button.add-to-favorites')).click();

    // Verificar que la receta se ha agregado a la lista de favoritos
    await driver.get('http://localhost:3000/user/favorites');
    await driver.wait(until.elementLocated(By.linkText('Test Recipe')), 10000);

    // Eliminar de Favoritos
    await driver.findElement(By.linkText('Test Recipe')).click();
    await driver.findElement(By.css('button.remove-from-favorites')).click();

    // Verificar que la receta se ha eliminado de la lista de favoritos
    await driver.get('http://localhost:3000/user/favorites');
    let isRecipePresent = await driver.findElements(By.linkText('Test Recipe')).then(elements => elements.length > 0);
    if (isRecipePresent) {
      throw new Error('Recipe is still present in favorites');
    }

  } finally {
    await driver.quit();
  }
})();