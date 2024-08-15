package com.gksvp.apigateway.config;


import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import reactor.core.publisher.Mono;

@Configuration
public class RateLimiterConfig {

    @Bean
    public KeyResolver remoteAddressResolver() {
    return exchange -> {
        if (exchange.getRequest() != null && exchange.getRequest().getRemoteAddress() != null
                && exchange.getRequest().getRemoteAddress().getAddress() != null) {
            return Mono.just(exchange.getRequest().getRemoteAddress().getAddress().getHostAddress());
        } else {
            return Mono.just("UNKNOWN");  // Fallback in case remote address is not available
        }
    };
}

}
