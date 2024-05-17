package com.gksvp.userservice.util;

import com.gksvp.userservice.entity.Group;
import com.gksvp.userservice.entity.Role;
import com.gksvp.userservice.entity.User;
import com.gksvp.userservice.repository.GroupRepository;
import com.gksvp.userservice.repository.RoleRepository;
import com.gksvp.userservice.repository.UserRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;

@Component
public class DataInitializer implements ApplicationRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final GroupRepository groupRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(RoleRepository roleRepository, UserRepository userRepository,GroupRepository groupRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // Create roles if they don't exist
        createRoleIfNotExist("ROLE_ADMIN", "Administrator");
        createRoleIfNotExist("ROLE_USER", "Regular User");
        createGroupIfNotExist("GROUP_ADMIN", "Administrator");
        createGroupIfNotExist("GROUP_USER", "Regular User");

        // Create an admin user if it doesn't exist
        createAdminIfNotExist();
    }

    private void createGroupIfNotExist(String group_name, String group_description) {
        if (groupRepository.findByName(group_name) == null) {
            Group group = new Group();
            group.setName(group_name);
            group.setDescription(group_description);
            groupRepository.save(group);
        }
    }

    private void createRoleIfNotExist(String roleName, String roleDescription) {
        if (roleRepository.findByName(roleName) == null) {
            Role role = new Role();
            role.setName(roleName);
            role.setDescription(roleDescription);
            roleRepository.save(role);
        }
    }

    private void createAdminIfNotExist() {
        if (!userRepository.existsByUsername("admin")) {
            Role adminRole = roleRepository.findByName("ROLE_ADMIN");
            if (adminRole == null) {
                // If admin role doesn't exist, do not proceed with user creation
                return;
            }

            Group groups = groupRepository.findByName("GROUP_ADMIN");
            if (groups == null) {
                // If admin role doesn't exist, do not proceed with user creation
                return;
            }
    
            User adminUser = new User();
            adminUser.setUsername("admin");
            // Generate a secure password here (replace with your preferred method)
            adminUser.setPassword(passwordEncoder.encode("generatedSecurePassword")); 
            adminUser.setFirstName("Admin");
            adminUser.setLastName("User");
            adminUser.setFullName("Admin User");
            
            adminUser.setEmail("admin@example.com");
            adminUser.setRoles(new HashSet<>());
            adminUser.getRoles().add(adminRole);
            adminUser.setGroups(new HashSet<>());
            adminUser.getGroups().add(groups);
    
            userRepository.save(adminUser);
        }
    }
}
