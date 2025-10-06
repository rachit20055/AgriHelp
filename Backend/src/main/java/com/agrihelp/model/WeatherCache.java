package com.agrihelp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Map;

@Document(collection = "weather_cache")
public class WeatherCache {

    @Id
    private String id;

    private String city;
    private Map<String, Object> data; // Raw API response
    private LocalDateTime cachedAt;

    public WeatherCache() {}

    public WeatherCache(String city, Map<String, Object> data, LocalDateTime cachedAt) {
        this.city = city;
        this.data = data;
        this.cachedAt = cachedAt;
    }

    public String getId() {
        return id;
    }

    public String getCity() {
        return city;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public LocalDateTime getCachedAt() {
        return cachedAt;
    }
}
