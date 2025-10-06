package com.agrihelp.repository;

import com.agrihelp.model.Scheme;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SchemeRepository extends MongoRepository<Scheme, String> {
    
    // Find schemes by region (case-insensitive)
    List<Scheme> findByRegionIgnoreCase(String region);
    
    // Find only active schemes
    List<Scheme> findByIsActiveTrue();
}
