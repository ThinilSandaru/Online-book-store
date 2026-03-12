package com.example.backend.DTO;

import com.example.backend.Model.Order;
import lombok.Data;

import java.util.List;

@Data
public class AdminOrderDTO {

	private int orderId;
	private double totalAmount;

	private int userId;

	private Order.OrderStatus orderStatus;
	private Order.PaymentStatus paymentStatus;

	private List<AdminOrderItemDTO> items;

}