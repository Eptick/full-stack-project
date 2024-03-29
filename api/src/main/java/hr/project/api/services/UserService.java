package hr.project.api.services;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import hr.project.api.dto.UserCreatedByAdminDto;
import hr.project.api.exceptions.CannotDeleteYourselfException;
import hr.project.api.exceptions.NotFoundException;
import hr.project.api.exceptions.ParentNotFoundException;
import hr.project.api.exceptions.PasswordCannotBeEmpty;
import hr.project.api.exceptions.UsernameExistsException;
import hr.project.api.models.Role;
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
        return this.findUserByUsername(username) != null;
    }

    public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public User getCurrentUser() {
        String  username = (String)this.getAuthentication().getPrincipal();
        return this.findUserByUsername(username);
    }

    public boolean currentUserHasRole(String role) {
        try {
            Authentication auth = this.getAuthentication();
            return auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals(role));
        } catch (Exception e) {
            return false;
        }
    }

    public User getUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        if(!user.isPresent()) throw new NotFoundException();
        return user.get();
    }
    public Page<User> getUsers(Pageable paegable, String query) {
        if(query != null) {
            return userRepository.findByUsernameContainingIgnoreCase(query, paegable);
        } else {
            return userRepository.findAll(paegable);
        }
    }
    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User createUser(UserCreatedByAdminDto dto) {
        User user = new User();
        if(usernameExists(dto.getUsername())) throw new UsernameExistsException();
        user.setUsername(dto.getUsername());
        if(dto.getPassword() == null) throw new PasswordCannotBeEmpty();
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        List<Role> roles = dto.getRoles().stream().map( elem -> {
            return roleRepository.findByName(elem);
        }).collect(Collectors.toList());
        user.setRoles(roles);
        return userRepository.save(user);
    }

    public User save(Long userId, UserCreatedByAdminDto dto) {
        User user = getUser(userId);

        if(findUserByUsername(dto.getUsername()).getId() != userId) throw new UsernameExistsException();
        user.setUsername(dto.getUsername());
        if(dto.getPassword() != null) { // only if the password is sent, then update it
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }
        List<Role> roles = dto.getRoles().stream().map( elem -> {
            return roleRepository.findByName(elem);
        }).collect(Collectors.toList());
        user.setRoles(roles);
        return userRepository.save(user);
    }

    public User save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(Arrays.asList(roleRepository.findByName("ROLE_USER")));
        return userRepository.save(user);
    }

    public void removeUser(Long id) {
        try {
            User user = this.getCurrentUser();
            if(user.getId() == id) throw new CannotDeleteYourselfException();
            this.userRepository.deleteById(id);
        } catch (EmptyResultDataAccessException  e) {
            throw new ParentNotFoundException();
        }
    }
}
