package com.example.backend.Controllers;

import com.example.backend.Services.DeleteFromCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
public class DeleteFromCartController {

@Autowired
private DeleteFromCartService deleteFromCartService;

@DeleteMapping("/delete/book/{bookId}")
public ResponseEntity<?> deleteFromCart(@PathVariable("bookId") int bookId){

	return ResponseEntity.ok(deleteFromCartService.deleteFromCart(bookId));
}

}
