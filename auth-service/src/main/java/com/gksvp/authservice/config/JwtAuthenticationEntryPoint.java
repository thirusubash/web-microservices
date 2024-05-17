package com.gksvp.authservice.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Slf4j
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
	
		log.error("Unauthorized request to {}. Authorization header: {}. HTTP Status: {}.",
				request.getRequestURI(), request.getHeader("Authorization"), response.getStatus());

		
		response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "You are not authorized to access this resource.");
	}
}
