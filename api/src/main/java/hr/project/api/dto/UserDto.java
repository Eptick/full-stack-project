package hr.project.api.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import hr.project.api.models.User;

public class UserDto {
    @NotNull()
    @Size(min = 4, max = 15)
    @Pattern(regexp = "^(?=.{4,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$")
    String username;

    @Size(min = 4, max = 15)
    String password;


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

    public User toUser() {
        User user = new User();
        user.setUsername(this.username);
        user.setPassword(this.password);
        return user;
    }

}
