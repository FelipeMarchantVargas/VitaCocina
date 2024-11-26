const { exec } = require("child_process");

const scripts = [
  "1-createUserTest.js",
  "2-readUserTest.js",
  "3-createRecipeTest.js",
  "4-readRecipeTest.js",
  "5-filterRecipeTest.js",
  "6-manageFavoritesTest.js",
  "7-manageCommentsTest.js",
  "8-manageRatingsTest.js",
  "9-createTipTest.js",
  "10-manageFavoriteTipsTest.js",
  "11-updateRecipeTest.js",
  "12-deleteRecipeTest.js",
  "13-updateUserTest.js",
  "14-deleteUserTest.js",
];

(async () => {
  for (const script of scripts) {
    console.log(`Ejecutando: ${script}`);
    await new Promise((resolve, reject) => {
      exec(`node ${script}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error ejecutando ${script}:`, stderr);
          reject(error);
        } else {
          console.log(stdout);
          resolve();
        }
      });
    });
  }
  console.log("Todos los scripts ejecutados.");
})();
