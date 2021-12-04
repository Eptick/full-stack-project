package hr.project.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;

public class CannotDeleteYourselfException extends HttpClientErrorException {
    public CannotDeleteYourselfException() {
        super(HttpStatus.BAD_REQUEST, "Cannot delete yourself");
    }
}
