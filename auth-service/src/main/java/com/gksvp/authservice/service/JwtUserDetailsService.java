package com.gksvp.authservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.gksvp.authservice.model.Role;
import com.gksvp.authservice.model.User;
import lombok.extern.slf4j.Slf4j;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService userService;

    public JwtUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        try {
            User user = userService.getUserByUsername(userName);
            if (user == null) {
                throw new UsernameNotFoundException("User not found with username: " + userName);
            }

            List<GrantedAuthority> authorities = getUserAuthority(user.getRoles());
            return buildUserForAuthentication(user, authorities);
        } catch (Exception e) {
            log.error("Error loading user by username", e);
            throw new UsernameNotFoundException("User not found with username: " + userName, e);
        }
    }

    /**
     * Converts roles to Spring Security GrantedAuthority objects.
     */
    private List<GrantedAuthority> getUserAuthority(Set<Role> roles) {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
    }

    /**
     * Convert custom User object into Spring's UserDetails object.
     */
    private UserDetails buildUserForAuthentication(User user, List<GrantedAuthority> authorities) {
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                user.getIsEnabled(),
                user.getIsAccountNonExpired(),
                user.getIsCredentialsNonExpired(),
                user.getIsAccountNonLocked(),
                authorities);
    }

    public User getUserProfile(String userName) throws UsernameNotFoundException {
        try {
            User user = userService.getUserByUsername(userName);

            if (user == null) {
                throw new UsernameNotFoundException("User not found with username: " + userName);
            }
            user.setPassword("*****************************");
            return user;
        } catch (Exception e) {
            log.error("Error loading user by username", e);
            throw new UsernameNotFoundException("User not found with username: " + userName);
        }
    }
}
