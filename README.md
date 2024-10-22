# README - Instalación y Ejecución del Proyecto

Este documento proporciona instrucciones detalladas para la instalación y ejecución del proyecto de gestión de recetas saludables. El proyecto consta de dos partes principales: el frontend desarrollado en React y el backend desarrollado en Node.js con Express y MongoDB.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes componentes en tu sistema:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) (versión 6 o superior)
- [MongoDB](https://www.mongodb.com/) (puede ser una instancia local o en la nube)

## Clonar el Repositorio

Primero, clona el repositorio del proyecto desde GitHub:

```bash
git clone https://github.com/equipo-6-VC/VitaCocina
cd VitaCocina
```
## Configuración del Backend
Navega al directorio del backend:
```bash
cd backend
```
Instala las dependencias:
```bash
npm install
```
Configura las variables de entorno:
Crea un archivo .env en el directorio backend y añade las siguientes variables de entorno:
```bash
PORT=5000
MONGO_URI=mongodb+srv://felipemarchantv:xg42ei2Qorq5ArwF@cluster0.9yy7i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2
```
Inicia el servidor backend:
```bash
npm start
```
El servidor backend debería estar corriendo en http://localhost:5000.

## Configuración del Frontend
Navega al directorio del frontend:
```bash
cd ../frontend
```
Instala las dependencias:
```bash
npm install
```
Inicia el servidor frontend:
```bash
npm run start
```
El servidor frontend debería estar corriendo en http://localhost:3000.

## Ejecución de Pruebas
Pruebas End-to-End (E2E) con Cypress
Navega al directorio del proyecto:
```bash
cd ../
```
Instala las dependencias:
```bash
npm install
```
Abre Cypress:
```bash
npx cypress open
```
Ejecuta las pruebas:
Selecciona el archivo de prueba que deseas ejecutar en la interfaz de Cypress.