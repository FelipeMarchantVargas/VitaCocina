const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function manageCommentsTest() {
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

    // Navegar a la página principal y buscar la receta
    await driver.findElement(By.css('input[placeholder="Buscar por título..."]')).sendKeys('test recipe');
    await driver.findElement(By.name('buscar')).click();
    await driver.sleep(1000); // Espera para asegurar que la búsqueda se complete

    // Seleccionar la receta desde los resultados de búsqueda
    await driver.wait(until.elementLocated(By.css('.recipe-card')), 10000).click();
    await driver.sleep(2000); // Espera para asegurar que la página de la receta se cargue

    // Agregar un comentario
    await driver.wait(until.elementLocated(By.name('comment')), 10000);
    await driver.findElement(By.name('comment')).sendKeys('Este es un comentario de prueba');
    const commentButton = await driver.findElement(By.name('botonComment'));
    await driver.executeScript("arguments[0].scrollIntoView(true);", commentButton);
    await driver.sleep(500); // Espera para asegurar que el desplazamiento se complete
    await commentButton.click();
    await driver.sleep(1000);

    // Verificar que el comentario se ha agregado correctamente
    await driver.wait(until.elementLocated(By.id("comment0"), 10000));

    // Desplazarse hasta el botón de eliminar comentario y hacer clic
    const deleteCommentButton = await driver.findElement(By.name("borrarComment0"));
    await driver.executeScript("arguments[0].scrollIntoView(true);", deleteCommentButton);
    await driver.sleep(500); // Espera para asegurar que el desplazamiento se complete
    await deleteCommentButton.click();
    await driver.sleep(500); // Espera 2 segundos (2000 milisegundos).
    
    // Confirmar la eliminación
    await driver.wait(until.alertIsPresent(), 10000);
    alert = await driver.switchTo().alert();
    console.log(await alert.getText());
    await driver.sleep(500); // Espera 2 segundos (2000 milisegundos).
    await alert.accept();
    await driver.sleep(500); // Espera 2 segundos (2000 milisegundos).
    await alert.accept();

    // Verificar que el comentario se ha eliminado correctamente
    let isCommentPresent = await driver.findElements(By.name("comment0")).then(elements => elements.length > 0);
    if (isCommentPresent) {
      throw new Error('Comment is still present');
    }

  } finally {
    await driver.quit();
  }
})();