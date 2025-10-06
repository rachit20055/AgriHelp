package com.agrihelp.service;

import com.agrihelp.model.SoilData;
import com.agrihelp.repository.SoilDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class SoilDataService {

    @Autowired
    private SoilDataRepository soilRepo;

    public SoilData saveOrUpdate(SoilData data) {
        Optional<SoilData> existing = soilRepo.findByFieldNameIgnoreCaseAndRegionIgnoreCase(
                data.getFieldName(), data.getRegion()
        );
        if (existing.isPresent()) {
            SoilData s = existing.get();
            s.setPh(data.getPh());
            s.setNitrogen(data.getNitrogen());
            s.setPhosphorus(data.getPhosphorus());
            s.setPotassium(data.getPotassium());
            s.setMoisture(data.getMoisture());
            s.setSoilType(data.getSoilType());
            return soilRepo.save(s);
        }
        return soilRepo.save(data);
    }



    public SoilData saveSoilData(SoilData soilData) {
        return soilRepo.save(soilData);
    }

    public Optional<SoilData> getByFieldName(String fieldName) {
        return soilRepo.findByFieldNameIgnoreCase(fieldName);
    }

    public List<SoilData> getByRegion(String region) {
        return soilRepo.findByRegionIgnoreCase(region);
    }

    public List<SoilData> getByUser(String userId) {
        return soilRepo.findByUserId(userId);
    }

    public List<SoilData> getAll() {
        return soilRepo.findAll();
    }

    public void delete(String id) {
        soilRepo.deleteById(id);
    }
}
