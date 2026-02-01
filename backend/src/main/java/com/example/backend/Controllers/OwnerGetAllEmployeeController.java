package com.example.backend.Controllers;

import com.example.backend.DTO.OwnerAdminDetailsDTO;
import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/owner")
public class OwnerGetAllEmployeeController {

	@Autowired
	private UserRepository userRepository;

	@GetMapping("/get/all/employees")
	public List<OwnerAdminDetailsDTO> findAllEmployees(){

		return userRepository.findAllEmployees();

	}







}
