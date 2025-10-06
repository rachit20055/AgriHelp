package com.agrihelp.repository;

import com.agrihelp.model.WeatherCache;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface WeatherCacheRepository extends MongoRepository<WeatherCache, String> {
    Optional<WeatherCache> findTopByCityOrderByCachedAtDesc(String city);

}
