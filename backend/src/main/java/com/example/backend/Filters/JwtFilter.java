package com.example.backend.Filters;

import com.example.backend.Configuration.CustomUserDetailsService;
import com.example.backend.Configuration.CustomUserDetails;
import com.example.backend.Utilities.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

	private JwtUtil jwtUtil;
	private CustomUserDetailsService customUserDetailsService;

	public JwtFilter(
			JwtUtil jwtUtil,
			CustomUserDetailsService customUserDetailsService
	){
		this.jwtUtil = jwtUtil;
		this.customUserDetailsService = customUserDetailsService;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request,
									HttpServletResponse response,
									FilterChain filterChain)
			throws ServletException, IOException {

		System.out.println("===== JWT FILTER START =====");
		System.out.println("Request URI: " + request.getRequestURI());

		String authHeader = request.getHeader("Authorization");
		System.out.println("Authorization Header: " + authHeader);

		if(authHeader == null || !authHeader.startsWith("Bearer ")) {
			System.out.println("No Bearer token found. Skipping authentication.");
			filterChain.doFilter(request, response);
			return;
		}

		String token = authHeader.substring(7);
		System.out.println("Extracted Token: " + token);

		String email = null;

		try {
			email = jwtUtil.getEmail(token);
			System.out.println("Email extracted from token: " + email);
		} catch (Exception e) {
			System.out.println("Failed to extract email from token: " + e.getMessage());
		}

		if(email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

			System.out.println("Loading user from database...");

			CustomUserDetails user =
					(CustomUserDetails) customUserDetailsService.loadUserByUsername(email);

			System.out.println("User loaded: " + user.getUsername());

			boolean isValid = jwtUtil.isValid(token, user);
			System.out.println("Token validation result: " + isValid);

			if(isValid) {

				UsernamePasswordAuthenticationToken authenticationToken =
						new UsernamePasswordAuthenticationToken(
								user,
								null,
								user.getAuthorities()
						);

				authenticationToken.setDetails(
						new WebAuthenticationDetailsSource().buildDetails(request)
				);

				SecurityContextHolder.getContext().setAuthentication(authenticationToken);

				System.out.println("Authentication successfully set in SecurityContext");
			} else {
				System.out.println("Token is NOT valid");
			}
		}

		System.out.println("===== JWT FILTER END =====");

		filterChain.doFilter(request, response);
	}
}