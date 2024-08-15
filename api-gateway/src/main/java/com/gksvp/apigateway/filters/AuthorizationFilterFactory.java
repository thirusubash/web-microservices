package com.gksvp.apigateway.filters;

import java.util.ArrayList;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import reactor.core.publisher.Mono;

@Component
public class AuthorizationFilterFactory extends AbstractGatewayFilterFactory<AuthorizationFilterFactory.Config> {

    public AuthorizationFilterFactory() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            // Extract roles and groups from request attributes
            ArrayList<String> roleAuthorities = exchange.getAttribute("roles");
            ArrayList<String> groupAuthorities = exchange.getAttribute("groups");
            ArrayList<String> requiredRoles = config.getRequiredRoles();
            ArrayList<String> requiredGroups = config.getRequiredGroups();

            // Check if the user has all the required roles and groups
            if (roleAuthorities != null && !roleAuthorities.isEmpty() && roleAuthorities.containsAll(requiredRoles)
                    && groupAuthorities != null && !groupAuthorities.isEmpty()
                    && groupAuthorities.containsAll(requiredGroups)) {
                // User has all the required authorities, allow access to the route

                exchange.getRequest().mutate()
                        .header("X-Username", (String) exchange.getAttribute("username"))
                        .header("X-Roles", roleAuthorities.toString())
                        .header("X-Groups", groupAuthorities.toString())
                        .build();
                return chain.filter(exchange);
            } else {
                // User does not have all the required authorities, return unauthorized response
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                exchange.getResponse().getHeaders().add("Content-Type", "application/json");
                String message = "{\"message\": \"Insufficient Privilege\"}";
                return exchange.getResponse()
                        .writeWith(Mono.just(exchange.getResponse().bufferFactory().wrap(message.getBytes())));
            }
        };
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Config {
        private ArrayList<String> requiredRoles;
        private ArrayList<String> requiredGroups;
    }
}
