package com.example.backend.DTO;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CustomerRegisterDTO {

	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String phoneNumber;
	private String address;
	private MultipartFile profileImage;

}
