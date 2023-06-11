package com.mido.auth.repository;


import com.mido.auth.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {



    List<Product> findByCategoryId(Long categoryId);

    List<Product> findProductByNameContaining(String name);
}
