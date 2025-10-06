package com.agrihelp.repository;

import com.agrihelp.model.MarketPrice;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MarketPriceRepository extends MongoRepository<MarketPrice, String> {

    List<MarketPrice> findByCommodityIgnoreCase(String commodity);

    List<MarketPrice> findByStateIgnoreCase(String state);

    List<MarketPrice> findByCommodityIgnoreCaseAndStateIgnoreCase(String commodity, String state);

    Optional<MarketPrice> findTopByCommodityIgnoreCaseAndStateIgnoreCaseOrderByArrivalDateDesc(
            String commodity, String state);

    List<MarketPrice> findByArrivalDate(LocalDate date);
}
