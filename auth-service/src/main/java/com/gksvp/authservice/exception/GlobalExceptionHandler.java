package com.gksvp.authservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUsernameNotFoundException(UsernameNotFoundException ex,
            WebRequest request) {
        ErrorResponse errorResponse = ErrorResponse.create(
                HttpStatus.NOT_FOUND.value(),
                ex.getMessage(), // Set the message of the exception
                request.getDescription(false)); // Set the path of the request
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<ErrorResponse> handleInvalidPasswordException(InvalidPasswordException ex,
            WebRequest request) {
        ErrorResponse errorResponse = ErrorResponse.create(
                HttpStatus.UNAUTHORIZED.value(),
                ex.getMessage(), // Set the message of the exception
                request.getDescription(false)); // Set the path of the request
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ServiceUnavailableException.class)
    public ResponseEntity<ErrorResponse> handleServiceUnavailableException(ServiceUnavailableException ex,
            WebRequest request) {
        ErrorResponse errorResponse = ErrorResponse.create(
                HttpStatus.SERVICE_UNAVAILABLE.value(),
                ex.getMessage(), // Set the message of the exception
                request.getDescription(false)); // Set the path of the request
        return new ResponseEntity<>(errorResponse, HttpStatus.SERVICE_UNAVAILABLE);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex, WebRequest request) {
        ErrorResponse errorResponse = ErrorResponse.create(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "An unexpected error occurred: " + ex.getMessage(), // Ensure message is descriptive
                request.getDescription(false)); // Set the path of the request
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
