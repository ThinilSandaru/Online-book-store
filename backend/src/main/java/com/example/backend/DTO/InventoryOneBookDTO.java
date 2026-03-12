package com.example.backend.DTO;

import lombok.Data;

@Data
public class InventoryOneBookDTO {



	private String title;
	private int id;
	private String author;
	private Double price;
	private String imageUrl;
	private Long copyCount;


	public InventoryOneBookDTO(String title,int id, String author, Double price, String imageUrl, Long copyCount) {
		this.title = title;
		this.id=id;
		this.author = author;
		this.price = price;
		this.imageUrl = imageUrl;
		this.copyCount = copyCount;
	}


}
