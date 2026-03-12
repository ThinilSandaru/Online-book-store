package com.example.backend.Controllers;

import com.example.backend.DTO.CustomerRegisterDTO;
import com.example.backend.DTO.EmployeeRegisterDTO;
import com.example.backend.Services.CustomerRegisterService;
import com.example.backend.Services.EmployeeRegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/authenticate")
public class RegisterCustomerController {

@Autowired
private CustomerRegisterService customerRegisterService;



	@PostMapping("/register/customer")
	public ResponseEntity<?> registerCustomer(@RequestBody CustomerRegisterDTO customerRegisterDTO){
		return ResponseEntity.ok(customerRegisterService.registerCustomer(customerRegisterDTO));
	}



}
