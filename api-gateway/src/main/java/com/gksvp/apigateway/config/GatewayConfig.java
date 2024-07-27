package com.gksvp.apigateway.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.gksvp.apigateway.filters.JwtRequestFilter;
import com.gksvp.apigateway.filters.AuthorizationFilterFactory;
import com.gksvp.apigateway.filters.FallbackFilter;

import java.util.ArrayList;

@Configuration
public class GatewayConfig {

        @Autowired
        private JwtRequestFilter jwtRequestFilter;

        @Autowired
        private FallbackFilter fallbackFilter;

        @Bean
        public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
                ArrayList<String> roleList = new ArrayList<>();
                ArrayList<String> groupList = new ArrayList<>();
                roleList.add("ROLE_ADMIN");
                groupList.add("GROUP_ADMIN");

                return builder.routes()
                                // Public endpoint
                                .route("get_route", r -> r.path("/get").uri("http://httpbin.org"))

                                // Internal service routes with cloud discovery
                                .route("auth_service_route", r -> r.path("/auth-service/**")
                                                .uri("http://localhost:8001")) // Service name in Kubernet

                                .route("home_service_route", r -> r.path("/homepage-service/**")
                                                .uri("http://localhost:8002")) // Service name in Kubernetes

                                .route("media_service_route", r -> r.path("/media-service/**")
                                                .uri("http://media-service")) // Service name in Kubernetes

                                .route("product_service_route", r -> r.path("/product-service/**")
                                                .uri("http://product-service")) // Service name in Kubernetes

                                .route("company_service_route", r -> r.path("/company-service/**")
                                                .uri("http://company-service")) // Service name in Kubernetes

                                .route("user_service_route", r -> r.path("/user-service/**")
                                                .filters(f -> f.filter(jwtRequestFilter)) // JWT authentication for
                                                .uri("http://localhost:8005")) // Service name in Kubernetes

                                .route("roles_service_route", r -> r.path("/user-service/roles/**")
                                                .filters(f -> f.filter(jwtRequestFilter)
                                                                .filter(new AuthorizationFilterFactory().apply(
                                                                                new AuthorizationFilterFactory.Config(
                                                                                                roleList, groupList)))) // Chain
                                                                                                                        // filters
                                                .uri("http://user-service")) // Service name in Kubernetes

                                // Fallback route for unmatched requests
                                .route("fallback_route", r -> r.path("/**") // Catch-all fallback route
                                                .filters(f -> f.filter(fallbackFilter))
                                                .uri("forward:/fallback"))
                                .build();
        }

}
