package com.agrihelp.controller;

import com.agrihelp.model.WeatherData;
import com.agrihelp.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @GetMapping("/ping")
    public String ping() {
        return "Backend is alive!";
    }



    // Get weather by city name
    @GetMapping("/{city}")
    public WeatherData getWeather(@PathVariable String city) {
        return weatherService.getWeatherByCity(city);
    }
}
