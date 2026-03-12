package com.example.backend.Controllers;

import com.example.backend.DTO.CheckoutOrderDetailsDTO;
import com.example.backend.Model.Order;
import com.example.backend.Services.CustomerCheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
public class CustomerCheckoutController {

@Autowired
private CustomerCheckoutService customerCheckoutService;

@PostMapping("/checkout")
public ResponseEntity<?> customerCheckout(@RequestBody CheckoutOrderDetailsDTO checkoutOrderDetailsDTO){

	return ResponseEntity.ok(customerCheckoutService.customerCheckout(checkoutOrderDetailsDTO));
}


}
