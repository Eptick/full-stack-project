package hr.project.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;

public class ParentNotFoundException extends HttpClientErrorException {
    public ParentNotFoundException() {
        super(HttpStatus.BAD_REQUEST);
    }
}
