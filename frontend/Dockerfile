#Construccion de la imagen
FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .


#Genera la carpeta /dist con los archivos necesarios para ejecutar la aplicacion
RUN npm run build

#servidor de produccion
FROM nginx:alpine

#copiamos configuracion nginx para SPA routing y proxy API
COPY nginx.conf /etc/nginx/conf.d/default.conf

#copiamos los estaticos al directorio que sirve nginx
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]