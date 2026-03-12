package com.example.backend.Services;


import com.stripe.model.PaymentIntent;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {

	public String createPaymentIntent(Long amount) throws Exception {

		Map<String, Object> params = new HashMap<>();
		params.put("amount", amount);
		params.put("currency", "usd");

		PaymentIntent intent = PaymentIntent.create(params);

		return intent.getClientSecret();
	}
}