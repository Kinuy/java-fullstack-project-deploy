# change setting here
FROM openjdk:23

EXPOSE 8080

COPY backend/target/make-it-app.jar make-it-app.jar

ENTRYPOINT ["java", "-jar", "make-it-app.jar"]