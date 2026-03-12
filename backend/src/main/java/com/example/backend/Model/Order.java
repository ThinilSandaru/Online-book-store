package com.example.backend.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "orders")
public class Order {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int orderId;

private double totalAmount;

@ManyToOne
@JsonBackReference
@JoinColumn(name = "user_id",referencedColumnName = "user_id")
private User user;


	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<OrderItem> orderItemList;

@Enumerated(EnumType.STRING)
private OrderStatus orderStatus;

@Enumerated(EnumType.STRING)
private PaymentStatus paymentStatus;

public enum OrderStatus {
	PENDING,DELIVERED,OUT_FOR_DELIVERY
}

public enum PaymentStatus {
	COD,PAID
}



}
