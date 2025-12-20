package com.example.backend.Controllers;

import com.example.backend.Services.AdminSearchBooksService;
import org.apache.coyote.Response;
import org.hibernate.annotations.SQLRestriction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminSearchBooksController {

	private AdminSearchBooksService adminSearchBooksService;

	public AdminSearchBooksController(
		AdminSearchBooksService adminSearchBooksService
	){
		this.adminSearchBooksService=adminSearchBooksService;
	}

	@GetMapping("/search/{keyword}")
	public ResponseEntity<?> searchBooks(@PathVariable String keyword){

		if(adminSearchBooksService.searchBooks(keyword).isEmpty()){
			return ResponseEntity.ok(Map.of("Message","No book found"));
		}

		return ResponseEntity.ok(adminSearchBooksService.searchBooks(keyword));
	}




}
