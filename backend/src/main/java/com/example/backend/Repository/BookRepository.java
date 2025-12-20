package com.example.backend.Repository;

import com.example.backend.DTO.BookWithCopyCountDTO;
import com.example.backend.Model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book,Integer> {

	@Override
	Optional<Book> findById(Integer bookId);

	@Query("SELECT new com.example.backend.DTO.BookWithCopyCountDTO(" +
			"b.bookId, b.title, b.author, b.price, b.imageUrl, COUNT(c)) " +
			"FROM Book b LEFT JOIN b.copies c " +
			"GROUP BY b.bookId, b.title, b.author, b.price, b.imageUrl")
	List<BookWithCopyCountDTO> findBooksWithCopyCount();

	@Query("SELECT new com.example.backend.DTO.BookWithCopyCountDTO(" +
			"b.bookId, b.title, b.author, b.price, b.imageUrl, COUNT(c)) " +
			"FROM Book b LEFT JOIN b.copies c " +
			"WHERE LOWER(CONCAT(b.title, ' ', b.author)) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
			"GROUP BY b.bookId, b.title, b.author, b.price, b.imageUrl")
	List<BookWithCopyCountDTO> searchBooks(@Param("keyword") String keyword);


}
