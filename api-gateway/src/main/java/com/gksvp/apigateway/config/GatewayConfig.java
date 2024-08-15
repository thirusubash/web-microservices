package com.gksvp.apigateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.gksvp.apigateway.filters.FallbackFilter;
import com.gksvp.apigateway.filters.JwtRequestFilter;

@Configuration
public class GatewayConfig {

    @Bean
    public JwtRequestFilter jwtRequestFilter() {
        return new JwtRequestFilter();
    }

    @Bean
    public FallbackFilter fallbackFilter() {
        return new FallbackFilter();
    }

}
