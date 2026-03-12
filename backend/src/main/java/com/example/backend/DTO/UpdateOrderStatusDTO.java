package com.example.backend.DTO;


import lombok.Data;

@Data
public class UpdateOrderStatusDTO {

	private int orderId;
	private String orderStatus;

}