package com.example.backend.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class OrderItem {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int OrderItemId;


private int amount;

@ManyToOne
@JsonBackReference
@JoinColumn(name = "book_id",referencedColumnName = "bookId")
private Book book;


@ManyToOne
@JsonBackReference
@JoinColumn(name = "order_id",referencedColumnName = "orderId")
private Order order;

}
