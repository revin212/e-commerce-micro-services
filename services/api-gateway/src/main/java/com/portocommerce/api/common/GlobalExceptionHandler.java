package com.portocommerce.api.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {
  public record ValidationError(String field, String code, String message) {}
  public record ApiError(String message, String code, String field) {}

  @ExceptionHandler(MethodArgumentNotValidException.class)
  ResponseEntity<List<ValidationError>> handleValidation(MethodArgumentNotValidException ex) {
    return ResponseEntity.badRequest().body(ex.getBindingResult().getFieldErrors().stream().map(this::mapFieldError).toList());
  }

  @ExceptionHandler(ResponseStatusException.class)
  ResponseEntity<ApiError> handleResponseStatus(ResponseStatusException ex) {
    return ResponseEntity.status(ex.getStatusCode()).body(new ApiError(ex.getReason(), ex.getStatusCode().toString(), null));
  }

  @ExceptionHandler(AuthenticationException.class)
  ResponseEntity<ApiError> handleAuthentication(AuthenticationException ex) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiError("Unauthorized", "401 UNAUTHORIZED", null));
  }

  @ExceptionHandler(AccessDeniedException.class)
  ResponseEntity<ApiError> handleAccessDenied(AccessDeniedException ex) {
    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ApiError("Forbidden", "403 FORBIDDEN", null));
  }

  @ExceptionHandler(Exception.class)
  ResponseEntity<ApiError> handleException(Exception ex) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiError(ex.getMessage(), "INTERNAL_ERROR", null));
  }

  private ValidationError mapFieldError(FieldError error) {
    return new ValidationError(error.getField(), error.getCode(), error.getDefaultMessage());
  }
}
