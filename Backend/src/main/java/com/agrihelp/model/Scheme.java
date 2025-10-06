package com.agrihelp.model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "schemes")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Scheme {

    @Id
    private String id;

    private String name;
    private String description;
    private String eligibility;
    private String benefits;
    private String region;       // Added field for region-specific queries
    private boolean isActive;    // Added field to track active/inactive schemes
    private LocalDate lastUpdated; // Scheme-specific update

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
