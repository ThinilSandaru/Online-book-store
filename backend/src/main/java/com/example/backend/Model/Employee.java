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
	@Column(name = "employee_id")
	private Integer employeeId;

	@Column(name = "full_name")
	private String fullName;

	@Enumerated(EnumType.STRING)

	@Column(name = "status")
	private status status;

	@Column(name = "phone_number")
	private String phoneNumber;

	@OneToOne
	@JoinColumn(name = "user_id",referencedColumnName = "user_id")
	@JsonBackReference
	private User user;

	public enum status{
		ACTIVE,
		DEACTIVE
	}


}
