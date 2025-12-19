package com.example.backend.Services;

import com.example.backend.DTO.BookWithCopyCountDTO;
import com.example.backend.Repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminViewAllBooksService {

	private BookRepository bookRepository;

	public AdminViewAllBooksService(
		BookRepository bookRepository
	){
		this.bookRepository=bookRepository;
	}

	public List<BookWithCopyCountDTO> viewAllBooks() {
		return bookRepository.findBooksWithCopyCount();
	}
}
