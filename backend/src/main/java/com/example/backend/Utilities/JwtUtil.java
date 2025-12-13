package com.example.backend.Utilities;

import com.example.backend.Configuration.CustomerUserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

	private final SecretKey secretKey= Keys.hmacShaKeyFor("Saving people hunting thinigs, the family business".getBytes());

	public String generateToken(String email){
		return Jwts.builder()
				.subject(email)
				.issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis()+1000L * 60 * 60 * 24))
				.signWith(secretKey)
				.compact();
	}

	public Claims extractAllClaims(String token){
		Claims claims=(Claims) Jwts.parser()
				.verifyWith(secretKey)
				.build()
				.parse(token)
				.getPayload();

		return claims;
	}

	public String getEmail(String token){
		return extractAllClaims(token).getSubject();
	}

	public boolean isValid(String token, CustomerUserDetails customerUserDetails){
		return isExpired(token) && customerUserDetails.getUsername().equals(getEmail(token));
	}

	private boolean isExpired(String token){
		return !extractAllClaims(token)
				.getExpiration().before(new Date(System.currentTimeMillis()));
	}

}
