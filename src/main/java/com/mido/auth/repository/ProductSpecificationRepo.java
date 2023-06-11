package com.mido.auth.repository;


import com.mido.auth.entity.ProductSpecification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductSpecificationRepo extends JpaRepository<ProductSpecification, Long> {



    /*
    @Modifying(flushAutomatically = true,  clearAutomatically = true)
    @Query(value ="delete from ProductSpecification ps where ps.product.id =:productId ")

    or

    using method deleteAllInBatch
    بتاخد list من ال entities
    */
    Long deleteByProductId(Long productId);


}
