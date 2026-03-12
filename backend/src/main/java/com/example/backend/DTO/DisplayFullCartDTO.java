package com.example.backend.DTO;

import lombok.Data;

import java.util.List;

@Data
public class DisplayFullCartDTO {

private int cartId;
private int totalCount;
private List<DisplayCartItemDTO> cartList;
private double totalPrice;


}
