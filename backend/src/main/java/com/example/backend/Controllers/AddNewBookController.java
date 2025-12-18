package com.example.backend.Controllers;

import com.example.backend.DTO.NewBookDTO;
import com.example.backend.Services.AddNewBookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/owner")
public class AddNewBookController {

	private AddNewBookService addNewBookService;

	public AddNewBookController(
			AddNewBookService addNewBookService
	){
		this.addNewBookService=addNewBookService;
	}

	@PostMapping("/add/new/book")
	public ResponseEntity<?> addNewBook(@RequestBody NewBookDTO newBookDTO){
		return ResponseEntity.ok(addNewBookService.addNewBook(newBookDTO));
	}
}
