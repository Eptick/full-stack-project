package hr.project.api.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.project.api.dto.UserDto;
import hr.project.api.exceptions.UsernameExistsException;
import hr.project.api.models.User;
import hr.project.api.services.UserService;

@RestController
@RequestMapping()
public class AuthenticationController
{
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody UserDto userDto)
    {
        if(this.userService.usernameExists(userDto.getUsername())) throw new UsernameExistsException();
        return ResponseEntity.ok().body(userService.save(userDto.toUser()));
    }
}