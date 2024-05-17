package com.gksvp.authservice.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.gksvp.authservice.model.Group;
import com.gksvp.authservice.model.User;
import com.gksvp.authservice.service.UserService;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

@Component
@Slf4j
public class JwtTokenService   {
   

    private final UserService userService;
    private  static final String SECRET_KEY="emGyGjAFVtKvozZruhibCsua0om9XOr3vfX171BOSVQW47xCDhz7ABTN5kFMnFQ8";
    SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    // private static final SecretKey key = Jwts.SIG.HS512.key().build();

	String jws = Jwts.builder().subject("Joe").signWith(key).compact();

    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;

    public JwtTokenService(UserService userService) {
        this.userService = userService;
    }

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
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
			return Jwts.parser()
			.verifyWith(key)
			.build()
			.parseSignedClaims(token).getPayload();        
    }

    private boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    private boolean isValidAudience(String token){
        String expectedAudience = "web";
        if (!getClaimFromToken(token, Claims::getAudience).contains(expectedAudience)) {
            throw new JwtException("Invalid audience");
        }
        return true;
    }
    

    private Boolean ignoreTokenExpiration(String token) {
        // Consider removing or obfuscating token information in the log message
        log.warn("Ignoring token expiration: {}", token); // Potential security concern
        return false;
    }

    public String generateToken(UserDetails userDetails) throws Exception {
            User user = userService.getUserByUsername(userDetails.getUsername());
            final List<String> roleAuthorities = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
            Set<String> groupAuthorities = user.getGroups().stream().map(Group::getName).collect(Collectors.toSet());
        return Jwts.builder().claim("userId", user.getId()).claim("roles",roleAuthorities).claim("groups",groupAuthorities)
                    .issuer("www.gksvp.com")
                    .subject(user.getUsername())
                    .audience().add("web").and()
                    .expiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000)) 
                    .notBefore(new Date(System.currentTimeMillis()))
                    .issuedAt(new Date(System.currentTimeMillis())) 
                    .id(UUID.randomUUID().toString())
                    .signWith(key).compact();
    }

    public Boolean canTokenBeRefreshed(String token) {
        if (token == null || token.isEmpty()) {
            throw new IllegalArgumentException("Token cannot be null or empty");
        }
        return !isTokenExpired(token) || ignoreTokenExpiration(token);
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        if (token == null || token.isEmpty() || userDetails == null) {
            throw new IllegalArgumentException("Token and UserDetails cannot be null");
        }
        final String username = getUsernameFromToken(token);
        log.info("Username from validate method: {}", username);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token) && isValidAudience(token) ;
    }
      
}
