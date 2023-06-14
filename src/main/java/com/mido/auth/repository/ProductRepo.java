package com.mido.auth.repository;


import com.mido.auth.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {



    List<Product> findByCategoryId(Long categoryId);

    List<Product> findProductByNameContaining(String name);



    @Query( "select p from Product p where p.category.id =:categoryId and p.id in :ids " )
    List<Product> findByIds(@Param("ids") Set<Long> ids, @Param("categoryId") Long categoryId);
}
