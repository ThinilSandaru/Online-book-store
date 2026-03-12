package com.example.backend.Repository;

import com.example.backend.Model.Order;
import com.example.backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Integer> {

	List<Order> findByUser(User user);

}
