package com.agrihelp.service;

import com.agrihelp.model.FertilizerRecommendation;
import com.agrihelp.model.SoilData;
import com.agrihelp.repository.FertilizerRecommendationRepository;
import com.agrihelp.repository.SoilDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FertilizerService {

    @Autowired
    private FertilizerRecommendationRepository fertilizerRepository;

    @Autowired
    private SoilDataRepository soilDataRepository;

    /**
     * Save fertilizer recommendation (admin/extension officer use)
     */
    public FertilizerRecommendation saveRecommendation(FertilizerRecommendation recommendation) {
        return fertilizerRepository.save(recommendation);
    }

    /**
     * Get fertilizer recommendations for a crop (without soil data)
     */
    public List<FertilizerRecommendation> getGeneralRecommendations(String cropName) {
        return fertilizerRepository.findByCropNameIgnoreCase(cropName);
    }

    /**
     * Get fertilizer recommendation based on crop + soil data (accurate mode)
     */
    public FertilizerRecommendation getFertilizerWithSoilData(String cropName, String fieldName) {
        Optional<SoilData> soilOpt = soilDataRepository.findByFieldNameIgnoreCase(fieldName);

        if (soilOpt.isEmpty()) {
            List<FertilizerRecommendation> general = fertilizerRepository.findByCropNameIgnoreCase(cropName);
            return general.isEmpty() ? null : general.get(0);
        }

        SoilData soil = soilOpt.get();

        String notes = "";
        if (soil.getNitrogen() < 200) notes += "Nitrogen is low; use Urea/DAP.\n";
        if (soil.getPhosphorus() < 20) notes += "Phosphorus is low; add SSP/DAP.\n";
        if (soil.getPotassium() < 150) notes += "Potassium is low; add MOP.\n";
        if (soil.getPh() < 5.5) notes += "Soil is acidic; apply lime.\n";
        if (soil.getPh() > 8.0) notes += "Soil is alkaline; use gypsum.\n";

        return FertilizerRecommendation.builder()
                .cropName(cropName) // match model field
                .soilType(soil.getSoilType())
                .recommendation(notes.isEmpty() ? "Balanced nutrients" : notes)
                .whatToLookFor("Soil nutrient status")
                .safetyNotes("Apply according to recommended dosage")
                .build();
    }

    /**
     * Get all fertilizer recommendations (admin view)
     */
    public List<FertilizerRecommendation> getAllRecommendations() {
        return fertilizerRepository.findAll();
    }
}
