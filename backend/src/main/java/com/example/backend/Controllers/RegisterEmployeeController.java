package com.example.backend.Controllers;

import com.example.backend.DTO.EmployeeRegisterDTO;
import com.example.backend.Services.EmployeeRegisterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/owner")
public class RegisterEmployeeController {

	private final EmployeeRegisterService employeeRegisterService;

	public RegisterEmployeeController(
			EmployeeRegisterService employeeRegisterService
	){
		this.employeeRegisterService=employeeRegisterService;
	}

	@PostMapping("/register/employee")
	public ResponseEntity<?> registerEmployee(@RequestBody EmployeeRegisterDTO employeeDTO){
		return ResponseEntity.ok(employeeRegisterService.registerEmployee(employeeDTO));
	}



}
