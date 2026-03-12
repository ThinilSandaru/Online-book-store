package com.example.backend.DTO;



import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderItemResponseDTO {
	private Integer bookId;
	private String bookTitle;
	private Double bookPrice;
	private Integer quantity;
}