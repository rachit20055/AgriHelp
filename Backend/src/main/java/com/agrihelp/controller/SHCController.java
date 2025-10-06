package com.agrihelp.controller;

import com.agrihelp.model.SHC;
import com.agrihelp.service.SHCService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/shc")
public class SHCController {

    @Autowired
    private SHCService shcService;

    @PostMapping("/add")
    public SHC addSHC(@RequestBody SHC shc) {
        return shcService.save(shc);
    }

    @GetMapping("/user/{userId}")
    public List<SHC> getUserSHC(@PathVariable String userId) {
        return shcService.getByUser(userId);
    }
}
