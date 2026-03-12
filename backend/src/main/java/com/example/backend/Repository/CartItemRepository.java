package com.example.backend.Repository;

import com.example.backend.DTO.DisplayCartItemDTO;
import com.example.backend.DTO.OrderItemSaveHelperDTO;
import com.example.backend.Model.CartItem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;



	@Repository
	public interface CartItemRepository extends JpaRepository<CartItem,Integer> {

		@Query("""

				SELECT new com.example.backend.DTO.DisplayCartItemDTO(
        b.bookId,
        b.title,
        b.author,
        ci.quantity,
        b.price
    )
    FROM CartItem ci
    JOIN ci.book b
    WHERE ci.cart.cartId = :cartId
    """)
		List<DisplayCartItemDTO> getCartItems(@Param("cartId") int cartId);


		@Modifying
		@Transactional
		@Query("""
        DELETE FROM CartItem c 
        WHERE c.cart.cartId = :cartId 
        AND c.book.bookId = :bookId
    """)
		void deleteBookFromCart(@Param("cartId") int cartId,
								@Param("bookId") int bookId);


		@Query("""
SELECT new com.example.backend.DTO.OrderItemSaveHelperDTO(b.book.bookId, b.quantity)
FROM CartItem b
WHERE b.cart.cartId = :cartId
""")
		List<OrderItemSaveHelperDTO> getCartItemForOrder(@Param("cartId") int cartId);
		}

