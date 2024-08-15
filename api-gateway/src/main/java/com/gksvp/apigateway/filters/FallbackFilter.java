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
        return chain.filter(exchange).then(Mono.defer(() -> {
            HttpStatus statusCode = HttpStatus.resolve(exchange.getResponse().getStatusCode().value());
            ServerHttpResponse response = exchange.getResponse();
            if (statusCode == HttpStatus.SERVICE_UNAVAILABLE) {
                response.setStatusCode(HttpStatus.OK);
                return response.writeWith(Mono.just(response.bufferFactory().wrap(
                        "Service Unavailable. Please try again later.".getBytes())));
            } else if (statusCode == HttpStatus.FORBIDDEN) {
                response.setStatusCode(HttpStatus.FORBIDDEN);
                return response.writeWith(Mono.just(response.bufferFactory().wrap(
                        "You don't have access to this page. Contact your administrator.".getBytes())));
            }
            return Mono.empty();
        }));
    }
}

