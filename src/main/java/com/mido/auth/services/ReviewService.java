package com.mido.auth.services;

import com.mido.auth.DTO.ReturnReviewDto;
import com.mido.auth.entity.AppUser;
import com.mido.auth.entity.Product;
import com.mido.auth.entity.Review;
import com.mido.auth.repository.ReviewRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class ReviewService {

    @Autowired
    private ReviewRepo reviewRepo;




    public List<ReturnReviewDto> findAllByProductId(Long productId){
        List<Object[]> data = reviewRepo.findAllByProductId(productId);
        List<ReturnReviewDto> reviewList = new ArrayList<>();
        for (Object[] obj :data) {
            reviewList.add(new ReturnReviewDto(
                    (Long) obj[0],
                    (String) obj[1],
                    (double) obj[2],
                    (AppUser) obj[3]
            ));
        }
        return reviewList;
    }
    public Review save(Review review){
        return reviewRepo.save(review);
    }


    public ReturnReviewDto getReviewById(Long id){
        List<Object[]> data = reviewRepo.getReviewById(id);


        List<ReturnReviewDto> reviewList = new ArrayList<>();
        for (Object[] obj :data) {
            reviewList.add(new ReturnReviewDto(
                    (Long) obj[0],
                    (String) obj[1],
                    (double) obj[2],
                    (AppUser) obj[3]
            ));
        }

        return reviewList.get(0);
    }


    public void delete(Long id){
         reviewRepo.deleteById(id);
    }

}
