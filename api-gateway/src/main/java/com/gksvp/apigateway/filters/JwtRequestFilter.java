package com.gksvp.apigateway.filters;

import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import com.gksvp.apigateway.security.JwtUtil;

import io.jsonwebtoken.JwtException;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class JwtRequestFilter implements GatewayFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        return Mono.justOrEmpty(exchange.getRequest().getCookies().getFirst("accessToken"))
                .map(HttpCookie::getValue)
                .flatMap(token -> validateAndExtractClaims(token, exchange, chain))
                .switchIfEmpty(setUnauthorizedResponse(exchange, "Unauthorized Access: Missing accessToken cookie."));
    }

    private Mono<Void> validateAndExtractClaims(String token, ServerWebExchange exchange, GatewayFilterChain chain) {
        if (jwtUtil.validateToken(token)) {
            try {
                return extractClaimsAndContinue(token, exchange, chain);
            } catch (JwtException ex) {
                log.error("Invalid token format: {}", ex.getMessage());
                return setUnauthorizedResponse(exchange, "Invalid token format.");
            }
        } else {
            return setUnauthorizedResponse(exchange, "Invalid or expired token.");
        }
    }

    private Mono<Void> extractClaimsAndContinue(String token, ServerWebExchange exchange, GatewayFilterChain chain) {
        exchange.getAttributes().put("username", jwtUtil.getUsernameFromToken(token));
        exchange.getAttributes().put("roles", jwtUtil.getRolesFromToken(token));
        exchange.getAttributes().put("groups", jwtUtil.getGroupsFromToken(token));
        return chain.filter(exchange);
    }

    private Mono<Void> setUnauthorizedResponse(ServerWebExchange exchange, String message) {
        log.error(message);
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        exchange.getResponse().getHeaders().add("Content-Type", "application/json");

        byte[] responseBody = String.format("{\"message\": \"%s\"}", message).getBytes(StandardCharsets.UTF_8);
        return exchange.getResponse().writeWith(Mono.just(exchange.getResponse().bufferFactory().wrap(responseBody)));
    }
}
