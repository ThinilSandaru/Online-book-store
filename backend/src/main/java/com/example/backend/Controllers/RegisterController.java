package com.example.backend.Controllers;



import com.example.backend.DTO.RegisterRequest;
import com.example.backend.Model.User;
import com.example.backend.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/register")
@RequiredArgsConstructor
public class RegisterController {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	@PostMapping("/owner")
	public User registerOwner(@RequestBody RegisterRequest request) {

		// Create a new user
		User user = new User();

		user.setEmail(request.getEmail());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setRole(User.role.OWNER);

		// Save to DB
		return userRepository.save(user);
	}
}
