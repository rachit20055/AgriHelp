package com.agrihelp.service;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class ApiRetryUtil {

    /**
     * Simple retry wrapper around RestTemplate.getForObject.
     * Returns null only if all retries fail (caller should handle null).
     */
    public <T> T getForObjectWithRetry(RestTemplate restTemplate, String url, Class<T> responseType, Object... uriVariables) {
        int retries = 3;
        long delayMs = 1200L;

        for (int i = 0; i < retries; i++) {
            try {
                return restTemplate.getForObject(url, responseType, uriVariables);
            } catch (Exception ex) {
                if (i == retries - 1) {
                    throw new RuntimeException("API request failed after retries: " + ex.getMessage(), ex);
                }
                try {
                    Thread.sleep(delayMs);
                } catch (InterruptedException ignored) {}
            }
        }
        return null;
    }
}
