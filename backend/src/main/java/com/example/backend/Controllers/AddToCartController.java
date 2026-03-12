package com.example.backend.Controllers;

import com.example.backend.DTO.AddToCartDTO;
import com.example.backend.Services.AddToCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
public class AddToCartController {

@Autowired
private AddToCartService addToCartService;

@PostMapping("/add/book")
public ResponseEntity<?> addToCart(@RequestBody AddToCartDTO addToCartDTO) {


	return ResponseEntity.ok(addToCartService
			.addToCart(
					addToCartDTO.getQuantity(),
					addToCartDTO.getBookId()
			)


	);

}


}
