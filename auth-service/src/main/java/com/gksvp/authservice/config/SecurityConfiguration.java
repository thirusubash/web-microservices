package com.gksvp.authservice.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.gksvp.authservice.service.JwtRequestFilter;
import com.gksvp.authservice.service.JwtUserDetailsService;


@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
//  @Order(Ordered.HIGHEST_PRECEDENCE)                                                      

@Autowired
private JwtUserDetailsService jwtUserDetailsService;

public SecurityConfiguration(JwtUserDetailsService jwtUserDetailsService, JwtRequestFilter jwtRequestFilter) {
    this.jwtUserDetailsService = jwtUserDetailsService;
    this.jwtRequestFilter = jwtRequestFilter;
}

@Autowired
private JwtRequestFilter jwtRequestFilter;
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http
        .csrf(csrf -> csrf.disable()) // Consider adjusting CSRF protection based on your needs
        .authorizeHttpRequests(authorize -> authorize
            .requestMatchers("/auth/**").permitAll()
            .requestMatchers("/test/**").hasRole("USER")
            .anyRequest().authenticated())
            .userDetailsService(jwtUserDetailsService) 
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
        
        .build();
}



    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    // @Bean
	// public UserDetailsService userDetailsService() {
	// 	UserDetails userDetails = User.withDefaultPasswordEncoder()
	// 		.username("user")
	// 		.password("password")
	// 		.roles("USER")
	// 		.build();

	// 	return new InMemoryUserDetailsManager(userDetails);
	// }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // @Bean
    // public WebSecurityCustomizer webSecurityCustomizer() {
    //     // Ignoring security checks for some specific paths
    //     return (web) -> web.ignoring().requestMatchers("/auth/**");
    // }

}
