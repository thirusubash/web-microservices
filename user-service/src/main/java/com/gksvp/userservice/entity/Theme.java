package com.gksvp.userservice.entity;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.Column;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Theme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private boolean isPrimary;

    @Column(columnDefinition = "JSON")
    private String themeJson;

    @Column(name = "user_id")
    private Long userId;

    // Helper methods to convert JsonNode to String and vice versa
    public JsonNode getThemeJson() {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readTree(this.themeJson);
        } catch (Exception e) {
            throw new RuntimeException("Error parsing JSON", e);
        }
    }

    public void setThemeJson(JsonNode themeJson) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            this.themeJson = objectMapper.writeValueAsString(themeJson);
        } catch (Exception e) {
            throw new RuntimeException("Error converting JSON", e);
        }
    }
}
