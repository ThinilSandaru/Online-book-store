package com.example.backend.DTO;

import lombok.Data;

@Data
public class OwnerAdminDetailsDTO {

private Integer id;
private String name;
private String email;
private String phoneNumber;

	public OwnerAdminDetailsDTO(Integer id, String email, String name, String phoneNumber) {
		this.id = id;
		this.email = email;
		this.name = name;
		this.phoneNumber = phoneNumber;
	}


}
