package com.gksvp.userservice.service.userGroupRoles;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.gksvp.userservice.dto.role.RoleCreateRequest;
import com.gksvp.userservice.dto.role.RoleResponse;
import com.gksvp.userservice.entity.Role;
import com.gksvp.userservice.exception.ResourceNotFoundException;
import com.gksvp.userservice.exception.UserNotFoundException;
import com.gksvp.userservice.repository.RoleRepository;


@Service
public class RoleService implements UserGroupBaseService<RoleCreateRequest , RoleResponse> {
    
    RoleRepository roleRepository;
    ModelMapper modelMapper;
    public RoleService(ModelMapper modelMapper , RoleRepository roleRepository){
        this.modelMapper=modelMapper;
        this.roleRepository=roleRepository;
    }

    @Override
    public List<RoleResponse> getAll() {
        List<Role> roles = roleRepository.findAll();
        return roles.stream()
                .map(role -> modelMapper.map(role, RoleResponse.class))
                .collect(Collectors.toList()); 
    }


    @Override
    public RoleResponse getById(Long id) throws ResourceNotFoundException {
        Optional<Role> roleOptional = roleRepository.findById(id);
        if (roleOptional.isPresent()) {
            return modelMapper.map(roleOptional.get(), RoleResponse.class);
        } else {
            throw new ResourceNotFoundException("Role not found with id: " + id);
        }
    }

    @Override
    public RoleResponse create(final RoleCreateRequest request) {
        if(roleRepository.existsByName(request.getName())){
            throw new IllegalArgumentException("Role with name '" + request.getName() + "' already exists.");
        }
        Role role = modelMapper.map(request, Role.class);
        role = roleRepository.save(role);       
        return modelMapper.map(role, RoleResponse.class);
    }
    
    @Override
    public RoleResponse update(Long id, RoleCreateRequest updatedRequest) {
        Optional<Role> roleOptional = roleRepository.findById(id);
        if (roleOptional.isPresent()) {
            Role role = modelMapper.map(updatedRequest, Role.class);
            role.setId(id); // Set the ID of the existing role
            role = roleRepository.save(role);
            return modelMapper.map(role, RoleResponse.class);
        } else {
            throw new ResourceNotFoundException("Role not found with id: " + id);
        }
    }

    @Override
    public void delete(Long id) throws ResourceNotFoundException {
        if (roleRepository.existsById(id)) {
            roleRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("Role not found with id: " + id);
        }
    }

    @Override
    public List<RoleResponse> listAllUsers(Long id) throws UserNotFoundException {
        Optional<Role> role = roleRepository.findById(id);
        if (role.isPresent()) {
            return null;
        } else {
            throw new ResourceNotFoundException("Role not found with id: " + id);
        }
    }

    @Override
    public List<RoleResponse> removeListofUsers(Long id, List<Long> userIdList) throws UserNotFoundException {
        Optional<Role> role = roleRepository.findById(id);
        if (role.isPresent()) {
            return null;
        } else {
            throw new ResourceNotFoundException("Role not found with id: " + id);
        }
    }   
}
