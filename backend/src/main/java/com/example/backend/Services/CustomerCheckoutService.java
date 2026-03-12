package com.example.backend.Services;

import com.example.backend.Configuration.CustomUserDetails;
import com.example.backend.DTO.CheckoutOrderDetailsDTO;
import com.example.backend.DTO.OrderItemSaveHelperDTO;
import com.example.backend.Model.Book;
import com.example.backend.Model.Order;
import com.example.backend.Model.OrderItem;
import com.example.backend.Model.User;
import com.example.backend.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
public class CustomerCheckoutService {

@Autowired
private UserRepository userRepository;

@Autowired
private CartRepository cartRepository;

@Autowired
private CartItemRepository cartItemRepository;

@Autowired
private OrderRepository orderRepository;

@Autowired
private OrderItemRepository orderItemRepository;

@Autowired
private BookRepository bookRepository;

@Autowired
private BookCopyRepository bookCopyRepository;


public Map<String, String> customerCheckout(CheckoutOrderDetailsDTO checkoutOrderDetailsDTO) {

	String paymentMethod=checkoutOrderDetailsDTO.getPaymentStatus();
	Order.PaymentStatus paymentStatus= Order.PaymentStatus.valueOf(paymentMethod);
	CustomUserDetails user= (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	int userId=user.getUserId();
	User user1=userRepository.findByUserId(userId)
			.orElseThrow(()->new RuntimeException("The user not found!"));

	Order order=new Order();
	order.setOrderStatus(Order.OrderStatus.PENDING);
	order.setUser(user1);
	if(paymentStatus== Order.PaymentStatus.COD){
		order.setPaymentStatus(Order.PaymentStatus.COD);
	}
	else{
		order.setPaymentStatus(Order.PaymentStatus.PAID);
	}

	orderRepository.save(order);
	int orderId=order.getOrderId();

	int cartId= checkoutOrderDetailsDTO.getCartId();

	List<OrderItemSaveHelperDTO> cartList =cartItemRepository.getCartItemForOrder(cartId);

	System.out.println("size "+cartList.size());

	System.out.println("Cart id "+cartId);

	for(OrderItemSaveHelperDTO item: cartList){

		Book book=bookRepository.findById(item.getBookId())
				.orElseThrow(()->new RuntimeException("The book not found!"));

		OrderItem orderItem=new OrderItem();
		orderItem.setAmount(item.getCount());
		orderItem.setOrder(order);
		orderItem.setBook(book);
		orderItemRepository.save(orderItem);
		System.out.println("bookId"+item.getBookId());
		bookCopyRepository.deleteBookCopies(item.getBookId(),item.getCount());

	}

	cartRepository.deleteById(cartId);

	return Map.of("Message","Completed the order.");






}
}
