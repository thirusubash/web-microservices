package com.gksvp.userservice.controller;

import com.gksvp.userservice.service.userGroupRoles.UserGroupBaseService;

import jakarta.validation.Valid;

import com.gksvp.userservice.dto.group.GroupCreateRequest;
import com.gksvp.userservice.dto.group.GroupResponse;
import com.gksvp.userservice.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/groups")
@Slf4j
@RequiredArgsConstructor
public class GroupController {

    @Autowired(required = true)
    @Qualifier("groupService")
    private  UserGroupBaseService<GroupCreateRequest, GroupResponse> groupService;

     @GetMapping
    public List<GroupResponse> getAllGroups() {
        log.info("Fetching all groups");
        return groupService.getAll();
    }

    @GetMapping("/{id}")
    public GroupResponse getGroupById(@PathVariable Long id) throws ResourceNotFoundException {
        log.info("Fetching group by id: {}", id);
        return groupService.getById(id);
    }

    @PostMapping
    public GroupResponse createGroup(@RequestBody  @Valid  GroupCreateRequest groupCreateRequest) {
        log.info("Creating group: {}", groupCreateRequest);
        return groupService.create(groupCreateRequest);
    }

    @PutMapping("/{id}")
    public GroupResponse updateGroup(@PathVariable Long id, @RequestBody @Valid GroupCreateRequest updatedGroup) throws ResourceNotFoundException {
        log.info("Updating group with id {}: {}", id, updatedGroup);
        return groupService.update(id, updatedGroup);
    }

    @DeleteMapping("/{id}")
    public void deleteGroup(@PathVariable Long id) throws ResourceNotFoundException {
        log.info("Deleting group with id: {}", id);
        groupService.delete(id);
    }
}
