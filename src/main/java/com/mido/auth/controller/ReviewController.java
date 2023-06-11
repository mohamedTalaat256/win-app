package com.mido.auth.controller;


import com.mido.auth.entity.Cart;
import com.mido.auth.entity.Review;
import com.mido.auth.services.CartService;
import com.mido.auth.services.ReviewService;
import com.mido.auth.utilis.AppResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/reviews")
@Transactional

public class ReviewController {

    @Autowired
    private ReviewService reviewService;



    @GetMapping("/{productId}")
    public ResponseEntity<Object> findAllByProductId(@PathVariable Long productId){
        return AppResponse.generateResponse("Success", HttpStatus.OK, reviewService.findAllByProductId(productId), true);
    }


    @PostMapping("/insert")
    public ResponseEntity<Object> insert(@RequestBody @Valid Review review){
        Review newReview = reviewService.save(review);
        return AppResponse.generateResponse("Success", HttpStatus.OK, reviewService.getReviewById(newReview.getId()), true);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id){
        reviewService.delete(id);
        return AppResponse.generateResponse("review deleted Successfully", HttpStatus.OK,id, true);
    }


}
