package com.example.backend.Controllers;

import com.example.backend.Repository.BookCopyRepository;
import com.example.backend.Services.AddBookCopiesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/owner")
public class AddBookCopiesController {

	private BookCopyRepository bookCopyRepository;
	private AddBookCopiesService addBookCopiesService;

	public AddBookCopiesController(
		BookCopyRepository bookCopyRepository,
		AddBookCopiesService addBookCopiesService
	){
		this.bookCopyRepository=bookCopyRepository;
		this.addBookCopiesService=addBookCopiesService;
	}

	@PostMapping("/add/copies/{book_id}/{copies}")
	public ResponseEntity<?> addBookCopy(
			@PathVariable Integer book_id,
			@PathVariable int copies
	){
		return ResponseEntity.ok(addBookCopiesService.addBookCopy(book_id,copies));
	}




}
