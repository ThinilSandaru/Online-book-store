package com.example.backend.Controllers;

import com.example.backend.Model.User;
import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/admin")
@RestController
public class TestEmployeefetch {

	@Autowired private UserRepository userRepository;

	@GetMapping("/get")
	public User getEmployee(){
		User user= userRepository.findByUserId(3).orElseThrow();
		return user;
	}


}
