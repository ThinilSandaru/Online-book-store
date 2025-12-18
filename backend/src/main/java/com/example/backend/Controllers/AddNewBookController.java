package com.example.backend.Controllers;

import com.example.backend.DTO.NewBookDTO;
import com.example.backend.Services.AddNewBookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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
	public ResponseEntity<?> addNewBook(
			@ModelAttribute NewBookDTO newBookDTO,
			@RequestParam("image") MultipartFile image
			) throws IOException {
		return ResponseEntity.ok(addNewBookService.addNewBook(newBookDTO,image));
	}
}
