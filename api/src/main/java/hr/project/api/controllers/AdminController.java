package hr.project.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.project.api.dto.AdminOverviewDto;
import hr.project.api.services.AdminOverviewService;

@PreAuthorize("hasRole('ROLE_ADMIN')")
@RestController()
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    AdminOverviewService adminOverviewService;
    
    @GetMapping("overview")
    public ResponseEntity<AdminOverviewDto> overview() {

        return ResponseEntity.ok().body(this.adminOverviewService.getOverview());
    }
}
