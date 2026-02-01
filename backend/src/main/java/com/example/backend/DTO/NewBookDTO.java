package com.example.backend.DTO;

import lombok.Data;

@Data
public class NewBookDTO {

	private String title;
	private String ssn;
	private String author;
	private Double price;
	private int copies;

}
