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
      image: "https://i.redd.it/97yd9pkvfnlb1.jpg",
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
 

    // Crear una nueva receta
    await driver.get('http://localhost:3000/addRecipe');
    await driver.findElement(By.name('title')).sendKeys(recipe.title);
    await driver.findElement(By.id('description')).sendKeys(recipe.description);

    for (let i = 0; i < recipe.ingredients.length; i++) {
      if (i > 0) {
        await driver.sleep(1000);
        const boton1 = await driver.findElement(By.name("boton1"));
        await driver.executeScript("arguments[0].scrollIntoView(true);", boton1);
        await driver.sleep(1000); // Espera para asegurar que el desplazamiento se complete
        await boton1.click();
        await driver.sleep(1000); // Espera para asegurar que el desplazamiento se complete
      }
      console.log(recipe.ingredients[i]);
      await driver.findElement(By.name('ingredient'+(i))).sendKeys(recipe.ingredients[i]);
    }
    
    for (let i = 0; i < recipe.instructions.length; i++) {
      if (i > 0) {
        await driver.sleep(1000);
        const boton2 = await driver.findElement(By.name("boton2"));
        await driver.executeScript("arguments[0].scrollIntoView(true);", boton2);
        await driver.sleep(1000); // Espera para asegurar que el desplazamiento se complete
        await boton2.click();
        await driver.sleep(1000); // Espera para asegurar que el desplazamiento se complete
      }
      await driver.findElement(By.name('instructions'+(i))).sendKeys(recipe.instructions[i]);
    }
    await driver.findElement(By.name('image')).sendKeys(recipe.image);

    await driver.findElement(By.name('calories')).sendKeys(recipe.nutrition.calories.toString());
    await driver.findElement(By.name('protein')).sendKeys(recipe.nutrition.protein.toString());
    await driver.findElement(By.name('fat')).sendKeys(recipe.nutrition.fat.toString());
    await driver.findElement(By.name('carbs')).sendKeys(recipe.nutrition.carbs.toString());
    await driver.findElement(By.name('category')).sendKeys(recipe.category);
    await driver.findElement(By.name('time')).sendKeys(recipe.time.toString());
    await driver.findElement(By.name('difficulty')).sendKeys(recipe.difficulty);
    for (let i = 0; i < recipe.tips.length; i++) {
      if (i > 0) {
        await driver.sleep(1000);
        const boton3 = await driver.findElement(By.name("boton3"));
        await driver.executeScript("arguments[0].scrollIntoView(true);", boton3);
        await driver.sleep(1000); // Espera para asegurar que el desplazamiento se complete
        await boton3.click();
        await driver.sleep(1000); // Espera para asegurar que el desplazamiento se complete
      }
      await driver.findElement(By.name('tips'+i)).sendKeys(recipe.tips[i]);
    }
    await driver.sleep(1000);
    const aceptar = await driver.findElement(By.name("aceptar"));
    await driver.executeScript("arguments[0].scrollIntoView(true);", aceptar);
    await driver.sleep(500); // Espera para asegurar que el desplazamiento se complete
    await aceptar.click();
    await driver.sleep(500); // Espera para asegurar que el desplazamiento se complete

    // Esperar a que aparezca el mensaje de éxito
    await driver.wait(until.alertIsPresent(), 10000);
    alert = await driver.switchTo().alert();
    alertText = await alert.getText();
    console.log(alertText);
    await driver.sleep(2000); // Espera para asegurar que el desplazamiento se complete
    await alert.accept();
    await driver.sleep(2000); // Espera para asegurar que el desplazamiento se complete

  } finally {
    await driver.quit();
  }
})();