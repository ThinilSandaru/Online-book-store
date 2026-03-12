package com.example.backend.DTO;

import com.example.backend.Model.Order;
import lombok.Data;

@Data
public class CheckoutOrderDetailsDTO {

private String paymentStatus;
private int cartId;



}
