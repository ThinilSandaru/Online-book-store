package com.example.backend.DTO;

import com.example.backend.Model.Order;
import lombok.Data;

@Data
public class OrderSummaryDTO {
	private Long orderId;
	private String customerName;
	private Double totalAmount;
	private Order.PaymentStatus paymentStatus;
	private Order.OrderStatus orderStatus;

	public OrderSummaryDTO(Long orderId, String customerName, Double totalAmount,
						   Order.PaymentStatus paymentStatus, Order.OrderStatus orderStatus) {
		this.orderId = orderId;
		this.customerName = customerName;
		this.totalAmount = totalAmount;
		this.paymentStatus = paymentStatus;
		this.orderStatus = orderStatus;
	}


}