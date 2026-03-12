package com.example.backend.Services;

import com.example.backend.DTO.CustomerRegisterDTO;
import com.example.backend.DTO.EmployeeRegisterDTO;
import com.example.backend.Model.Customer;
import com.example.backend.Model.Employee;
import com.example.backend.Model.User;
import com.example.backend.Repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CustomerRegisterService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public CustomerRegisterService(
			UserRepository userRepository,
			PasswordEncoder passwordEncoder
	){
		this.userRepository=userRepository;
		this.passwordEncoder=passwordEncoder;
	}

	public Map<String,String> registerCustomer(CustomerRegisterDTO customerRegisterDTO){
		User user=new User();
		user.setEmail(customerRegisterDTO.getEmail());
		user.setPassword(passwordEncoder.encode(customerRegisterDTO.getPassword()));
		user.setRole(User.role.USER);

		Customer customer=new Customer();
		customer.setFirstName(customerRegisterDTO.getFirstName());
		customer.setSecondName(customerRegisterDTO.getLastName());
		customer.setPhoneNumber(customerRegisterDTO.getPhoneNumber());
		customer.setAddress(customerRegisterDTO.getAddress());


		customer.setUser(user);
		user.setCustomer(customer);

		userRepository.save(user);

		return Map.of("Message","Successfully registered the customer.");
	}
}
