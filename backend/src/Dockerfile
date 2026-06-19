#Dockerfile para la aplicacion de Spring Boot en multiples etapas de construccion.

#Construccion de la imagen
#En la primera etapa, se utiliza una imagen de Maven para compilar el proyecto. Se copia el archivo pom.xml y el directorio src al contenedor, y luego se ejecuta el comando mvn clean package para compilar el proyecto y generar el archivo JAR.
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app    
COPY pom.xml .
COPY src ./src

#compilamos el proyecto
#El flag -DskipTests se utiliza para omitir la ejecución de las pruebas durante la compilación, lo que puede acelerar el proceso de construcción de la imagen.
RUN mvn clean package -DskipTests

#ejecuciomn de la aplicacion
#En la segunda etapa, se utiliza una imagen de OpenJDK para ejecutar la aplicación. Se copia el archivo JAR generado en la etapa de construcción al contenedor, se expone el puerto 8080 y se define el comando de entrada para ejecutar la aplicación.
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar 
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
