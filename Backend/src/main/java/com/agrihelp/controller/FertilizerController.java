package com.agrihelp.controller;

import com.agrihelp.model.FertilizerRecommendation;
import com.agrihelp.service.FertilizerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fertilizer")
public class FertilizerController {

    @Autowired
    private FertilizerService fertilizerService;

    @GetMapping("/general/{crop}")
    public List<FertilizerRecommendation> getGeneralFertilizer(@PathVariable String crop) {
        return fertilizerService.getGeneralRecommendations(crop);
    }

    @GetMapping("/with-soil/{crop}/{fieldName}")
    public FertilizerRecommendation getFertilizerWithSoil(
            @PathVariable String crop,
            @PathVariable String fieldName
    ) {
        return fertilizerService.getFertilizerWithSoilData(crop, fieldName);
    }

    @PostMapping("/save")
    public FertilizerRecommendation saveRecommendation(@RequestBody FertilizerRecommendation recommendation) {
        return fertilizerService.saveRecommendation(recommendation);
    }

    @GetMapping("/all")
    public List<FertilizerRecommendation> getAllRecommendations() {
        return fertilizerService.getAllRecommendations();
    }
}
