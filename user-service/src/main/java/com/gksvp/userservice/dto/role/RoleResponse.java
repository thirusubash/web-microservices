package com.gksvp.userservice.dto.role;

import java.util.List;

import com.gksvp.userservice.dto.user.UserDTO;


import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class RoleResponse {
    private Long id;
    private String name;
    private String description;
    private List<UserDTO> users;

}
