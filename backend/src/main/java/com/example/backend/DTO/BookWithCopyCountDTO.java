package com.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookWithCopyCountDTO {

	private Integer bookId;
	private String title;
	private String author;
	private Double price;
	private String imageUrl;
	private Long copyCount;




}
