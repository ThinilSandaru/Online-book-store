package com.example.backend.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "customer")
public class Customer {


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;

	@Column(name = "first_name")
	private String firstName;


	@Column(name = "second_name")
	private String secondName;



	@Column(name = "phone_number")
	private String phoneNumber;

	@Column(name = "address")
	private String address;

	@OneToOne
	@JoinColumn(name = "customer_id",referencedColumnName = "user_id")
	@JsonBackReference
	private User user;




}
