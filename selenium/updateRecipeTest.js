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
      name: 'b',
      email: 'b@b',
      password: 'b'
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

    // Actualizar la receta
    await driver.get('http://localhost:3000/');
    await driver.findElement(By.xpath(`//*[contains(text(), '${recipe.title}')]`)).click();
    await driver.findElement(By.xpath(`//*[contains(text(), 'Editar Receta')]`)).click();
    await driver.findElement(By.name('title')).clear().sendKeys('Updated Recipe');
    await driver.findElement(By.name('tips')).clear().sendKeys('Updated Tip 1,Updated Tip 2');
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