package com.example.backend.Controllers;

import com.example.backend.DTO.AdminOrderDTO;
import com.example.backend.DTO.UpdateOrderStatusDTO;
import com.example.backend.Services.AdminOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/admin","/owner"})
@RequiredArgsConstructor
public class AdminOrderController {

	private final AdminOrderService adminOrderService;

	@GetMapping("/orders")
		public ResponseEntity<List<AdminOrderDTO>> getAllOrders() {

		return ResponseEntity.ok(adminOrderService.getAllOrders());

	}

	@PutMapping("/orders/status")
	public ResponseEntity<String> updateOrderStatus(@RequestBody UpdateOrderStatusDTO dto){

		adminOrderService.updateOrderStatus(dto);

		return ResponseEntity.ok("Order status updated");
	}

}