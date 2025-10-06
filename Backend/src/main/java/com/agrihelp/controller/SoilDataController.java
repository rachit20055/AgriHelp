package com.agrihelp.controller;

import com.agrihelp.model.SoilData;
import com.agrihelp.service.SoilDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/soil")
@CrossOrigin(origins = "http://localhost:5173") // ✅ Allow frontend
public class SoilDataController {

    @Autowired
    private SoilDataService soilService;

    // ✅ Changed mapping from /save to just POST /
    @PostMapping
    public SoilData save(@RequestBody SoilData soilData) {
        return soilService.saveSoilData(soilData);
    }

    @GetMapping("/{fieldName}")
    public SoilData getByField(@PathVariable String fieldName) {
        return soilService.getByFieldName(fieldName).orElse(null);
    }

    @GetMapping("/region/{region}")
    public List<SoilData> getByRegion(@PathVariable String region) {
        return soilService.getByRegion(region);
    }

    @GetMapping("/user/{userId}")
    public List<SoilData> getByUser(@PathVariable String userId) {
        return soilService.getByUser(userId);
    }

    @GetMapping("/all")
    public List<SoilData> getAll() {
        return soilService.getAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        soilService.delete(id);
    }
}
