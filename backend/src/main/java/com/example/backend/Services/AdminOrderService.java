package com.example.backend.Services;

import com.example.backend.DTO.AdminOrderDTO;
import com.example.backend.DTO.AdminOrderItemDTO;
import com.example.backend.DTO.UpdateOrderStatusDTO;
import com.example.backend.Model.Order;
import com.example.backend.Repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminOrderService {

	private final OrderRepository orderRepository;

	public List<AdminOrderDTO> getAllOrders() {

		List<Order> orders = orderRepository.findAll();

		return orders.stream().map(order -> {

			AdminOrderDTO dto = new AdminOrderDTO();

			dto.setOrderId(order.getOrderId());
			double total = order.getOrderItemList()
					.stream()
					.mapToDouble(item -> item.getBook().getPrice() * item.getAmount())
					.sum();

			dto.setTotalAmount(total);
			dto.setUserId(order.getUser().getUserId());

			dto.setOrderStatus(order.getOrderStatus());
			dto.setPaymentStatus(order.getPaymentStatus());

			List<AdminOrderItemDTO> items =
					order.getOrderItemList().stream().map(item -> {

						AdminOrderItemDTO itemDTO = new AdminOrderItemDTO();

						itemDTO.setBookId(item.getBook().getBookId());
						itemDTO.setBookTitle(item.getBook().getTitle());
						itemDTO.setPrice(item.getBook().getPrice());
						itemDTO.setQuantity(item.getAmount());

						return itemDTO;

					}).toList();

			dto.setItems(items);

			return dto;

		}).toList();
	}

	public void updateOrderStatus(UpdateOrderStatusDTO dto){

		Order order = orderRepository.findById(dto.getOrderId())
				.orElseThrow(() -> new RuntimeException("Order not found"));

		order.setOrderStatus(
				Order.OrderStatus.valueOf(dto.getOrderStatus())
		);

		orderRepository.save(order);
	}

}