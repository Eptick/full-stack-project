package hr.project.api.services;

import java.util.Arrays;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import hr.project.api.models.User;
import hr.project.api.repositories.RoleRepository;
import hr.project.api.repositories.UserRepository;

@Service
public class UserService {
    PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    
    UserService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public boolean usernameExists(String username) {
        return userRepository.findByUsername(username) != null;
    }

    public User getCurrentUser() {
        String  username = (String)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return this.findUserByUsername(username);
    }

    public Optional<User> getUser(Long id) {
        return userRepository.findById(id);
    }
    public Page<User> getUsers(Pageable paegable, String query) {
        if(query != null) {
            return userRepository.findByUsernameContaining(query, paegable);
        } else {
            return userRepository.findAll(paegable);
        }
    }
    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }


    public User save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(Arrays.asList(roleRepository.findByName("ROLE_USER")));
        return userRepository.save(user);
    }
}
