package com.example.backend.Services;

import com.example.backend.Configuration.CustomUserDetails;
import com.example.backend.Model.Book;
import com.example.backend.Model.Cart;
import com.example.backend.Model.CartItem;
import com.example.backend.Model.User;
import com.example.backend.Repository.BookRepository;
import com.example.backend.Repository.CartItemRepository;
import com.example.backend.Repository.CartRepository;
import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AddToCartService {

@Autowired
private CartRepository cartRepository;

@Autowired
private CartItemRepository cartItemRepository;

@Autowired
private UserRepository userRepository;

@Autowired
private BookRepository bookRepository;


public Map<String,String> addToCart(int quantity,int bookId){

	CustomUserDetails user= (CustomUserDetails) SecurityContextHolder.getContext().
								getAuthentication().getPrincipal();

	int userId=user.getUserId();

	boolean isPresent=cartRepository.existsByUserUserId(userId);

	int cartId;
	if(isPresent){
		cartId= cartRepository.findCartIdByUserId(userId);
	}
	else{
		User newUser=userRepository.findByUserId(userId)
				.orElseThrow(()->new RuntimeException("User not found!"));



		Cart cart=new Cart();
		cart.setUser(newUser);
		cartRepository.save(cart);
		cartId=cart.getCartId();
	}
	Cart cart1=cartRepository.findById(cartId)
			.orElseThrow(()->new RuntimeException("The cart not found!"));
	Book book= bookRepository.findById(bookId)
			.orElseThrow(()->new RuntimeException("The book not found!"));
	CartItem cartItem=new CartItem();
	cartItem.setCart(cart1);
	cartItem.setBook(book);
	cartItem.setQuantity(quantity);
	cartItemRepository.save(cartItem);

	return Map.of("Message","Successfully added");
}



}
