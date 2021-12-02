package hr.project.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
}
