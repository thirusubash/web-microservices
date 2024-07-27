package com.gksvp.userservice.service.userGroupRoles;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.gksvp.userservice.dto.group.GroupCreateRequest;
import com.gksvp.userservice.dto.group.GroupResponse;
import com.gksvp.userservice.entity.Group;
import com.gksvp.userservice.exception.NoContentFoundException;
import com.gksvp.userservice.exception.NotFoundException;
import com.gksvp.userservice.repository.GroupRepository;



@Service
public class GroupService implements UserGroupBaseService<GroupCreateRequest, GroupResponse> {

    GroupRepository GroupRepository;
    ModelMapper modelMapper;
    public GroupService(ModelMapper modelMapper , GroupRepository GroupRepository){
        this.modelMapper=modelMapper;
        this.GroupRepository=GroupRepository;
    }

    @Override
    public List<GroupResponse> getAll() {
        List<Group> Groups = GroupRepository.findAll();
        return Groups.stream()
                .map(Group -> modelMapper.map(Group, GroupResponse.class))
                .collect(Collectors.toList()); 
    }


    @Override
    public GroupResponse getById(Long id) throws NoContentFoundException {
        Optional<Group> Group=GroupRepository.findById(id);
        return modelMapper.map(Group,GroupResponse.class);
    }

    @Override
    public GroupResponse create(GroupCreateRequest request) {
        if(GroupRepository.existsByName(request.getName())){
            throw new IllegalArgumentException("Group with name '" + request.getName() + "' already exists.");
        }
        Group Group = modelMapper.map(request, Group.class);
        Group = GroupRepository.save(Group);
        return modelMapper.map(Group, GroupResponse.class);
    }
    
    @Override
    public GroupResponse update(Long id, GroupCreateRequest updatedRequest) {
        Group Group = modelMapper.map(updatedRequest, Group.class);
        Group = GroupRepository.save(Group);
        return modelMapper.map(Group, GroupResponse.class);
    }

    @Override
    public void delete(Long id) throws NoContentFoundException {
       GroupRepository.deleteById(id);
    }

    @Override
    public List<GroupResponse> listAllUsers(Long id) throws NotFoundException {
        Optional<Group> group=GroupRepository.findById(id);
        group.get();
        return null;
    }

    @Override
    public List<GroupResponse> removeListofUsers(Long id, List<Long> userIdList) throws NotFoundException {
        Optional<Group> group=GroupRepository.findById(id);
        group.get();
        return null;
    }
}
