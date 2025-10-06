package com.agrihelp.service;

import com.agrihelp.model.SHC;
import com.agrihelp.repository.SHCRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SHCService {

    @Autowired
    private SHCRepository shcRepo;

    public SHC save(SHC shc) {
        return shcRepo.save(shc);
    }

    public List<SHC> getByUser(String userId) {
        return shcRepo.findByUserId(userId);
    }
}
