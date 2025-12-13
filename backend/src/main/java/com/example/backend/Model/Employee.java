package com.example.backend.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "employee")
public class Employee {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer employee_id;

	private String full_name;
	@Enumerated(EnumType.STRING)
	private status status;
	private String phone_number;

	@OneToOne
	@JoinColumn(name = "user_id",referencedColumnName = "user_id")
	@JsonBackReference
	private User user;

	public enum status{
		ACTIVE,
		DEACTIVE
	}


}
