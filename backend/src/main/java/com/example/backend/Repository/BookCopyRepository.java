package com.example.backend.Repository;

import com.example.backend.Model.BookCopy;
import jakarta.transaction.TransactionScoped;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookCopyRepository extends JpaRepository<BookCopy,Integer> {


	@Modifying
	@Transactional
	@Query(value = "DELETE FROM book_copy WHERE book_id = :bookId LIMIT :count", nativeQuery = true)
	void deleteBookCopies(@Param("bookId") int bookId, @Param("count") int count);







}
