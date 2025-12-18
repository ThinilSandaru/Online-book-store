package com.example.backend.Services;

import com.example.backend.Model.Book;
import com.example.backend.Model.BookCopy;
import com.example.backend.Repository.BookCopyRepository;
import com.example.backend.Repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class AddBookCopiesService {

	private BookCopyRepository bookCopyRepository;
	private BookRepository bookRepository;

	public AddBookCopiesService(
		BookRepository bookRepository,
		BookCopyRepository bookCopyRepository
	){
		this.bookRepository=bookRepository;
		this.bookCopyRepository=bookCopyRepository;
	}

	public Map<String,String> addBookCopy(Integer bookId,int copies){

		Book book=bookRepository.findById(bookId).orElseThrow();

		List<BookCopy> bookCopyList=new ArrayList<>();

		for(int i=0;i<copies;i++){
			BookCopy copy=new BookCopy();
			copy.setBook(book);
			copy.setStatus(BookCopy.status.AVAILABLE);
			bookCopyList.add(copy);
		}

		bookCopyRepository.saveAll(bookCopyList);
		return Map.of("Message","Successfully added the book copies");
	}


}
