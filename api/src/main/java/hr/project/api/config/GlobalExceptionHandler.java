package hr.project.api.config;

import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.Map;

import javax.validation.ConstraintViolationException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.orm.jpa.JpaObjectRetrievalFailureException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import hr.project.api.exceptions.CannotDeleteYourselfException;
import hr.project.api.exceptions.ParentNotFoundException;
import hr.project.api.exceptions.PasswordCannotBeEmpty;
import hr.project.api.exceptions.UsernameExistsException;
import io.jsonwebtoken.ExpiredJwtException;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

  public static final String TRACE = "trace";
  Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

  @Value("${reflectoring.trace:true}")
  private boolean printStackTrace;

  @ExceptionHandler(HttpClientErrorException.class)
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  public ResponseEntity<Object> handleAllHttpClientErrorExceptions(
      HttpClientErrorException exception,
      WebRequest request) {
    return ResponseEntity.status(exception.getStatusCode()).body(null);
  }

  @ExceptionHandler({
    AccessDeniedException.class,
    UsernameNotFoundException.class,
    ExpiredJwtException.class,
  })
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
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

  @Override
  protected ResponseEntity<Object> handleHttpMessageNotReadable(
      HttpMessageNotReadableException ex,
      HttpHeaders headers,
      HttpStatus status,
      WebRequest request) {
    logger.error(ex.getMessage());
    return ResponseEntity.badRequest().body(null);
  }

  @Override
  protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(
      HttpRequestMethodNotSupportedException ex,
      HttpHeaders headers,
      HttpStatus status,
      WebRequest request) {
    logger.error(((ServletWebRequest) request).getRequest().getRequestURI() + " : " + ex.getMessage());
    return new ResponseEntity<>(null, HttpStatus.METHOD_NOT_ALLOWED);
  }

  @ExceptionHandler(UsernameExistsException.class)
  @ResponseStatus(HttpStatus.CONFLICT)
  ResponseEntity<String> handleUsernameExistisException(UsernameExistsException e) {
    logger.error(e.getMessage());
    return new ResponseEntity<>(null, HttpStatus.CONFLICT);
  }

  @ExceptionHandler({
      ParentNotFoundException.class,
      ConstraintViolationException.class,
      CannotDeleteYourselfException.class,
      EmptyResultDataAccessException.class,
      DataIntegrityViolationException.class,
      JpaObjectRetrievalFailureException.class,
      MethodArgumentTypeMismatchException.class,
      PasswordCannotBeEmpty.class,
  })
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  ResponseEntity<String> handleConstraintViolationException(Exception e) {
    logger.error(e.getMessage());
    return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
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