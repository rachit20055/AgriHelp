package com.agrihelp.model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "fertilizer_recommendations")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FertilizerRecommendation {

    @Id
    private String id;

    private String cropName;       // e.g., Wheat
    private String soilType;       // e.g., Loamy
    private String recommendation; // e.g., "Use NPK 10:26:26 before sowing"
    private String whatToLookFor;  // e.g., "High phosphorus content"
    private String safetyNotes;    // e.g., "Avoid excess nitrogen"

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
