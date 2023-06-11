package com.mido.auth.repository;
import com.mido.auth.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepo extends JpaRepository<Cart, Long> {



    @Query(value = "SELECT c.id, c.amount, p FROM Cart c inner join Product p ON c.productId = p.id")
    List<Object[]> findByUserId(Long userId);


    int countByUserId(Long userId);
}
