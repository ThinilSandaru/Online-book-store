package com.example.backend.Model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cart_item")
public class CartItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer cartItemId;

	@ManyToOne
	@JsonManagedReference
	@JoinColumn(name = "cart_id")
	private Cart cart;

	@ManyToOne
	@JsonManagedReference
	@JoinColumn(name = "book_id",referencedColumnName = "bookId")
	private Book book;

	private Integer quantity;

}