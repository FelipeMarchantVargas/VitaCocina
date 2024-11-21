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
      name: "b",
      email: "b@b",
      password: "b",
    };

    // Log in before running the tests
    await driver.get('http://localhost:3000/login');
    await driver.findElement(By.name('email')).sendKeys(user.email);
    await driver.findElement(By.name('password')).sendKeys(user.password);
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Esperar a que aparezca el mensaje de éxito
    await driver.wait(until.alertIsPresent(), 10000);
    let alert = await driver.switchTo().alert();
    let alertText = await alert.getText();
    console.log(alertText);
    await alert.accept();

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