package com.agrihelp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing  // Enables automatic handling of createdAt & updatedAt
public class AgriHelpApplication {

    public static void main(String[] args) {
        SpringApplication.run(AgriHelpApplication.class, args);
        System.out.println("🚀 AgriHelp Application Started Successfully!");
    }
}
