package com.agrihelp.service;

import com.agrihelp.model.MarketPriceCache;
import com.agrihelp.repository.MarketPriceCacheRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class MarketPriceService {

    private final MarketPriceCacheRepository cacheRepository;
    private final RestTemplate restTemplate;

    @Value("${marketplace.api.url}")
    private String apiUrl;

    private static final int CACHE_VALIDITY_MINUTES = 30;

    public List<MarketPriceCache> getMarketPrices(String commodity, String state) {
        List<MarketPriceCache> cached = cacheRepository.findByCommodityIgnoreCaseAndStateIgnoreCase(commodity, state);

        if (!cached.isEmpty() && cached.stream()
                .allMatch(c -> c.getLastUpdated() != null &&
                        c.getLastUpdated().isAfter(LocalDateTime.now().minusMinutes(CACHE_VALIDITY_MINUTES)))) {
            return cached;
        }

        try {
            Map<String, Object> response = restTemplate.getForObject(
                    apiUrl, Map.class, commodity, state
            );

            List<MarketPriceCache> fresh = parseApiResponse(response, commodity, state);

            if (!fresh.isEmpty()) {
                cacheRepository.saveAll(fresh);
                return fresh;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return cached; // fallback
    }

    @SuppressWarnings("unchecked")
    private List<MarketPriceCache> parseApiResponse(Object response, String commodity, String state) {
        List<MarketPriceCache> results = new ArrayList<>();

        if (!(response instanceof Map)) return results;

        Map<String, Object> map = (Map<String, Object>) response;

        if (map.containsKey("records")) {
            List<Map<String, Object>> records = (List<Map<String, Object>>) map.get("records");

            for (Map<String, Object> record : records) {
                try {
                    MarketPriceCache entry = MarketPriceCache.builder()
                            .commodity(commodity)
                            .state(state)
                            .district(String.valueOf(record.getOrDefault("district", "Unknown")))
                            .market(String.valueOf(record.getOrDefault("market", "Unknown")))
                            .variety(String.valueOf(record.getOrDefault("variety", "Unknown")))
                            .arrivalDate(parseDate(record.get("arrival_date")))
                            .minPrice(parseDouble(record.get("min_price")))
                            .maxPrice(parseDouble(record.get("max_price")))
                            .modalPrice(parseDouble(record.get("modal_price")))
                            .lastUpdated(LocalDateTime.now())
                            .build();

                    results.add(entry);
                } catch (Exception ignore) {
                }
            }
        }

        return results;
    }

    private Double parseDouble(Object value) {
        if (value == null) return 0.0;
        try {
            return Double.parseDouble(value.toString());
        } catch (Exception e) {
            return 0.0;
        }
    }

    private LocalDate parseDate(Object value) {
        try {
            return LocalDate.parse(String.valueOf(value));
        } catch (Exception e) {
            return LocalDate.now();
        }
    }
}
