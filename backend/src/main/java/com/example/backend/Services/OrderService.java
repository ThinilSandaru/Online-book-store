package com.example.backend.Services;


import com.example.backend.DTO.OrderItemResponseDTO;
import com.example.backend.DTO.UserOrderResponseDTO;
import com.example.backend.Model.Order;
import com.example.backend.Model.User;
import com.example.backend.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;

	public List<UserOrderResponseDTO> getOrdersByUser(User user) {
		return orderRepository.findByUser(user).stream().map(order -> {

			List<OrderItemResponseDTO> items = order.getOrderItemList().stream()
					.map(oi -> new OrderItemResponseDTO(
							oi.getBook().getBookId(),
							oi.getBook().getTitle(),
							oi.getBook().getPrice(),
							oi.getAmount()
					))
					.collect(Collectors.toList());

			double totalAmount = items.stream()
					.mapToDouble(item -> item.getBookPrice() * item.getQuantity())
					.sum();

			return new UserOrderResponseDTO(
					order.getOrderId(),
					totalAmount,
					order.getPaymentStatus(),
					order.getOrderStatus(),
					items
			);
		}).collect(Collectors.toList());
	}
}