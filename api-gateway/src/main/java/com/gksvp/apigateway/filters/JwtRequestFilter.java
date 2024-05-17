package com.gksvp.apigateway.filters;
import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import com.gksvp.apigateway.security.JwtUtil;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class JwtRequestFilter implements GatewayFilter {



    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String authorizationHeader = exchange.getRequest().getHeaders().getFirst("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            if (jwtUtil.validateToken(token)) {
                // Extract claims from the JWT token
                String username = jwtUtil.getUsernameFromToken(token);
                // Assuming you have methods in JwtUtil to get roles and groups
                ArrayList<String> roles = jwtUtil.getRolesFromToken(token);
                ArrayList<String> groups = jwtUtil.getGroupsFromToken(token);
                
                // Set claims as attributes in ServerWebExchange
                exchange.getAttributes().put("username", username);
                exchange.getAttributes().put("roles", roles);
                exchange.getAttributes().put("groups", groups);
                
                // Proceed with the filter chain
                return chain.filter(exchange);
            } else {
                log.error("Invalid token.");
                return setUnauthorizedResponse(exchange, "Invalid token.");
            }
        } else {
            log.error("Missing or invalid Authorization header.");
            return setUnauthorizedResponse(exchange, "Missing or invalid Authorization header.");
        }
    }

    private Mono<Void> setUnauthorizedResponse(ServerWebExchange exchange, String message) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        exchange.getResponse().getHeaders().add("Content-Type", "application/json");
        return exchange.getResponse().writeWith(Mono.just(exchange.getResponse().bufferFactory().wrap(message.getBytes())));
    }
}
