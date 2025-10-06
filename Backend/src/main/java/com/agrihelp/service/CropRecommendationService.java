package com.agrihelp.service;

import com.agrihelp.model.CropRecommendation;
import com.agrihelp.model.SoilData;
import com.agrihelp.repository.CropRecommendationRepository;
import com.agrihelp.repository.SoilDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CropRecommendationService {

    @Autowired
    private CropRecommendationRepository cropRepo;

    @Autowired
    private SoilDataRepository soilRepo;

    public CropRecommendation getRecommendation(String fieldName) {
        Optional<SoilData> soilOpt = soilRepo.findByFieldNameIgnoreCase(fieldName);

        if (soilOpt.isPresent()) {
            SoilData soil = soilOpt.get();

            // fetch all crops for soil type
            List<CropRecommendation> allCrops = cropRepo.findBySoilTypeIgnoreCase(soil.getSoilType());

            // filter by soil ranges
            List<CropRecommendation> matches = new ArrayList<>();
            for (CropRecommendation crop : allCrops) {
                if (soil.getPh() >= crop.getMinPh() && soil.getPh() <= crop.getMaxPh() &&
                        soil.getNitrogen() >= crop.getMinNitrogen() && soil.getNitrogen() <= crop.getMaxNitrogen() &&
                        soil.getPhosphorus() >= crop.getMinPhosphorus() && soil.getPhosphorus() <= crop.getMaxPhosphorus()) {

                    matches.add(crop);
                }
            }

            if (!matches.isEmpty()) {
                CropRecommendation rec = matches.get(0);
                rec.setBasedOnSoilData(true);
                rec.setReason("Based on soil data for field: " + fieldName);
                return rec;
            }

            return getByRegion(soil.getRegion());
        }

        // No soil data exists for this field
        CropRecommendation noData = new CropRecommendation();
        noData.setRecommendedCrop(null);
        noData.setBasedOnSoilData(false);
        noData.setReason("No soil data exists for field: " + fieldName);
        return noData;
    }

    // Region fallback
    public CropRecommendation getByRegion(String region) {
        List<CropRecommendation> list = cropRepo.findByRegionIgnoreCase(region);

        if (!list.isEmpty()) {
            CropRecommendation rec = list.get(0);
            rec.setBasedOnSoilData(false);
            rec.setReason("General recommendation for region: " + region);
            return rec;
        }

        return CropRecommendation.builder()
                .recommendedCrop("Wheat")
                .reason("Default fallback recommendation.")
                .basedOnSoilData(false)
                .build();
    }

    public CropRecommendation save(CropRecommendation recommendation) {
        return cropRepo.save(recommendation);
    }

    public List<CropRecommendation> getAll() {
        return cropRepo.findAll();
    }
}
