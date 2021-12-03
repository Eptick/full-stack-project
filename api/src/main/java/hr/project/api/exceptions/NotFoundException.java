package hr.project.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;

public class NotFoundException extends HttpClientErrorException {
    public NotFoundException() {
        super(HttpStatus.NOT_FOUND);
    }
}