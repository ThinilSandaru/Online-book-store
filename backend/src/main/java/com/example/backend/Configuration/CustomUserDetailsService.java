package com.example.backend.Configuration;

import com.example.backend.Model.User;
import com.example.backend.Repository.UserRepository;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	private final UserRepository userRepo;

	public CustomUserDetailsService(UserRepository userRepo){
		this.userRepo=userRepo;
	}

	@Override
	public @Nullable UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user=userRepo.findByEmail(email)
				.orElseThrow(()->new UsernameNotFoundException("The email could not be found."));
		return new CustomerUserDetails(user);
	}
}
