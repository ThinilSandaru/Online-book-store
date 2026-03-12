package com.example.backend.Services;

import com.example.backend.Configuration.CustomUserDetails;
import com.example.backend.Repository.CartItemRepository;
import com.example.backend.Repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class DeleteFromCartService {

@Autowired
private CartRepository cartRepository;

@Autowired
private CartItemRepository cartItemRepository;

public Map<String,String> deleteFromCart(int bookId){

	CustomUserDetails user= (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

	int userId= user.getUserId();

	int cartId = cartRepository.findCartIdByUserId(userId);

	cartItemRepository.deleteBookFromCart(cartId,bookId);

	return Map.of("Message","Successfully deleted.");

}



}
