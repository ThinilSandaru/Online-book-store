package com.example.backend.Services;

import com.example.backend.DTO.NewBookDTO;
import com.example.backend.Model.Book;
import com.example.backend.Model.BookCopy;
import com.example.backend.Repository.BookCopyRepository;
import com.example.backend.Repository.BookRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class AddNewBookService {

	private final BookRepository bookRepository;
	private final BookCopyRepository bookCopyRepository;
	private final S3Client s3Client;

	@Value("${aws.s3.bucket-name}")
	private String bucketName;

	public AddNewBookService(BookRepository bookRepository,
							 BookCopyRepository bookCopyRepository,
							 S3Client s3Client) {
		this.bookRepository = bookRepository;
		this.bookCopyRepository = bookCopyRepository;
		this.s3Client = s3Client;
	}

	public Map<String, String> addNewBook(NewBookDTO newBookDTO, MultipartFile image) throws IOException {


		String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();


		PutObjectRequest putObjectRequest = PutObjectRequest.builder()
				.bucket(bucketName)
				.key(fileName)
				.build();

		s3Client.putObject(putObjectRequest, RequestBody.fromBytes(image.getBytes()));




		String imageUrl = "https://" + bucketName + ".s3.amazonaws.com/" + fileName;



		Book book = new Book();
		book.setTitle(newBookDTO.getTitle());
		book.setAuthor(newBookDTO.getAuthor());
		book.setPrice(newBookDTO.getPrice());
		book.setImageUrl(imageUrl);


		List<BookCopy> copies = new ArrayList<>();
		for (int i = 0; i < newBookDTO.getCopies(); i++) {
			BookCopy copy = new BookCopy();
			copy.setBook(book);
			copy.setStatus(BookCopy.status.AVAILABLE);
			copies.add(copy);
		}

		book.setCopies(copies);


		bookRepository.save(book);


		return Map.of(
				"Message", "Successfully added the new book",
				"imageUrl", imageUrl
		);
	}
}
