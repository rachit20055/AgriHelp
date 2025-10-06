package com.agrihelp.model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * WeatherData model represents weather information for a city,
 * with caching support for API fetch timestamps.
 */
@Document(collection = "weather_data")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WeatherData {

    @Id
    private String id;

    private String city;
    private double temperature;
    private double humidity;
    private String condition; // Sunny, Rainy, Cloudy
    private double windSpeed;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    private LocalDateTime lastUpdated; // ✅ Added for cache timestamp
}
