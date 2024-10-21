# README

## Alcances de la herramienta

Esta herramienta está diseñada para gestionar recetas saludables, permitiendo a los usuarios crear, editar, eliminar y buscar recetas. Además, los usuarios pueden registrarse, iniciar sesión y gestionar su perfil. La herramienta incluye tanto un frontend desarrollado en React como un backend desarrollado en Node.js con Express y MongoDB.

## Descripción del trabajo realizado

### Proyecto

El proyecto consiste en una aplicación web completa para la gestión de recetas. Incluye las siguientes funcionalidades:

- **Frontend**: Desarrollado en React, permite a los usuarios interactuar con la aplicación a través de una interfaz gráfica. Las principales características incluyen:
  - Registro e inicio de sesión de usuarios.
  - Creación, edición y eliminación de recetas.
  - Búsqueda y visualización de recetas.
  - Gestión del perfil de usuario.

- **Backend**: Desarrollado en Node.js con Express y MongoDB, maneja la lógica del servidor y la persistencia de datos. Las principales características incluyen:
  - Autenticación y autorización de usuarios.
  - CRUD (Crear, Leer, Actualizar, Eliminar) de recetas.
  - Gestión de comentarios y valoraciones de recetas.

### Especificar dependencias entre la herramienta y la aplicación

- **Frontend**:
  - React
  - React Router DOM
  - Axios

- **Backend**:
  - Express
  - Mongoose
  - Bcryptjs
  - Jsonwebtoken
  - Cors

- **Pruebas**:
  - Cypress

## Pruebas

### Estrategia de pruebas utilizadas

Se utilizó Cypress para realizar pruebas end-to-end (E2E) de la aplicación. Las pruebas E2E verifican que la aplicación funcione correctamente desde la perspectiva del usuario final, interactuando con la interfaz de usuario y verificando que las funcionalidades clave funcionen como se espera.

### Procedimiento de ejecución de pruebas

1. **Configuración**:
   - Asegúrate de que el servidor backend esté en funcionamiento, ejecutando el comando `npm start`.
   - Inicia el servidor frontend con `npm run start`.

2. **Ejecución de pruebas**:
   - Abre Cypress con el comando `npx cypress open`.
   - Selecciona el archivo de prueba que deseas ejecutar (por ejemplo, `3-updateRecipe.cy.js`).
   - Cypress abrirá una ventana del navegador y ejecutará las pruebas automáticamente.

### Reporte de resultados

- **Prueba de creación de usuario**:
  - **Descripción**: Verifica que un usuario pueda registrarse correctamente.
  - **Pasos**:
    1. Visitar la página de registro.
    2. Ingresar el nombre, correo electrónico y contraseña.
    3. Hacer clic en el botón de registro.
  - **Resultado esperado**: El usuario se registra correctamente y se muestra un mensaje de éxito.

- **Prueba de inicio de sesión**:
  - **Descripción**: Verifica que un usuario pueda iniciar sesión correctamente.
  - **Pasos**:
    1. Visitar la página de inicio de sesión.
    2. Ingresar el correo electrónico y la contraseña.
    3. Hacer clic en el botón de inicio de sesión.
  - **Resultado esperado**: El usuario inicia sesión correctamente y se muestra un mensaje de éxito.

- **Prueba de búsqueda de receta**:
  - **Descripción**: Verifica que un usuario pueda buscar una receta por título y ver los resultados.
  - **Pasos**:
    1. Visitar la página principal.
    2. Ingresar el título de la receta en la barra de búsqueda.
    3. Hacer clic en el botón de búsqueda.
  - **Resultado esperado**: La receta buscada se muestra en los resultados de búsqueda.

- **Prueba de creación de receta**:
  - **Descripción**: Verifica que un usuario pueda crear una nueva receta.
  - **Pasos**:
    1. Iniciar sesión con un usuario existente.
    2. Visitar la página de creación de recetas.
    3. Ingresar los detalles de la receta (título, descripción, ingredientes, instrucciones, imagen, nutrición, categoría, tiempo, dificultad).
    4. Hacer clic en el botón de guardar.
  - **Resultado esperado**: La receta se crea correctamente y se muestra un mensaje de éxito.

- **Prueba de actualización de receta**:
  - **Descripción**: Verifica que un usuario pueda iniciar sesión, editar una receta existente y guardar los cambios.
  - **Pasos**:
    1. Iniciar sesión con un usuario existente.
    2. Visitar la página principal y seleccionar una receta.
    3. Hacer clic en "Editar Receta".
    4. Modificar el título de la receta.
    5. Hacer clic en el botón de guardar cambios.
  - **Resultado esperado**: La receta se actualiza correctamente y se muestra un mensaje de éxito.

- **Prueba de eliminación de receta**:
  - **Descripción**: Verifica que un usuario pueda eliminar una receta existente.
  - **Pasos**:
    1. Iniciar sesión con un usuario existente.
    2. Visitar la página principal y seleccionar una receta.
    3. Hacer clic en "Eliminar Receta".
    4. Confirmar la eliminación.
  - **Resultado esperado**: La receta se elimina correctamente y se muestra un mensaje de éxito.

- **Prueba de actualización de perfil de usuario**:
  - **Descripción**: Verifica que un usuario pueda actualizar su perfil.
  - **Pasos**:
    1. Iniciar sesión con un usuario existente.
    2. Visitar la página de perfil de usuario.
    3. Modificar el nombre del usuario.
    4. Hacer clic en el botón de actualizar perfil.
  - **Resultado esperado**: El perfil del usuario se actualiza correctamente y se muestra un mensaje de éxito.

- **Prueba de eliminación de cuenta de usuario**:
  - **Descripción**: Verifica que un usuario pueda eliminar su cuenta.
  - **Pasos**:
    1. Iniciar sesión con un usuario existente.
    2. Visitar la página de perfil de usuario.
    3. Hacer clic en el botón de eliminar cuenta.
    4. Confirmar la eliminación.
  - **Resultado esperado**: La cuenta del usuario se elimina correctamente y se muestra un mensaje de éxito.




## Problemas encontrados y soluciones

Durante el desarrollo de este proyecto, el equipo enfrentó diversos desafíos, tanto en la implementación técnica como en la integración de las herramientas de testing automatizado. A pesar de que el flujo de trabajo general se mantuvo organizado gracias al uso de GitHub y la implementación de GitFlow para manejar branches y funciones de cada integrante, se presentaron problemas específicos al momento de integrar y utilizar la herramienta de testing seleccionada, Cypress. Estos problemas fueron abordados mediante diferentes estrategias, que detallamos a continuación:

- **Problema**: Confusión entre las alertas de inicio de sesión y actualización de receta en las pruebas de Cypress.
  - **Solución**: Separar las alertas y asegurarse de que se manejen en el orden correcto.

- **Problema**: Integración del campo "tips" en el modelo de receta y en todos los archivos pertinentes.
  - **Solución**: Actualizar el modelo de receta en el backend, los controladores, las rutas y los componentes del frontend para manejar el nuevo campo "tips". Esto ocurrio porque no 

- **Problema**: Estilos inconsistentes en los formularios de creación y edición de recetas.
  - **Solución**: Asegurarse de que los estilos CSS sean consistentes y que los nuevos campos estén correctamente estilizados.

