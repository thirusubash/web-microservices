package com.gksvp.userservice.config;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthenticationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        // Extract authentication information from the request (handle missing info as
        // needed)
        Authentication authentication = extractAuthentication(request);

        // Set the authentication object in the SecurityContext
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Continue with the filter chain
        filterChain.doFilter(request, response);
    }

    private Authentication extractAuthentication(HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        @SuppressWarnings("unchecked")
        List<String> roles = (List<String>) request.getAttribute("roles");

        // Logging to check values obtained from attributes
        System.out.println("Username from attribute: " + username);
        System.out.println("Roles from attribute: " + roles);

        // Check if username or roles are null
        if (username == null || roles == null) {
            return null;
        }

        // Adding a default role for testing purposes
        roles.add("ADMIN");

        List<SimpleGrantedAuthority> authorities = roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        UserDetails userDetails = new User(username, "", authorities);

        return new UsernamePasswordAuthenticationToken(userDetails, null, authorities);
    }

}
