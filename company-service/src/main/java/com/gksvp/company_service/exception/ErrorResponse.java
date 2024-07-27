package com.gksvp.company_service.exception;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {
    private int status;
    private String message;
    private String path;
    private LocalDateTime timestamp;

    public static ErrorResponse create(int status, String message, String path) {
        return new ErrorResponse(status, message, path, LocalDateTime.now());
    }
}