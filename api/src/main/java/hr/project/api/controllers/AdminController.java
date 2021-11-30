package hr.project.api.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequestMapping("/admin")
@RestController
public class AdminController {
    
    @GetMapping("protected")
    String admin() {
        return "admin";
    }
}
