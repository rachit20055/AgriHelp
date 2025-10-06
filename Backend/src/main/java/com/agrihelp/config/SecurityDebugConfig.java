package com.agrihelp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
@EnableWebSecurity(debug = true) // ✅ turn on debug logging
public class SecurityDebugConfig {

    @Bean
    public SecurityFilterChain debugFilterChain(HttpSecurity http) throws Exception {
        // This just allows all requests for now
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());

        return http.build();
    }
}
