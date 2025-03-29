# backend/Dockerfile

# Usa la imagen base de Node.js
FROM node:18

# Crea el directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto
EXPOSE 5000

# Comando por defecto para iniciar el backend
CMD ["node", "server.js"]
