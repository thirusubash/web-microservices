package com.gksvp.apigateway.filters;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpCookie;
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

    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        // Check for the token in the "accessToken" cookie
        HttpCookie tokenOptional = exchange.getRequest().getCookies().getFirst("accessToken");

        if (tokenOptional != null) {
            String token = tokenOptional.getValue();

            if (jwtUtil.validateToken(token)) {
                // Valid token: Extract claims from the JWT token
                String username = jwtUtil.getUsernameFromToken(token);
                ArrayList<String> roles = jwtUtil.getRolesFromToken(token);
                ArrayList<String> groups = jwtUtil.getGroupsFromToken(token);

                // Set claims as attributes in ServerWebExchange
                exchange.getAttributes().put("username", username);
                exchange.getAttributes().put("roles", roles);
                exchange.getAttributes().put("groups", groups);

                

                // Proceed with the filter chain
                return chain.filter(exchange);
            } else {
                // Invalid token case
                log.error("Invalid token in cookie.");
                return setUnauthorizedResponse(exchange, "Invalid token.");
            }
        } else {
            // Missing or invalid token case
            log.error("Missing or invalid token cookie.");
            return setUnauthorizedResponse(exchange, "Missing or invalid token cookie.");
        }
    }

    private Mono<Void> setUnauthorizedResponse(ServerWebExchange exchange, String message) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        exchange.getResponse().getHeaders().add("Content-Type", "application/json");
        return exchange.getResponse()
                .writeWith(Mono.just(exchange.getResponse().bufferFactory().wrap(message.getBytes())));
    }
}
