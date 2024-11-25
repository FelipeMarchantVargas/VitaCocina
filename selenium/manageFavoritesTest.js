const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function manageFavoritesTest() {
  let driver = await new
   Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
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

    // Navegar a la página principal y buscar la receta
    await driver.findElement(By.css('input[placeholder="Buscar por título..."]')).sendKeys(recipe.title);
    await driver.sleep(500); // Espera para asegurar que la búsqueda se complete
    await driver.findElement(By.name('buscar')).click();
    await driver.sleep(500); // Espera para asegurar que los resultados se carguen

    // Seleccionar la receta desde los resultados de búsqueda
    await driver.wait(until.elementLocated(By.css('.recipe-card')), 10000);
    await driver.sleep(2000); // Espera para asegurar que la página de la receta se cargue

    // Agregar a Favoritos
    await driver.findElement(By.name('favorite')).click();
    await driver.sleep(1000); // Espera para asegurar que la acción se complete

    // Navegar a la página del carrito
    await driver.get('http://localhost:3000/cart');
    await driver.sleep(1000); // Espera para asegurar que la página se cargue

    // Verificar que hay elementos en el carrito
    let ingredients = await driver.findElements(By.css('.cart ul li'));
    if (ingredients.length === 0) {
      throw new Error('No ingredients found in cart');
    }

    // Navegar a la página de favoritos
    await driver.get('http://localhost:3000/favorites');
    await driver.sleep(1000); // Espera para asegurar que la página se cargue

    // Verificar que hay recetas en la página de favoritos
    let favoriteRecipes = await driver.findElements(By.css('.recipe-card'));
    if (favoriteRecipes.length === 0) {
      throw new Error('No favorite recipes found');
    }

    // Volver a la página principal y buscar la receta nuevamente
    await driver.get('http://localhost:3000/');
    await driver.findElement(By.css('input[placeholder="Buscar por título..."]')).sendKeys(recipe.title);
    await driver.sleep(500); // Espera para asegurar que la búsqueda se complete
    await driver.findElement(By.name('buscar')).click();
    await driver.sleep(500); // Espera para asegurar que los resultados se carguen

    // Seleccionar la receta desde los resultados de búsqueda
    await driver.wait(until.elementLocated(By.css('.recipe-card')), 10000);
    await driver.sleep(2000); // Espera para asegurar que la página de la receta se cargue

    // Quitar de Favoritos
    await driver.findElement(By.name('favorite')).click();
    await driver.sleep(1000); // Espera para asegurar que la acción se complete

    // Navegar a la página de favoritos nuevamente
    await driver.get('http://localhost:3000/favorites');
    await driver.sleep(1000); // Espera para asegurar que la página se cargue

    // Verificar que no hay recetas en la página de favoritos
    favoriteRecipes = await driver.findElements(By.css('.recipe-card'));
    if (favoriteRecipes.length > 0) {
      throw new Error('Favorite recipes still found');
    }

  } finally {
    await driver.quit();
  }
})();