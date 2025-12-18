package com.example.backend.Services;

import com.example.backend.DTO.NewBookDTO;
import com.example.backend.Model.Book;
import com.example.backend.Model.BookCopy;
import com.example.backend.Repository.BookCopyRepository;
import com.example.backend.Repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class AddNewBookService {

	private BookRepository bookRepository;
	private BookCopyRepository bookCopyRepository;

	public AddNewBookService(
		BookRepository bookRepository,
		BookCopyRepository bookCopyRepository
	){
		this.bookRepository=bookRepository;
		this.bookCopyRepository=bookCopyRepository;
	}

	public Map<String,String> addNewBook(NewBookDTO newBookDTO){
		Book book=new Book();
		book.setTitle(newBookDTO.getTitle());
		book.setAuthor(newBookDTO.getAuthor());
		book.setPrice(newBookDTO.getPrice());

		List<BookCopy> copies=new ArrayList<>();
		int n_of_copies=newBookDTO.getCopies();

		for(int i=0;i<n_of_copies;i++){
			BookCopy copy=new BookCopy();
			copy.setBook(book);
			copy.setStatus(BookCopy.status.AVAILABLE);
			copies.add(copy);
		}

		book.setCopies(copies);

		bookRepository.save(book);

		return Map.of("Message","Successfully added the new book");
	}
}
