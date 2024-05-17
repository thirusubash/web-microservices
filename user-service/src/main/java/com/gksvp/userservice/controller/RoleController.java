package com.gksvp.userservice.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gksvp.userservice.dto.role.RoleCreateRequest;
import com.gksvp.userservice.dto.role.RoleResponse;
import com.gksvp.userservice.service.userGroupRoles.UserGroupBaseService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/roles")
@Slf4j
@RequiredArgsConstructor
public class RoleController {
    @Autowired(required = true)
    @Qualifier("roleService")
    private UserGroupBaseService<RoleCreateRequest, RoleResponse> roleService;



   @GetMapping
    public List<RoleResponse> getAllRoles() {
        log.info("Fetching all roles");
        return roleService.getAll();
    }

    @GetMapping("/{id}")
    public RoleResponse getRoleById(@PathVariable Long id) {
        log.info("Fetching role by id: {}", id);
        return roleService.getById(id);
    }

    @PostMapping
    public RoleResponse createRole(@RequestBody  @Valid RoleCreateRequest roleCreateRequest) {
        log.info("Creating role: {}", roleCreateRequest);
        return roleService.create(roleCreateRequest);
    }

    @PutMapping("/{id}")
    public RoleResponse updateRole(@PathVariable Long id, @RequestBody @Valid RoleCreateRequest updatedRole) {
        log.info("Updating role with id {}: {}", id, updatedRole);
        return roleService.update(id, updatedRole);
    }

    @DeleteMapping("/{id}")
    public void deleteRole(@PathVariable Long id) {
        log.info("Deleting role with id: {}", id);
        roleService.delete(id);
    }
    
    
}
