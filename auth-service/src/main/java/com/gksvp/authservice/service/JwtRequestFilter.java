package com.gksvp.authservice.service;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.gksvp.authservice.util.JwtTokenService;

import java.io.IOException;

@Component
@Slf4j
public class JwtRequestFilter extends OncePerRequestFilter {
	private static final String AUTHORIZATION_HEADER = "Authorization";
	private static final String TOKEN_PREFIX = "Bearer ";

	private final JwtUserDetailsService jwtUserDetailsService;
	private final JwtTokenService jwtTokenUtil;

	public JwtRequestFilter(JwtUserDetailsService jwtUserDetailsService, JwtTokenService jwtTokenUtil) {
		this.jwtUserDetailsService = jwtUserDetailsService;
		this.jwtTokenUtil = jwtTokenUtil;
	}

	@Override
	protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
			throws ServletException, IOException {
		String jwtToken = extractToken(request);
		log.info(jwtToken);
		String username = null;

		if (jwtToken != null &&  username == null) {
			try {
				username = jwtTokenUtil.getUsernameFromToken(jwtToken);
			} catch (IllegalArgumentException e) {
				log.error("Unable to get JWT Token");
			} catch (ExpiredJwtException e) {
				log.error("JWT Token has expired");
				setUnauthorizedResponse(response, "Session has timed out. Please log in again.");
				return;
			} catch (Exception e) {
				// This is a catch-all for other JWT exceptions and general exceptions.
				log.error("Error on token check: {}", e.getMessage());
				setUnauthorizedResponse(response, "Invalid token.");
				return;
			}
		}

		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			validateAndSetAuthentication(username, jwtToken, request);
		}

		filterChain.doFilter(request, response);
	}

	private void setUnauthorizedResponse(HttpServletResponse response, String message) throws IOException {
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		response.setContentType("application/json");
		response.getWriter().write("{\"error\": \"" + message + "\"}");
		response.getWriter().flush();
	}

	private String extractToken(HttpServletRequest request) {
		String tokenHeader = request.getHeader(AUTHORIZATION_HEADER);
		if (tokenHeader != null && tokenHeader.startsWith(TOKEN_PREFIX)) {
			return tokenHeader.substring(TOKEN_PREFIX.length());
		} else {
			log.warn("JWT Token does not begin with Bearer String or is null");
			return null;
		}
	}

	private void validateAndSetAuthentication(String username, String jwtToken, HttpServletRequest request) {
		UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(username);
		if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {
			UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
					userDetails, null, userDetails.getAuthorities());
			authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			SecurityContextHolder.getContext().setAuthentication(authToken);
		}
	}
}
