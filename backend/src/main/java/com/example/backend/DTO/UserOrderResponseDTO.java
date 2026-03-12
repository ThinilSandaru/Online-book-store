package com.example.backend.DTO;



import com.example.backend.Model.Order.PaymentStatus;
import com.example.backend.Model.Order.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class UserOrderResponseDTO {
	private int orderId;
	private double totalAmount;
	private PaymentStatus paymentStatus;
	private OrderStatus orderStatus;
	private List<OrderItemResponseDTO> items;
}