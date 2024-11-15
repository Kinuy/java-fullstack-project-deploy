# change setting here
FROM openjdk:23

EXPOSE 8080

COPY backend/target/app.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]