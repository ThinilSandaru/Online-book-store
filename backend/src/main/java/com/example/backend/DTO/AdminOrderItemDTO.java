package com.example.backend.DTO;

import lombok.Data;

@Data
public class AdminOrderItemDTO {

	private int bookId;
	private String bookTitle;
	private double price;
	private int quantity;

}
