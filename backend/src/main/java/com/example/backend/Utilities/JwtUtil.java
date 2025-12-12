package com.example.backend.Utilities;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

	private final Key secretKey= Keys.hmacShaKeyFor("Saving people hunting thinigs, the family business".getBytes());

	public String generateToken(String email){
		return Jwts.builder()
				.subject(email)
				.issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis()+1000*4*60))
				.signWith(secretKey)
				.compact();
	}

}
