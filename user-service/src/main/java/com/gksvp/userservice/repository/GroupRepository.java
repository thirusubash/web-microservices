package com.gksvp.userservice.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.gksvp.userservice.entity.Group;

public interface GroupRepository extends JpaRepository<Group, Long> {

    Group findByName(String string);

    boolean existsByName(String name);

}
