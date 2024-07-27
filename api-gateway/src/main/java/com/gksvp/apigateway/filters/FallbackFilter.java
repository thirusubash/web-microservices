package com.gksvp.apigateway.filters;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import reactor.core.publisher.Mono;

@Component
public class FallbackFilter implements GatewayFilter {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        if (exchange.getResponse().getStatusCode() == HttpStatus.SERVICE_UNAVAILABLE) {
            ServerHttpResponse response = exchange.getResponse();
            response.setStatusCode(HttpStatus.SERVICE_UNAVAILABLE); // Change to a 200
            return response.writeWith(Mono.just(response.bufferFactory().wrap(
                    "Service Unavailable. Please try again later.".getBytes())));
        } else {
            ServerHttpResponse response = exchange.getResponse();
            response.setStatusCode(HttpStatus.FORBIDDEN); // Change to a 403
            return response.writeWith(Mono.just(response.bufferFactory().wrap(
                    "You don't have access to this page. Contact your administrator.".getBytes())));
        }
    }
}
