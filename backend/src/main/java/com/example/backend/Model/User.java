package com.example.backend.Model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.AnyDiscriminatorImplicitValues;

@Entity
@Table(name = "user")
@Data
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer user_id;
	private  String email;
	private String password;
	@Enumerated(EnumType.STRING)
	private role role;

	public enum role{
		USER,
		OWNER,
		EMPLOYEE
	}

}
