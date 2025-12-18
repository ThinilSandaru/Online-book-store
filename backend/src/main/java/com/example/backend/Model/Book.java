package com.example.backend.Model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "book")
@Data
public class Book {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer bookId;

	private String title;
	private String author;
	private Double price;

	@OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
	private List<BookCopy> copies;
}
