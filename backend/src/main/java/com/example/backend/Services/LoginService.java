package com.example.backend.Services;

import com.example.backend.DTO.LoginDTO;
import com.example.backend.Utilities.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

	private final JwtUtil jwtUtil;
	private final AuthenticationManager authenticationManager;

	public LoginService(
			JwtUtil jwtUtil,
			AuthenticationManager authenticationManager

	){
		this.jwtUtil=jwtUtil;
		this.authenticationManager=authenticationManager;
	}

	public String generateToken(
			LoginDTO loginRequest
	){
		UsernamePasswordAuthenticationToken authenticationToken=
				new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword());
		authenticationManager.authenticate(authenticationToken);

		return jwtUtil.generateToken(loginRequest.getEmail());
	}



}
