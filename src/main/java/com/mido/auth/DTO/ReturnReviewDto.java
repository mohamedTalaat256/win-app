package com.mido.auth.DTO;


import com.mido.auth.entity.AppUser;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ReturnReviewDto {
    public ReturnReviewDto(Long id, String text, double reviewValue, AppUser user) {
        this.id = id;
        this.text = text;
        this.reviewValue = reviewValue;
        this.user = user;
    }

    private Long id;
    private String text;
    private double reviewValue;

    private AppUser user;

}
