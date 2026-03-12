package com.example.backend.Controllers;

import com.example.backend.Services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/payment")
public class PaymentController {

	@Autowired
	private PaymentService paymentService;

	@PostMapping("/create-payment-intent")
	public Map<String, String> createPayment(@RequestBody Map<String, Long> data) throws Exception {

		String clientSecret = paymentService.createPaymentIntent(data.get("amount"));

		Map<String, String> response = new HashMap<>();
		response.put("clientSecret", clientSecret);

		return response;
	}
}