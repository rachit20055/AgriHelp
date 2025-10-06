package com.agrihelp.model;

import lombok.*;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "soil_data")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SoilData {

    @Id
    private String id;

    private String userId;      // Link to farmer
    private String fieldName;   // Unique field name
    private String region;      // State/District
    private String soilType;    // Loamy, Sandy, Clay

    private double ph;
    private double nitrogen;
    private double phosphorus;
    private double potassium;
    private double moisture;    // ✅ Added to match frontend

    private LocalDate lastTested;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
