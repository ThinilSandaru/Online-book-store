package com.example.backend.Services;

import com.example.backend.DTO.BookWithCopyCountDTO;
import com.example.backend.Repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminSearchBooksService {

	private BookRepository bookRepository;

	public AdminSearchBooksService(
		BookRepository bookRepository
	){
		this.bookRepository=bookRepository;
	}

	public List<BookWithCopyCountDTO> searchBooks(String keyword) {
		return bookRepository.searchBooks(keyword);
	}
}
