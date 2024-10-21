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

- **Prueba de actualización de receta**:
  - Verifica que un usuario pueda iniciar sesión, editar una receta existente y guardar los cambios.
  - Resultado esperado: La receta se actualiza correctamente y se muestra un mensaje de éxito.

- **Prueba de eliminación de receta**:
  - Verifica que un usuario pueda eliminar una receta existente.
  - Resultado esperado: La receta se elimina correctamente y se muestra un mensaje de éxito.

- **Prueba de búsqueda de receta**:
  - Verifica que un usuario pueda buscar una receta por título y ver los resultados.
  - Resultado esperado: La receta buscada se muestra en los resultados de búsqueda.

## Problemas encontrados y soluciones

- **Problema**: Confusión entre las alertas de inicio de sesión y actualización de receta en las pruebas de Cypress.
  - **Solución**: Separar las alertas y asegurarse de que se manejen en el orden correcto.

- **Problema**: Integración del campo "tips" en el modelo de receta y en todos los archivos pertinentes.
  - **Solución**: Actualizar el modelo de receta en el backend, los controladores, las rutas y los componentes del frontend para manejar el nuevo campo "tips".

- **Problema**: Estilos inconsistentes en los formularios de creación y edición de recetas.
  - **Solución**: Asegurarse de que los estilos CSS sean consistentes y que los nuevos campos estén correctamente estilizados.