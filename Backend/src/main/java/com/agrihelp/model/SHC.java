// SHC.java
package com.agrihelp.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "shc")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SHC {

    @Id
    private String id;

    private String userId;
    private double ph;
    private double nitrogen;
    private double phosphorus;
    private double potassium;
}
