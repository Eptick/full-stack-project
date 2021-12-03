package hr.project.api.config;

import java.util.HashMap;
import java.util.Map;

import javax.validation.ConstraintViolationException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
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
      WebRequest request) {
    return ResponseEntity.status(exception.getStatusCode()).body(null);
  }

  @ExceptionHandler(ParentNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public ResponseEntity<Object> handleNotFoundClientErrorExceptions(
      HttpClientErrorException exception,
      WebRequest request) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
  }

  @ExceptionHandler(UsernameNotFoundException.class)
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  public ResponseEntity<Object> handleAllUsernameNotFoundUncaughtException(
      RuntimeException exception,
      WebRequest request) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        .body(null);
  }

  @ExceptionHandler(RuntimeException.class)
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  public ResponseEntity<Object> handleAllUncaughtException(
      RuntimeException exception,
      WebRequest request) {
    exception.printStackTrace(System.err);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(null);
  }

  @ExceptionHandler(ConstraintViolationException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  ResponseEntity<String> handleConstraintViolationException(ConstraintViolationException e) {
    return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
  }

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
      HttpHeaders headers, HttpStatus status, WebRequest request) {
    Map<String, String> errors = new HashMap<>();
    ex.getBindingResult().getAllErrors().forEach((error) -> {
      String fieldName = ((FieldError) error).getField();
      String errorMessage = error.getDefaultMessage();
      errors.put(fieldName, errorMessage);
    });
    return ResponseEntity.badRequest().body(errors);
  }

  @Override
  @ExceptionHandler(Exception.class)
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