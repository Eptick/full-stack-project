package hr.project.api.dto;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class UserCreatedByAdminDto {
    Long id;

    @NotBlank()
    @Size(min = 4, max = 15)
    String username;

    @Size(min = 4, max = 15)
    String password;

    @Size(min = 1, message = "You need to select at least one role")
    List<String> roles;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<String> getRoles() {
        return this.roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

}
