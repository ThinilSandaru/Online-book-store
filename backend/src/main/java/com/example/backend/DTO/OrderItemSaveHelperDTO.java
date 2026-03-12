package com.example.backend.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderItemSaveHelperDTO {

private int bookId;
private int count;


}
