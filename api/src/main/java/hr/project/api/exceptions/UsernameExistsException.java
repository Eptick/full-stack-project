package hr.project.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;

public class UsernameExistsException extends HttpClientErrorException {
    public UsernameExistsException() {
        super(HttpStatus.CONFLICT, "Username already exists");
    }
}
