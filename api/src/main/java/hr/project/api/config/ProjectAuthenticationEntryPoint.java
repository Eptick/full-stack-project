package hr.project.api.config;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;

@Component
public class ProjectAuthenticationEntryPoint extends Http403ForbiddenEntryPoint {


    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        if(request.getHeader("Authentication") == null) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
        } else {
            response.setStatus(HttpStatus.FORBIDDEN.value());
        }
    }
}
