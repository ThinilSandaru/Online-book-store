package com.example.backend.Controllers;

import com.example.backend.DTO.LoginDTO;
import com.example.backend.Services.LoginService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/authenticate")
public class LoginController {

	private final LoginService loginService;

	public LoginController(
		LoginService loginService
	){
		this.loginService=loginService;
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDTO loginRequest){
		try{
			String token = loginService.generateToken(loginRequest);
			return ResponseEntity.ok(Map.of("Message",token));
		} catch (BadCredentialsException e) {
			return ResponseEntity
					.status(HttpStatus.UNAUTHORIZED)
					.body(Map.of("Message","Invalid email or password."));
		}
	}


}
