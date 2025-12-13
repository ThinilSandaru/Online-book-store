package com.example.backend.Services;

import com.example.backend.DTO.EmployeeRegisterDTO;
import com.example.backend.Model.Employee;
import com.example.backend.Model.User;
import com.example.backend.Repository.EmployeeRepository;
import com.example.backend.Repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class EmployeeRegisterService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public EmployeeRegisterService(
			UserRepository userRepository,
			PasswordEncoder passwordEncoder
	){
		this.userRepository=userRepository;
		this.passwordEncoder=passwordEncoder;
	}

	public Map<String,String> registerEmployee(EmployeeRegisterDTO employeeDTO){
		User user=new User();
		user.setEmail(employeeDTO.getEmail());
		user.setPassword(passwordEncoder.encode(employeeDTO.getPassword()));
		user.setRole(User.role.EMPLOYEE);

		Employee employee=new Employee();
		employee.setFull_name(employeeDTO.getFull_name());
		employee.setPhone_number(employeeDTO.getPhone_number());
		employee.setStatus(Employee.status.ACTIVE);

		employee.setUser(user);
		user.setEmployee(employee);

		userRepository.save(user);

		return Map.of("Message","Successfully registered the employee.");
	}
}
