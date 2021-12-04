package hr.project.api.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hr.project.api.dto.UserCreatedByAdminDto;
import hr.project.api.models.User;
import hr.project.api.services.UserService;

@PreAuthorize("hasRole('ROLE_ADMIN')")
@RestController
@RequestMapping("/users")
public class UsersController {
    @Autowired
    UserService userService;

    @GetMapping()
    public ResponseEntity<Page<User>> Index(
            @PageableDefault(sort = "id", direction = Direction.DESC) Pageable pageable,
            @RequestParam(required = false) String query) {
        return ResponseEntity.ok().body(userService.getUsers(pageable, query));
    }

    @PostMapping()
    public User createUser(@Valid @RequestBody UserCreatedByAdminDto dto) {
        return this.userService.createUser(dto);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUser(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok().body(userService.getUser(userId));
    }

    @PatchMapping("/{userId}")
    public User updateUser(
            @PathVariable("userId") Long userId,
            @Valid @RequestBody UserCreatedByAdminDto dto) {
        return this.userService.save(userId, dto);
    }

    @DeleteMapping("{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable("userId") Long userId) {
        userService.removeUser(userId);
        return ResponseEntity.ok().build();
    }

}
