package com.agrihelp.repository;

import com.agrihelp.model.FertilizerRecommendation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FertilizerRecommendationRepository extends MongoRepository<FertilizerRecommendation, String> {

    // Corrected to match model field 'cropName'
    List<FertilizerRecommendation> findByCropNameIgnoreCase(String cropName);
}
