package com.example.backend.Services;

import com.example.backend.DTO.NewBookDTO;
import com.example.backend.Model.Book;
import com.example.backend.Model.BookCopy;
import com.example.backend.Repository.BookCopyRepository;
import com.example.backend.Repository.BookRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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

	public Map<String,String> addNewBook(NewBookDTO newBookDTO, MultipartFile image) throws IOException {

		String uploadDir="uploads/";
		File folder=new File(uploadDir);

		if(!folder.exists()){
			folder.mkdirs();
		}

		String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
		Path filePath = Paths.get(uploadDir + fileName);
		Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
		String imageUrl = "http://localhost:8080/uploads/" + fileName;



		Book book=new Book();
		book.setTitle(newBookDTO.getTitle());
		book.setAuthor(newBookDTO.getAuthor());
		book.setPrice(newBookDTO.getPrice());
		book.setImageUrl(imageUrl);
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
