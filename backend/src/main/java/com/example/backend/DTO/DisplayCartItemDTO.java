package com.example.backend.DTO;

import lombok.Data;

@Data
public class DisplayCartItemDTO {

private int bookId;
private String bookTitle;
private String author;
private int quantity;
private double price;
private double totalBookPrice;

	public DisplayCartItemDTO(int bookId, String bookTitle, String author, int quantity, double price) {
		this.bookId = bookId;
		this.bookTitle = bookTitle;
		this.author = author;
		this.quantity = quantity;
		this.price = price;
		this.totalBookPrice = price * quantity;
	}
}
