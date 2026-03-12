package com.example.backend.Services;

import com.example.backend.Configuration.CustomUserDetails;
import com.example.backend.Configuration.SecurityConfiguration;
import com.example.backend.DTO.DisplayCartItemDTO;
import com.example.backend.DTO.DisplayFullCartDTO;
import com.example.backend.Repository.BookRepository;
import com.example.backend.Repository.CartItemRepository;
import com.example.backend.Repository.CartRepository;
import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DisplayCartService {

@Autowired
private CartRepository cartRepository;

@Autowired
private CartItemRepository cartItemRepository;

@Autowired
private UserRepository userRepository;

@Autowired
private BookRepository bookRepository;


public DisplayFullCartDTO displayCart(){

	CustomUserDetails user= (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

	int userId=user.getUserId();
	int cartId=cartRepository.findCartIdByUserId(userId);

	List<DisplayCartItemDTO> cartItemList=cartItemRepository.getCartItems(cartId);

	double totalCartPrice = cartItemList.stream()
			.mapToDouble(DisplayCartItemDTO::getTotalBookPrice)
			.sum();

	int totalBookCount= cartItemList.stream()
			.mapToInt(DisplayCartItemDTO::getQuantity)
			.sum();

	DisplayFullCartDTO fullCartDTO=new DisplayFullCartDTO();
	fullCartDTO.setCartList(cartItemList);
	fullCartDTO.setTotalPrice(totalCartPrice);
	fullCartDTO.setTotalCount(totalBookCount);
	fullCartDTO.setCartId(cartId);

	return fullCartDTO;


}


}
