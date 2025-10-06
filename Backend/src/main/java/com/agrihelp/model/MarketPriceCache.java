package com.agrihelp.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "market_price_cache")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MarketPriceCache {

    @Id
    private String id;

    private String commodity;
    private String state;
    private String district;
    private String market;
    private String variety;

    private LocalDate arrivalDate;

    private Double minPrice;
    private Double maxPrice;
    private Double modalPrice;

    private LocalDateTime lastUpdated;
}
