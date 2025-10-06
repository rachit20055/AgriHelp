package com.agrihelp.model;

import lombok.*;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "crop_recommendations")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CropRecommendation {

    @Id
    private String id;

    private String soilType;           // Loamy, Sandy, Clay
    private String region;             // e.g., Uttar Pradesh, Bihar
    private String recommendedCrop;    // e.g., Wheat, Rice
    private String reason;             // Explanation of recommendation
    private boolean basedOnSoilData;   // true if matched with soil

    // ✅ Soil parameter ranges for recommendation
    private double minPh;
    private double maxPh;
    private double minNitrogen;
    private double maxNitrogen;
    private double minPhosphorus;
    private double maxPhosphorus;
    private double minPotassium;
    private double maxPotassium;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
