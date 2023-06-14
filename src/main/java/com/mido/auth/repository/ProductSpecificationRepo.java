package com.mido.auth.repository;


import com.mido.auth.entity.ProductSpecification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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




    //return array of products ids
    @Query(value = "select s.product_id from product_specifications s where s.s_key like %:sKey% and s.s_value like %:sValue%", nativeQuery = true)
    List<Long> findIds(@Param("sKey") String sKey,@Param("sValue") String sValue);
}
