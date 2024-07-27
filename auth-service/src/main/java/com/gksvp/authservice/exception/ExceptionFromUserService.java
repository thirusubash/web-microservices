package com.gksvp.authservice.exception;

public class ExceptionFromUserService extends RuntimeException {
    private String message;
    private Throwable cause;

    public ExceptionFromUserService(String message) {
        super(message);
        this.message = message;
    }

    public ExceptionFromUserService(String message, Throwable cause) {
        super(message, cause);
        this.message = message;
        this.cause = cause;
    }

    @Override
    public String getMessage() {
        return message;
    }

    @Override
    public Throwable getCause() {
        return cause;
    }
}
