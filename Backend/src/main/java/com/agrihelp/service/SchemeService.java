package com.agrihelp.service;

import com.agrihelp.model.Scheme;
import com.agrihelp.repository.SchemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SchemeService {

    @Autowired
    private SchemeRepository schemeRepository;

    // Add a new scheme
    public Scheme addScheme(Scheme scheme) {
        return schemeRepository.save(scheme);
    }

    // Get all schemes
    public List<Scheme> getAllSchemes() {
        return schemeRepository.findAll();
    }

    // Get scheme by ID (optional)
    public Optional<Scheme> getSchemeById(String id) {
        return schemeRepository.findById(id);
    }

    // Delete a scheme (optional)
    public void deleteScheme(String id) {
        schemeRepository.deleteById(id);
    }
}
