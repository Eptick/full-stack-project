package hr.project.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;

public class PasswordCannotBeEmpty extends HttpClientErrorException {
    public PasswordCannotBeEmpty() {
        super(HttpStatus.BAD_REQUEST, "Password cannot be empty");
    }
}
