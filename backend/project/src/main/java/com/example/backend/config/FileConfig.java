package com.example.backend.config;

import java.nio.file.Paths;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class FileConfig implements WebMvcConfigurer {

        @Override
        public void addResourceHandlers(
                        ResourceHandlerRegistry registry) {

                String imagePath = Paths.get(
                                System.getProperty("user.dir"),
                                "backend",
                                "project",
                                "images")
                                .toAbsolutePath()
                                .toString();

                System.out.println("THƯ MỤC IMAGE: " + imagePath);

                registry
                                .addResourceHandler("/images/**")
                                .addResourceLocations(
                                                "file:" + imagePath + "/");
        }
}