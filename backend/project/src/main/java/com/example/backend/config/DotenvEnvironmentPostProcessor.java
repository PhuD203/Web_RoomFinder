package com.example.backend.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.EnvironmentPostProcessor;
import org.springframework.boot.SpringApplication;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

public class DotenvEnvironmentPostProcessor
        implements EnvironmentPostProcessor {

    @Override
    public void postProcessEnvironment(
            ConfigurableEnvironment environment,
            SpringApplication application) {

        String userDir = System.getProperty("user.dir");

        Path envPath = Paths.get(userDir, "backend", "project", ".env");

        System.out.println(">>> USER DIR: " + userDir);
        System.out.println(">>> ENV PATH: " + envPath);
        System.out.println(">>> ENV EXISTS: " + Files.exists(envPath));

        Dotenv dotenv = Dotenv.configure()
                .directory(envPath.getParent().toString())
                .filename(".env")
                .ignoreIfMissing()
                .load();

        Map<String, Object> properties = new HashMap<>();

        dotenv.entries().forEach(entry -> {
            properties.put(entry.getKey(), entry.getValue());
        });

        environment.getPropertySources().addFirst(
                new MapPropertySource("dotenv", properties));

        System.out.println(
                ">>> SERVER_PORT FROM ENV: "
                        + properties.get("SERVER_PORT"));
    }
}