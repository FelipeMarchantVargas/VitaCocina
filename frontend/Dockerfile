# frontend/Dockerfile

# Usa la imagen base de Node.js para construir React
FROM node:18 as build

# Crea el directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Construye la aplicación
RUN npm run build

# Usa Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos generados a Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copia la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 80
