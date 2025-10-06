package com.agrihelp.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/language")
public class LanguageController {

    // Dummy preference store (in production -> DB or user profile)
    private Map<String, String> languagePreferences = new HashMap<>();

    // Save language preference for a user
    @PostMapping("/set/{userId}/{lang}")
    public String setLanguage(@PathVariable String userId, @PathVariable String lang) {
        languagePreferences.put(userId, lang);
        return "Language set to " + lang + " for user " + userId;
    }

    // Get user language preference
    @GetMapping("/get/{userId}")
    public String getLanguage(@PathVariable String userId) {
        return languagePreferences.getOrDefault(userId, "en");
    }
}
