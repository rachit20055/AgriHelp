// SoilDataRepository.java
package com.agrihelp.repository;

import com.agrihelp.model.SoilData;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.*;


public interface SoilDataRepository extends MongoRepository<SoilData, String> {
    Optional<SoilData> findByFieldNameIgnoreCaseAndRegionIgnoreCase(String fieldName, String region);

    Optional<SoilData> findByFieldNameIgnoreCase(String fieldName);
    List<SoilData> findByRegionIgnoreCase(String region);
    List<SoilData> findByUserId(String userId);
}
