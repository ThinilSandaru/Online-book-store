package com.example.backend.Controllers;

import com.example.backend.Services.DisplayCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
public class DisplayCartController {

@Autowired
private DisplayCartService displayCartService;

@GetMapping("/get/cart")
public ResponseEntity<?> displayCart(){

return ResponseEntity.ok(displayCartService.displayCart());

}





}
