// SHCRepository.java
package com.agrihelp.repository;

import com.agrihelp.model.SHC;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface SHCRepository extends MongoRepository<SHC, String> {
    List<SHC> findByUserId(String userId);
}
