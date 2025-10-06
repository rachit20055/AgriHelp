package com.agrihelp.service;

import com.agrihelp.model.WeatherData;
import com.agrihelp.repository.WeatherDataRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

@Service
public class WeatherService {

    @Autowired
    private WeatherDataRepository weatherDataRepository;

    @Autowired
    private ApiRetryUtil apiRetryUtil;  // ✅ Retry utility

    // 🔑 Make sure you paste your real WeatherAPI key here
    private final String API_KEY = "acb0fa8e05524a7db00133736252109";
    private final String BASE_URL = "http://api.weatherapi.com/v1/current.json?key={API_KEY}&q={city}&aqi=no";

    private final ObjectMapper objectMapper = new ObjectMapper();
    private static final int CACHE_VALIDITY_MINUTES = 30;

    public WeatherData getWeatherByCity(String city) {
        // 1️⃣ Check cached weather
        Optional<WeatherData> cachedWeather = weatherDataRepository.findByCityIgnoreCase(city);

        if (cachedWeather.isPresent()) {
            WeatherData weather = cachedWeather.get();
            if (weather.getLastUpdated() != null &&
                    weather.getLastUpdated().isAfter(LocalDateTime.now().minusMinutes(CACHE_VALIDITY_MINUTES))) {
                return weather;
            }
        }

        // 2️⃣ Fetch from WeatherAPI
        RestTemplate restTemplate = new RestTemplate();
        try {
            String url = String.format(
                    "http://api.weatherapi.com/v1/current.json?key=%s&q=%s&aqi=no",
                    API_KEY,
                    city
            );

            String jsonResponse = restTemplate.getForObject(url, String.class);
            System.out.println("WeatherAPI raw response: " + jsonResponse);


            JsonNode root = objectMapper.readTree(jsonResponse);

            double temperature = root.path("current").path("temp_c").asDouble(0.0);
            double humidity = root.path("current").path("humidity").asDouble(0.0);
            String condition = root.path("current").path("condition").path("text").asText("Unknown");
            double windSpeed = root.path("current").path("wind_kph").asDouble(0.0);

            WeatherData newWeather = WeatherData.builder()
                    .city(city)
                    .temperature(temperature)
                    .humidity(humidity)
                    .condition(condition)
                    .windSpeed(windSpeed)
                    .lastUpdated(LocalDateTime.now())
                    .build();

            // ✅ Save if different from last cache
            if (cachedWeather.isEmpty() ||
                    !Objects.equals(cachedWeather.get().getTemperature(), newWeather.getTemperature()) ||
                    !Objects.equals(cachedWeather.get().getCondition(), newWeather.getCondition()) ||
                    !Objects.equals(cachedWeather.get().getWindSpeed(), newWeather.getWindSpeed())) {
                weatherDataRepository.save(newWeather);
            }

            return newWeather;

        } catch (Exception e) {
            e.printStackTrace();

            if (cachedWeather.isPresent()) {
                return cachedWeather.get();
            }

            return WeatherData.builder()
                    .city(city)
                    .temperature(0.0)
                    .humidity(0.0)
                    .condition("Unavailable")
                    .windSpeed(0.0)
                    .lastUpdated(LocalDateTime.now())
                    .build();
        }
    }
}
