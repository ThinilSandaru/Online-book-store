package com.example.backend.Controllers;



import com.example.backend.Configuration.CustomUserDetails;
import com.example.backend.DTO.UserOrderResponseDTO;
import com.example.backend.Model.User;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("customer/orders")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@Autowired
	private UserRepository userRepository;

	@GetMapping("/my-orders")
	public ResponseEntity<List<UserOrderResponseDTO>> getOrdersForCurrentUser() {


		CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder
				.getContext()
				.getAuthentication()
				.getPrincipal();

		int userId = userDetails.getUserId();

		User user = userRepository.findById(userId)
				.orElseThrow(() -> new RuntimeException("User not found"));

		List<UserOrderResponseDTO> orders = orderService.getOrdersByUser(user);
		return ResponseEntity.ok(orders);
	}
}