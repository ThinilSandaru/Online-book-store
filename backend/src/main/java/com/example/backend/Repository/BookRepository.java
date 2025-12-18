package com.example.backend.Repository;

import com.example.backend.Model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book,Integer> {

	@Override
	Optional<Book> findById(Integer bookId);
}
