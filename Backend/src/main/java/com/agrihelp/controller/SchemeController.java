package com.agrihelp.controller;

import com.agrihelp.model.Scheme;
import com.agrihelp.service.SchemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schemes")
public class SchemeController {

    @Autowired
    private SchemeService schemeService;

    // Save a scheme
    @PostMapping("/save")
    public Scheme saveScheme(@RequestBody Scheme scheme) {
        return schemeService.addScheme(scheme);
    }

    // Get all schemes
    @GetMapping("/all")
    public List<Scheme> getAllSchemes() {
        return schemeService.getAllSchemes();
    }
}
