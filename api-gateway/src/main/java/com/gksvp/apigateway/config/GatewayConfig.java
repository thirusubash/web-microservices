package com.gksvp.apigateway.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.gksvp.apigateway.filters.AuthorizationFilterFactory;
import com.gksvp.apigateway.filters.JwtRequestFilter;

import java.util.ArrayList;

@Configuration
public class GatewayConfig {

        @Autowired
        private JwtRequestFilter jwtRequestFilter;

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
                                .route("auth_service_route", r -> r.path("/auth-service/v1/**")
                                                .uri("lb://AUTH-SERVICE"))

                                .route("home_service_route", r -> r.path("/homepage-service/**")
                                                .uri("lb://HOMEPAGE-SERVICE"))

                                .route("media_service_route", r -> r.path("/media-service/**")
                                                .uri("lb://MEDIA-SERVICE"))
                                .route("product_service_route", r -> r.path("/product-service/**")
                                                .uri("lb://PRODUCT-SERVICE"))
                                .route("company_service_route", r -> r.path("/company-service/**")
                                                .uri("lb://COMPANY-SERVICE"))
                                .route("user_service_route", r -> r.path("/user-service/**")
                                                .filters(f -> f.filter(jwtRequestFilter)) // JWT authentication for user
                                                                                          // service
                                                .uri("lb://USER-SERVICE"))

                                .route("roles_service_route", r -> r.path("/user-service/roles/**")
                                                .filters(f -> f.filter(jwtRequestFilter)
                                                                .filter(new AuthorizationFilterFactory().apply(
                                                                                new AuthorizationFilterFactory.Config(
                                                                                                roleList, groupList)))) // Chain
                                                                                                                        // filters
                                                .uri("lb://USER-SERVICE"))

                                // Fallback route for unmatched requests (consider a secure fallback URL)
                                // .route("fallback_route", r ->
                                // r.path("/**").uri("http://AUTH-SERVICE:8080/fallback"))

                                .build();
        }
}
