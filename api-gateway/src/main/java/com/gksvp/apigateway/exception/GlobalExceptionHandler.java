package com.gksvp.apigateway.exception;

import java.net.ConnectException;
import java.net.UnknownHostException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import io.jsonwebtoken.JwtException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(JwtException.class)
    public ResponseEntity<Object> handleJwtException(JwtException ex, WebRequest request) {
        ErrorResponse errorResponse = ErrorResponse.create(
                HttpStatus.INTERNAL_SERVER_ERROR.value(), request.getDescription(true),
                ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }

    @ExceptionHandler(UnknownHostException.class)
    public ResponseEntity<Object> handleJwtException(UnknownHostException ex, WebRequest request) {
        ErrorResponse errorResponse = ErrorResponse.create(
                HttpStatus.SERVICE_UNAVAILABLE.value(), request.getDescription(true),
                ex.getMessage());
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(errorResponse);
    }

    @ExceptionHandler(ConnectException.class)
    public ResponseEntity<Object> handleConnectException(UnknownHostException ex, WebRequest request) {
        ErrorResponse errorResponse = ErrorResponse.create(
                HttpStatus.SERVICE_UNAVAILABLE.value(), request.getDescription(true),
                ex.getMessage());
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(errorResponse);
    }

    // @ExceptionHandler(Exception.class)
    // public ResponseEntity<ErrorResponse> handleGenericException(Exception ex,
    // WebRequest request) {
    // ErrorResponse errorResponse = ErrorResponse.create(
    // HttpStatus.INTERNAL_SERVER_ERROR.value(), request.getDescription(true),
    // ex.getMessage());

    // return
    // ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    // }

}
