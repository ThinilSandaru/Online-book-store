package com.example.backend.Controllers;

import com.example.backend.Services.AdminViewAllBooksService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminViewAllBooksController {

	private final AdminViewAllBooksService adminViewAllBooksService;

	public AdminViewAllBooksController(
		AdminViewAllBooksService adminViewAllBooksService
	){
		this.adminViewAllBooksService=adminViewAllBooksService;
	}

	@GetMapping("/view/all/books")
	public ResponseEntity<?> viewAllBooks(){
		return ResponseEntity.ok(adminViewAllBooksService.viewAllBooks());
	}


}
