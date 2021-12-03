package hr.project.api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import hr.project.api.exceptions.ParentNotFoundException;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

  public static final String TRACE = "trace";

  @Value("${reflectoring.trace:true}")
  private boolean printStackTrace;

  @ExceptionHandler(HttpClientErrorException.class)
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  public ResponseEntity<Object> handleAllHttpClientErrorExceptions(
    HttpClientErrorException exception, 
    WebRequest request
  ){
    return ResponseEntity.status(exception.getStatusCode()).body(null);
  }

  
  @ExceptionHandler(ParentNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public ResponseEntity<Object> handleNotFoundClientErrorExceptions(
    HttpClientErrorException exception, 
    WebRequest request
  ){
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
  }

  @ExceptionHandler(UsernameNotFoundException.class)
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  public ResponseEntity<Object> handleAllUsernameNotFoundUncaughtException(
      RuntimeException exception, 
      WebRequest request
  ){
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
    .body(null);
  }


  @ExceptionHandler(RuntimeException.class)
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  public ResponseEntity<Object> handleAllUncaughtException(
      RuntimeException exception, 
      WebRequest request
  ){
    exception.printStackTrace(System.err);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    .body(null);
  }
  
  @Override
  public ResponseEntity<Object> handleExceptionInternal(
      Exception ex,
      Object body,
      HttpHeaders headers,
      HttpStatus status,
      WebRequest request) {
        ex.printStackTrace(System.err);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
  }

}