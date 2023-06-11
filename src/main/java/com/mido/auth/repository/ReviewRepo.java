package com.mido.auth.repository;
import com.mido.auth.entity.Cart;
import com.mido.auth.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepo extends JpaRepository<Review, Long> {



    @Query(value = "SELECT r.id, r.text, r.reviewValue , " +
            "new AppUser( u.id,  u.fullName,  u.email, u.userName, u.image) " +
            "FROM Review r inner join AppUser u ON r.userId = u.id " +
            "where r.productId=:productId")
    List<Object[]> findAllByProductId(Long productId);




    @Query(value = "SELECT r.id, r.text, r.reviewValue , " +
            "new AppUser( u.id,  u.fullName,  u.email, u.userName, u.image) " +
            "FROM Review r inner join AppUser u ON r.userId = u.id " +
            "where r.id=:id")
    List<Object[]> getReviewById(Long id);
}
