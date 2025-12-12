package com.example.backend.DTO;



import lombok.Data;

@Data
public class RegisterRequest {
	private String email;
	private String password;
}
