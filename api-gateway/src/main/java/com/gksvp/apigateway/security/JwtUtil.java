
package com.gksvp.apigateway.security;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.JwtException;
import lombok.extern.slf4j.Slf4j;
import javax.crypto.SecretKey;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;
import java.util.function.Function;

@Slf4j
@Service
public class JwtUtil {
    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60; 

    private static final String SECRET_KEY = "emGyGjAFVtKvozZruhibCsua0om9XOr3vfX171BOSVQW47xCDhz7ABTN5kFMnFQ8";
    SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }
    @SuppressWarnings("unchecked")
    public ArrayList<String> getRolesFromToken(String token) {
        return Optional.ofNullable((ArrayList<String>) getClaimFromToken(token, claims -> claims.get("roles"))).orElseThrow(() -> new JwtException(" error getting roles"));
    }
    @SuppressWarnings("unchecked")
    public ArrayList<String> getGroupsFromToken(String token) {
        return Optional.ofNullable((ArrayList<String>) getClaimFromToken(token, claims -> claims.get("groups"))).orElseThrow(() -> new JwtException(" Exception geting groups"));
    }   
    private Date getIssuedAtDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getIssuedAt);
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token).getPayload();
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
            throw new JwtException("Invalid JWT token", e);
        }
    }

    private boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    private boolean isValidAudience(String token) {
        String expectedAudience = "web";
        if (!getClaimFromToken(token, Claims::getAudience).contains(expectedAudience)) {
            throw new JwtException("Invalid audience");
        }
        return true;
    }

    private Boolean ignoreTokenExpiration(String token) {
        log.warn("Ignoring token expiration: {}", token);
        return false;
    }

    public Boolean canTokenBeRefreshed(String token) {
        if (token == null || token.isEmpty()) {
            throw new IllegalArgumentException("Token cannot be null or empty");
        }
        return !isTokenExpired(token) || ignoreTokenExpiration(token);
    }

    public boolean validateToken(String token) {
        if (token == null || token.isEmpty()) {
            throw new IllegalArgumentException("Token cannot be null or empty");
        }

        try {
            return !isTokenExpired(token) && isValidAudience(token);
        } catch (JwtException e) {
            if (e.getMessage().equals("Invalid JWT token")) {
                throw new JwtException("Invalid token. Please provide a valid token.");
            } else if (e.getMessage().equals("Invalid audience")) {
                throw new JwtException("Invalid audience. Token is not intended for this audience.");
            } else {
                throw new JwtException("Error validating token: " + e.getMessage());
            }
        }
    }
}
