const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function createRecipeTest() {
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

    // Navegar a la página de inicio de sesión
    await driver.get("http://localhost:3000/login");

    // Ingresar el correo electrónico y la contraseña
    await driver.findElement(By.name("email")).sendKeys(user.email);
    await driver.findElement(By.name("password")).sendKeys(user.password);
    await driver.findElement(By.css('button[type="submit"]')).click();

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


    // Crear una nueva receta
    await driver.get('http://localhost:3000/addRecipe');
    await driver.findElement(By.name('title')).sendKeys(recipe.title);
    await driver.findElement(By.name('description')).sendKeys(recipe.description);
    for (let i = 0; i < recipe.ingredients.length; i++) {
      if (i > 0) {
        await driver.findElement(By.css("button:contains('Agregar ingrediente')")).click();
      }
      await driver.findElement(By.name('ingredient')).sendKeys(recipe.ingredients[i]);
    }
    for (let i = 0; i < recipe.instructions.length; i++) {
      if (i > 0) {
        await driver.findElement(By.css("button:contains('Agregar instrucción')")).click();
      }
      await driver.findElement(By.name('instructions')).sendKeys(recipe.instructions[i]);
    }
    await driver.findElement(By.name('image')).sendKeys(recipe.image);
    await driver.findElement(By.name('nutrition.calories')).sendKeys(recipe.nutrition.calories.toString());
    await driver.findElement(By.name('nutrition.protein')).sendKeys(recipe.nutrition.protein.toString());
    await driver.findElement(By.name('nutrition.fat')).sendKeys(recipe.nutrition.fat.toString());
    await driver.findElement(By.name('nutrition.carbs')).sendKeys(recipe.nutrition.carbs.toString());
    await driver.findElement(By.name('category')).sendKeys(recipe.category);
    await driver.findElement(By.name('time')).sendKeys(recipe.time.toString());
    await driver.findElement(By.name('difficulty')).sendKeys(recipe.difficulty);
    for (let i = 0; i < recipe.tips.length; i++) {
      if (i > 0) {
        await driver.findElement(By.css("button:contains('Agregar consejo')")).click();
      }
      await driver.findElement(By.name('tips')).sendKeys(recipe.tips[i]);
    }
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