package com.agrihelp.repository;

import com.agrihelp.model.CropRecommendation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CropRecommendationRepository extends MongoRepository<CropRecommendation, String> {

    List<CropRecommendation> findBySoilTypeIgnoreCase(String soilType);

    List<CropRecommendation> findByRegionIgnoreCase(String region);

    // Optional: find by soilType and region together
    List<CropRecommendation> findBySoilTypeIgnoreCaseAndRegionIgnoreCase(String soilType, String region);
}
