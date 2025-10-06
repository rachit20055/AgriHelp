package com.agrihelp.controller;

import com.agrihelp.model.CropRecommendation;
import com.agrihelp.service.CropRecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crops")
@CrossOrigin(origins = "http://localhost:5173") // frontend origin
public class CropRecommendationController {

    @Autowired
    private CropRecommendationService cropService;

    /**
     * Recommend crop by fieldName (uses soil data)
     */
    @GetMapping("/recommend/{fieldName}")
    public CropRecommendation recommend(@PathVariable String fieldName) {
        return cropService.getRecommendation(fieldName);
    }

    /**
     * Get region-based recommendation
     */
    @GetMapping("/region/{region}")
    public CropRecommendation getByRegion(@PathVariable String region) {
        return cropService.getByRegion(region);
    }

    /**
     * List all crop recommendations
     */
    @GetMapping("/all")
    public List<CropRecommendation> getAll() {
        return cropService.getAll();
    }
}
