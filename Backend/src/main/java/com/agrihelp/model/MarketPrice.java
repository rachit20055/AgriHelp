package com.agrihelp.model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "market_prices")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MarketPrice {

    @Id
    private String id;

    private String commodity;
    private String state;
    private String district;
    private String market;
    private String variety;
    private String grade;

    private LocalDate arrivalDate;
    private double minPrice;
    private double maxPrice;
    private double modalPrice;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
