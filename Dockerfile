FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copiamos todo el proyecto directamente
COPY . .

# Compilamos usando la versión oficial y moderna de Maven
RUN mvn clean package -DskipTests

# Etapa final para ejecutar la aplicación
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]