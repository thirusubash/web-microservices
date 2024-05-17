package com.gksvp.authservice.model;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Data
public class JwtRequest implements Serializable {

	@Serial
	private static final long serialVersionUID = 5926468583005150707L;

	private String username;
	private String password;

	// default constructor for JSON Parsing
	public JwtRequest() {
	}

	public JwtRequest(String username, String password) {
		this.setUsername(username);
		this.setPassword(password);
	}

}