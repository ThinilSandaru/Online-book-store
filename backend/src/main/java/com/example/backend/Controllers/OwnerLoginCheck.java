package com.example.backend.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/owner")
public class OwnerLoginCheck {


	@PostMapping("/check")
	public ResponseEntity<?> getValidation(){

		return ResponseEntity.ok(Map.of("Message","Successful"));

	}


}
