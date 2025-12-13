package com.example.backend.Model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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

	@OneToOne(mappedBy = "user",cascade = CascadeType.ALL)
	@JsonManagedReference
	private Employee employee;

	public enum role{
		USER,
		OWNER,
		EMPLOYEE
	}

}
