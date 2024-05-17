package com.gksvp.userservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gksvp.userservice.entity.Role;


public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);
    boolean existsByName(String name);
}
