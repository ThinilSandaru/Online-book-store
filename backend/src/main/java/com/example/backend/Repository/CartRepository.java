package com.example.backend.Repository;

import com.example.backend.Model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart,Integer> {


	boolean existsByUserUserId(int userId);

	@Query("SELECT c.cartId FROM Cart c WHERE c.user.userId = :userId")
	int findCartIdByUserId(@Param("userId") int userId);


}
