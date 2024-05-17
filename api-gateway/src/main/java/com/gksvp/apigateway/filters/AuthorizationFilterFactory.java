package com.gksvp.apigateway.filters;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import reactor.core.publisher.Mono;

import java.util.ArrayList;


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
                    && groupAuthorities.containsAll(requiredGroups)) {
                // User has all the required authorities, allow access to the route
                return chain.filter(exchange);
            } else {
                // User does not have all the required authorities, return unauthorized response
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                exchange.getResponse().getHeaders().add("Content-Type", "application/json");
                String message = "{\"message\": \"Insufficient Privilege\"}";
                return exchange.getResponse().writeWith(Mono.just(exchange.getResponse().bufferFactory().wrap(message.getBytes())));
            }
            
        };
    }

    public static class Config {
        private ArrayList<String> requiredRoles;
        private ArrayList<String> requiredGroups;

        public Config(ArrayList<String> requiredRoles, ArrayList<String> requiredGroups) {
            this.requiredRoles = requiredRoles;
            this.requiredGroups = requiredGroups;
        }

        public ArrayList<String> getRequiredRoles() {
            return requiredRoles;
        }

        public void setRequiredRoles(ArrayList<String> requiredRoles) {
            this.requiredRoles = requiredRoles;
        }

        public ArrayList<String> getRequiredGroups() {
            return requiredGroups;
        }

        public void setRequiredGroups(ArrayList<String> requiredGroups) {
            this.requiredGroups = requiredGroups;
        }
    }
}
