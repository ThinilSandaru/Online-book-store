package com.example.backend.Model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "book_copy")
@Data
public class BookCopy {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Enumerated(EnumType.STRING)
	private status status;

	public enum status{
		AVAILABLE,
		SOLD
	}

	@ManyToOne
	@JoinColumn(name = "book_id",referencedColumnName = "bookId")
	private Book book;

}
