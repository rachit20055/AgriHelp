package com.agrihelp.repository;

import com.agrihelp.model.MarketPriceCache;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface MarketPriceCacheRepository extends MongoRepository<MarketPriceCache, String> {

    List<MarketPriceCache> findByCommodityIgnoreCaseAndStateIgnoreCase(String commodity, String state);

    Optional<MarketPriceCache> findTopByCommodityIgnoreCaseAndStateIgnoreCaseOrderByLastUpdatedDesc(
            String commodity,
            String state
    );
}
