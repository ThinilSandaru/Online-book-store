package com.example.backend.Configuration;

import com.example.backend.Filters.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

	private JwtFilter jwtFilter;

	public SecurityConfiguration(JwtFilter jwtFilter){
		this.jwtFilter=jwtFilter;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http){

		http
				.cors(Customizer.withDefaults())
				.csrf(AbstractHttpConfigurer::disable)
				.authorizeHttpRequests(req-> req
						.requestMatchers("/register/**").permitAll()
						.requestMatchers("/authenticate/**").permitAll()
						.requestMatchers("/owner/**").hasRole("OWNER")
						.anyRequest().authenticated()
				)
				.sessionManagement(
						(session)->session
								.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.httpBasic(Customizer.withDefaults())
				.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
		;

		return http.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationManager authenticationManager(CustomUserDetailsService customUserDetailsService){
		DaoAuthenticationProvider provider=new DaoAuthenticationProvider(customUserDetailsService);
		provider.setPasswordEncoder(passwordEncoder());
		return new ProviderManager(provider);
	}





}
