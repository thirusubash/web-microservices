package com.gksvp.authservice.service;

import com.gksvp.authservice.model.User;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Collection;
import java.util.Optional;



@Slf4j
@Service
public class JwtUserDetailsService implements UserDetailsService {

    private final UserService userService;

    public JwtUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.getUserByUsername(username);
        if (user == null) {
            log.error("User not found with username: {}", username);
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return toUserDetails(user);
    }

    public User getUserProfile(String username) {
        return Optional.ofNullable(userService.getUserByUsername(username))
                .map(user -> {
                    user.setPassword("*****************************");
                    return user;
                })
                .orElseThrow(() -> {
                    log.error("User not found with username: {}", username);
                    return new UsernameNotFoundException("User not found with username: " + username);
                });
    }

    private UserDetails toUserDetails(User user) {

        Collection<? extends GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .toList();

        // Explicitly cast to correct UserDetails implementation
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .disabled(user.isEnabled())
                .accountExpired(user.isAccountNonExpired())
                .credentialsExpired(user.isCredentialsNonExpired())
                .accountLocked(user.isAccountNonLocked())
                .authorities(authorities)
                .build();
    }
}
