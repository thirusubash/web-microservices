package com.gksvp.userservice.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class ErrorDetails {
    public ErrorDetails(LocalDateTime now, String message2, int value) {
        this.message=message2;
        this.statusCode=value;
        this.timestamp=now;
    }
    @Id
    private int id;
    private LocalDateTime timestamp;
    private String message;
    private int statusCode;
}
