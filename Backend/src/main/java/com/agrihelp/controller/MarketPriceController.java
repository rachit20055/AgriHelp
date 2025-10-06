package com.agrihelp.controller;

import com.agrihelp.model.MarketPriceCache;
import com.agrihelp.service.MarketPriceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/market")
@RequiredArgsConstructor
public class MarketPriceController {

    private final MarketPriceService marketPriceService;

    @GetMapping("/{commodity}/{state}")
    public List<MarketPriceCache> getMarketPrices(
            @PathVariable String commodity,
            @PathVariable String state
    ) {
        return marketPriceService.getMarketPrices(commodity, state);
    }

    @GetMapping("/ping")
    public String ping() {
        return "MarketPrice API is running ";
    }
}
