package com.example.backend.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestJWT {

	@GetMapping("/hello")
	public String getHello(){
		return "Hello world!";
	}

}
